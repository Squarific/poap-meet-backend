import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

import { NftService } from './../nft/nft.service';

@Injectable()
export class FriendsService {
  constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>, private readonly nftService: NftService) {}

  async create(createFriendDto: CreateFriendDto) {
    var friend = await this.friendRepository.findOne({ target: createFriendDto.initiator, initiator: createFriendDto.target });
    var result;

    try {
      result = await this.friendRepository.save(createFriendDto);
    } catch (error) {
      console.log("Meet request save error", error)
      return { error: "Could not save meet request." };
    }

    if (friend) {
      this.nftService.create({ initiator: createFriendDto.initiator, target: createFriendDto.target    }).then(() => {
        this.nftService.create({ initiator: createFriendDto.target   , target: createFriendDto.initiator });
      });
    }

    return friend;
  }

  findMyFriends(address: string) {
    address = address.toLowerCase();
    return this.friendRepository.find({
      where: [
        { target: address }, //OR
        { initiator: address }
      ]
    });
  }
}
