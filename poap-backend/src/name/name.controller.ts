import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NameService } from './name.service';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { recoverPersonalSignature, normalize } from '@metamask/eth-sig-util';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post(':address/:owner')
  create(@Param('address') address: string, @Param('owner') owner: string, @Body() createNameDto: CreateNameDto) {
    // Check signature
    let recoveredAddr;

    try {
      recoveredAddr = recoverPersonalSignature({
        data: `0x${Buffer.from(createNameDto.challenge, 'utf8').toString('hex')}`,
        signature: createNameDto.signature,
      });      
    } catch (err) {
      console.log(`CreateFriend Invalid Signature Error ${createNameDto.initiator} ${createNameDto.challenge} ${createNameDto.signature} ${err}`);
      return { error: "Invalid signature!" };
    }

    if (recoveredAddr === normalize(createNameDto.initiator)) {
      return this.nameService.save(address, owner, createNameDto.name);
    } else {
      return { error: "Invalid signature!", recoveredAddr: recoveredAddr, initiator: normalize(createNameDto.initiator)};
    }
  }

  @Get(':address/:owner')
  findOne(@Param('address') address: string, @Param('owner') owner: string) {
    return this.nameService.findOne(address.toLowerCase(), owner.toLowerCase());
  }
}
