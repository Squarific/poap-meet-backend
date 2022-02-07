import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendsService {
  create(createFriendDto: CreateFriendDto) {
    return 'This action adds a new friend';
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: string) {
    return `This action returns a ${id} friend`;
  }

  update(id: string, updateFriendDto: UpdateFriendDto) {
    return `This action updates a ${id} friend`;
  }

  remove(id: string) {
    return `This action removes a ${id} friend`;
  }
}
