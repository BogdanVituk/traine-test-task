import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateSuperheroDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  nickname: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  real_name: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  origin_description: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  superpowers: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  catch_phrase: string;
}
