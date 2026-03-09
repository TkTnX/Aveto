import { Test, TestingModule } from '@nestjs/testing';
import { YandexController } from './yandex.controller';
import { YandexService } from './yandex.service';

describe('YandexController', () => {
  let controller: YandexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YandexController],
      providers: [YandexService],
    }).compile();

    controller = module.get<YandexController>(YandexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
