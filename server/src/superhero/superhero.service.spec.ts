import { Test, TestingModule } from '@nestjs/testing';
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

     } as any,
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

  it("should delete superhero", async () => {
    await service.remove(5);
    expect(prismaMock.superhero.delete).toHaveBeenCalledWith({ where: { id: 5 }});
    });

  it("should return paginated superheroes", async () => {
      prismaMock.superhero.findMany.mockResolvedValue([{ id: 1 }]);
      prismaMock.superhero.count.mockResolvedValue(10);

      const result = await service.getSuperhero(2, 5);

      expect(prismaMock.superhero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 5, take: 5 })
      );

      expect(result.meta.lastPage).toBe(2);
  });

  it("should update with images", async () => {
  await service.update(1, { nickname: "New" } as any, ["img.png"]);

      expect(prismaMock.superhero.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          data: expect.objectContaining({
            Images: { create: [{ url: "img.png" }] }
          })
        })
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


});
