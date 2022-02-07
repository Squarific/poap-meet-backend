import { Test, TestingModule } from '@nestjs/testing';
import { MeetsController } from './meets.controller';

describe('MeetsController', () => {
  let controller: MeetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetsController],
    }).compile();

    controller = module.get<MeetsController>(MeetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
