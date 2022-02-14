import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>) {}

  create(createFriendDto: CreateFriendDto) {
    return this.friendRepository.save(createFriendDto);
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
