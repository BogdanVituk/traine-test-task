import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperheroDto } from './create-superhero.dto';

export class UpdateSuperheroDto extends PartialType(CreateSuperheroDto) {
    nickname: string
    real_name: string
    origin_description: string
    superpowers: string
    catch_phrase: string
}
