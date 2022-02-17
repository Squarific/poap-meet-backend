import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nftService.findOne(+id);
  }
}
