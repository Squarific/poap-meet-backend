import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft } from './entities/nft.entity';

const Web3 = require('web3');

@Injectable()
export class NftService {
  web3 = new Web3('https://eth-ropsten.alchemyapi.io/v2/oAZjMdI9KFF0_nO61F-xXDpKsLGFpTTR');
  
  contract = new this.web3.eth.Contract([{
    "type": "function",
    "name": "mintTo",
    "inputs": [{"name": "recipient", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}]
  }], "0x4C0DEE4b1e87Bb819555d7287546e046b1aC7C03");

  ourAddress = "0xA8255D0F4678455f20929a51d037b84Aa529a108";

  constructor(@InjectRepository(Nft) private nftRepository: Repository<Nft>) {}

  create(createNftDto: CreateNftDto) {
    this.contract.methods.mintTo(createNftDto.initiator).send({ from: this.ourAddress }).then((receipt) => {
      console.log("Minted", receipt);
      return this.nftRepository.save({ initiator: createNftDto.initiator, target: createNftDto.target, tokenId: 5 });
    })

  }

  findOne(tokenid: number) {
    return this.nftRepository.findOne({ tokenid });
  }
}
