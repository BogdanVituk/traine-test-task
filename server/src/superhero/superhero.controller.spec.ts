import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { PrismaService } from 'src/prisma.service';

const prismaMock = {
  superhero: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  image: {
    delete: jest.fn(),
  },
};

describe('SuperheroController', () => {
  let controller: SuperheroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        SuperheroService,
        { provide: PrismaService, useValue: prismaMock }
      ],
    }).compile();

    controller = module.get<SuperheroController>(SuperheroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
