import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NftService } from './nft.service';

const Web3 = require('web3');

@Controller('nft')
export class NftController {
  web3 = new Web3();
  constructor(private readonly nftService: NftService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftService.findOne(this.web3.utils.toHex(id));
  }
}
