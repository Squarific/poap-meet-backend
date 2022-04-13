import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NameService } from './name.service';
import { NameController } from './name.controller';
import { Name } from './entities/name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Name])],
  controllers: [NameController],
  providers: [NameService]
})
export class NameModule {}
