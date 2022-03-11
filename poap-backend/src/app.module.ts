import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Friend } from './friends/entities/friend.entity';
import { Challenge } from './challenge/entities/challenge.entity';
import { Nft } from './nft/entities/nft.entity';

import { FriendsModule } from './friends/friends.module';
import { ChallengeModule } from './challenge/challenge.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'yQ25*IwPYS*7',
      database: 'poap',
      entities: [ Friend, Challenge, Nft ]
    }),
    FriendsModule,
    ChallengeModule,
    NftModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
