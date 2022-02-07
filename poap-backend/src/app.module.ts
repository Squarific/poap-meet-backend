import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetsController } from './meets/meets.controller';

@Module({
  imports: [],
  controllers: [AppController, MeetsController],
  providers: [AppService],
})
export class AppModule {}
