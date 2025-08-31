import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateMediaDto } from '../../media/dto/update-media.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMediaDto)
  mediasToUpdate?: (UpdateMediaDto & { id?: string })[];

  @IsOptional()
  @IsArray()
  mediasToDelete?: string[];
}
