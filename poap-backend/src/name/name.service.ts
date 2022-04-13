import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { Name } from './entities/name.entity';

@Injectable()
export class NameService {
  constructor(@InjectRepository(Name) private nameRepository: Repository<Name>) {}

  save(address: string, owner: string, name: string) {
    console.log("Create", address, owner, name);
    return this.nameRepository.upsert({ address, owner, name}, ["address", "owner"]);
  }

  findOne(address: string, owner: string) {
    return this.nameRepository.find({ address, owner });
  }
}
