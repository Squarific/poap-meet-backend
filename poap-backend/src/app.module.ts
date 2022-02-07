import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetsController } from './meets/meets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetRequest } from './meets/entities/MeetRequest'
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'poap',
      password: 'poap',
      database: 'poap',
      entities: [ MeetRequest ],
    }),
    FriendsModule,
  ],
  controllers: [AppController, MeetsController],
  providers: [AppService],
})
export class AppModule {}
