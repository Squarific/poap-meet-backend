import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Friend } from './friends/entities/friend.entity';
import { Challenge } from './challenge/entities/challenge.entity';
import { Nft } from './nft/entities/nft.entity';
import { Name } from './name/entities/name.entity';

import { FriendsModule } from './friends/friends.module';
import { ChallengeModule } from './challenge/challenge.module';
import { NftModule } from './nft/nft.module';
import { NameModule } from './name/name.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'poap',
      password: 'poap',
      database: 'poap',
      entities: [ Friend, Challenge, Nft, Name ],
      synchronize: true
    }),
    FriendsModule,
    ChallengeModule,
    NftModule,
    NameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
