import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SuperheroService {

  constructor(private prisma: PrismaService) { }

  async create(createSuperheroDto: CreateSuperheroDto, imagesUrls: string[]) {
    return  this.prisma.superhero.create({
      data: {
        ...createSuperheroDto,
        Images: {
            create: imagesUrls.map(url => ({ url }))
          }
      },
      include: { Images: true }
    })
  }

  async findAll() {
    return  this.prisma.superhero.findMany();
  }

  async getSuperhero(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const [data, total] =  await Promise.all([this.prisma.superhero.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' },
      include: {
        Images: true
      }
    }),
      this.prisma.superhero.count(),
    ])


    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total/limit)
      }
    }
  }

  async findOne(id: number) {
    return  this.prisma.superhero.findUnique({ 
      where: { id }, 
      include: { Images: true }
    });
  }

  async update(id: number, updateSuperheroDto: UpdateSuperheroDto, imagesUrls: string[]) {
    return  this.prisma.superhero.update({
      data: {
        ...updateSuperheroDto,
        Images: imagesUrls?.length  ?
         {
            create: imagesUrls.map((url) => ({ url })),
         }
          : undefined
          
      },
      include: { Images: true },
      where: { id }
    }
    );
  }

  async remove(id: number) {
    return  this.prisma.superhero.delete({ where: { id } });
  }
  
  async removeImage(imgId) {
    return  this.prisma.image.delete({ 
      where: { 
        id: imgId
       }
     });
  }
}
