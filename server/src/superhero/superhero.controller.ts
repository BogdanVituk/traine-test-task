import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const uploadPath = './uploads';
if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}


@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) { }

  @Post() 
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
          destination: uploadPath,
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        cb(null, allowed.includes(file.mimetype))
      }
    })
  )
  create(
    @Body() createSuperheroDto: CreateSuperheroDto,
    @UploadedFiles() files: Express.Multer.File[],
    ) {
      const imageUrls = files.map(f => `/uploads/${f.filename}`)
    return this.superheroService.create(createSuperheroDto, imageUrls);
  }

  @Get()
  getPosts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 5

  ) {

    if(page && limit) {
      return this.superheroService.getSuperhero(page, limit);
    }

    return this.superheroService.findAll()
  }

  @Get(':id')
  findOne
  (@Param('id', ParseIntPipe) id: number) {
    return this.superheroService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
          destination: uploadPath,
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        cb(null, allowed.includes(file.mimetype))
      }
    })
  )
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateSuperheroDto: UpdateSuperheroDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
     const imageUrls = files.map(f => `/uploads/${f.filename}`)
    return this.superheroService.update(id, updateSuperheroDto, imageUrls);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.superheroService.remove(id);
  }

  @Delete('/remove-images/:imgId')
  removeImage(
    @Param('imgId', ParseIntPipe) imgId: number,
) {
    return this.superheroService.removeImage(imgId);
  }
}
