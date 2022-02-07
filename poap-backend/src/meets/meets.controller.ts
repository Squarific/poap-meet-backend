import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddFriendDTO } from './AddFriendDTO';

@Controller('meets')
export class MeetsController {
    @Get('friends')
    friends(): string {
        return 'This action returns all met friends';
    }

    @Post('addFriend')
    addFriend(@Body() addFriendDTO : AddFriendDTO): string {
        return 'Added friend ' + addFriendDTO.data;
    }
}
