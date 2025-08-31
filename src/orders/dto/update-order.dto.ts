import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';
import { OrderItemDto } from './order-item.dto';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  total?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];
}
