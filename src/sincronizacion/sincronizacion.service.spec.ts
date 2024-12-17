import { Test, TestingModule } from '@nestjs/testing';
import { SincronizacionService } from './sincronizacion.service';

describe('SincronizacionService', () => {
  let service: SincronizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SincronizacionService],
    }).compile();

    service = module.get<SincronizacionService>(SincronizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
