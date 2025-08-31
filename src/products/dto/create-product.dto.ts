import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMediaDto } from '../../media/dto/create-media.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  medias?: Omit<CreateMediaDto, 'productId'>[];
}
