import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Friend } from './entities/friend.entity';

import { NftService } from './../nft/nft.service';
import { Nft } from './../nft/entities/nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, Nft])],
  controllers: [FriendsController],
  providers: [FriendsService, NftService],
})
export class FriendsModule {}
