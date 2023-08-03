import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotesDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  created: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString({ each: true })
  dates: string;
}
