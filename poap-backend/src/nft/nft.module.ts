import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { Nft } from './entities/nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nft])],
  controllers: [NftController],
  providers: [NftService]
})
export class NftModule {}
