import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { recoverPersonalSignature, normalize } from '@metamask/eth-sig-util';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(@Body() createFriendDto: CreateFriendDto) {
    let recoveredAddr;
    try {
      recoveredAddr = recoverPersonalSignature({
        data: `0x${Buffer.from(createFriendDto.challenge, 'utf8').toString('hex')}`,
        signature: createFriendDto.signature,
      });      
    } catch (err) {
      console.log(`CreateFriend Invalid Signature Error ${createFriendDto.initiator} ${createFriendDto.challenge} ${createFriendDto.signature} ${err}`);
      return { error: "Invalid signature!" };
    }

    if (recoveredAddr === normalize(createFriendDto.initiator)) {
      return this.friendsService.create(createFriendDto);
    } else {
      return { error: "Invalid signature!", recoveredAddr: recoveredAddr, initiator: normalize(createFriendDto.initiator)};
    }
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendsService.update(id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(id);
  }
}
