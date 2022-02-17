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

  create(createFriendDto: CreateFriendDto) {
    this.friendRepository.findOne(createFriendDto.initiator).then((friend) => {
      if (friend) {
        this.nftService.create({ initiator: createFriendDto.initiator, target: createFriendDto.target    });
        this.nftService.create({ initiator: createFriendDto.target   , target: createFriendDto.initiator });
      }

      return this.friendRepository.save(createFriendDto);
    });
  }

  findAll() {
    return this.friendRepository.find();
  }

  findOne(id: string) {
    return this.friendRepository.findOne(id);
  }

  update(id: string, updateFriendDto: UpdateFriendDto) {
    return `This action updates a ${id} friend`;
  }

  async remove(id: string): Promise<void> {
    await this.friendRepository.delete(id);
  }
}
