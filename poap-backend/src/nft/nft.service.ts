import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft } from './entities/nft.entity';

const Web3 = require('web3');

async function send(web3, privateKey, gasPrice, contract, receiverAddress, numOfCoins) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  const transaction = contract.methods.sendCoin(receiverAddress, numOfCoins);
  const options = {
      to      : transaction._parent._address,
      data    : transaction.encodeABI(),
      gas     : await transaction.estimateGas({from: account}),
      gasPrice: gasPrice
  };
  const signed  = await web3.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return receipt;
}

@Injectable()
export class NftService {
  web3 = new Web3('https://eth-ropsten.alchemyapi.io/v2/oAZjMdI9KFF0_nO61F-xXDpKsLGFpTTR');
  
  contract = new this.web3.eth.Contract([{
    "type": "function",
    "name": "mintTo",
    "inputs": [{"name": "recipient", "type": "address"}, {"name": "id", "type": "uint256"}],
    "outputs": []
  }], "0x6B209992A19C8829f936A3ad2EE66f7a917f3Ef2");

  privateKey = "0x2089a5c3a22747d35452ef1f39cbd0a7e898e6693983482e7248efff9737bd73";
  account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);

  constructor(@InjectRepository(Nft) private nftRepository: Repository<Nft>) {}

  async create(createNftDto: CreateNftDto) {
    const tokenid = this.web3.utils.randomHex(32);
    const transaction = this.contract.methods.mintTo(createNftDto.initiator.toLowerCase(), tokenid);
    const options = {
      to      : transaction._parent._address,
      data    : transaction.encodeABI(),
      gas     : await transaction.estimateGas({ from: this.account.address }) * 2,
      gasPrice: await this.web3.eth.getGasPrice()
    };

    const signed  = await this.web3.eth.accounts.signTransaction(options, this.privateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signed.rawTransaction);

    console.log("Nft created", receipt);
    
    return this.nftRepository.save({ initiator: createNftDto.initiator, target: createNftDto.target, tokenid });
  }

  findOne(tokenid: string) {
    return this.nftRepository.findOne({ tokenid });
  }
}
