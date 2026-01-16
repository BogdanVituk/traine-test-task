import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { PrismaService } from 'src/prisma.service';
import { Superhero } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

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
  }
};


describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        { provide: PrismaService, useValue: prismaMock }
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create superhero with images", async () => {
  prismaMock.superhero.create.mockResolvedValue({ id: 1 });


  await service.create(
    { 
      nickname: "Batman", 
      origin_description: "DC",
      superpowers: "fsdfsf",
      catch_phrase: "dsfsdfds",

     } as Superhero,
    ["img1.png", "img2.png"]
  );

  expect(prismaMock.superhero.create).toHaveBeenCalledWith({
    data: {
      nickname: "Batman", 
      origin_description: "DC",
      superpowers: "fsdfsf",
      catch_phrase: "dsfsdfds",
      Images: {
        create: [{ url: "img1.png" }, { url: "img2.png" }]
      }
    },
    include: { Images: true }
  });

  });

  it('should return superhero if found', async () => {
    const hero = { id: 1, nickname: 'Batman' };
    prismaMock.superhero.findUnique.mockResolvedValue(hero);

    const result = await service.findOne(1);

    expect(prismaMock.superhero.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { Images: true },
    });

    expect(result).toEqual(hero);
  });


  it("should delete superhero", async () => {
    await service.remove(5);
    expect(prismaMock.superhero.delete).toHaveBeenCalledWith({ where: { id: 5 }});
    });

  it("should return paginated superheroes", async () => {
      prismaMock.superhero.findMany.mockResolvedValue([{ id: 1 }]);
      prismaMock.superhero.count.mockResolvedValue(10);

      const result = await service.findAllPaginated(2, 5);

      expect(prismaMock.superhero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 5, take: 5 })
      );

      expect(result).toEqual({
      data: [{ id: 1 }],
      meta: {
        total: 10,
        page: 2,
        lastPage: 2,
      },
    });
  });

  it('should throw NotFoundException if superhero not found', async () => {
    prismaMock.superhero.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it("should update with images", async () => {
  await service.update(1, { nickname: "New" } as any, ["img.png"]);

      expect(prismaMock.superhero.update).toHaveBeenCalledWith(
         expect.objectContaining({
          where: { id: 1 },
          data: {
            nickname: 'New',
            Images: {
              create: [{ url: 'img.png' }],
            },
          },
          include: { Images: true },
        }),
      );
    });


  it("should update without images", async () => {
    await service.update(1, { nickname: "New" } as any, []);

    expect(prismaMock.superhero.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.not.objectContaining({ Images: expect.anything() })
      })
    );
  });

  it('should delete superhero by id', async () => {
    await service.remove(5);

    expect(prismaMock.superhero.delete).toHaveBeenCalledWith({
      where: { id: 5 },
    });
  });


  it('should delete image by id', async () => {
    await service.removeImage(10);

    expect(prismaMock.image.delete).toHaveBeenCalledWith({
      where: { id: 10 },
    });
  });


});
