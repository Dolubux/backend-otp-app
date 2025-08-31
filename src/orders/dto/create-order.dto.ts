import { IsString, IsArray, IsEmail, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsString()
  customer_name: string;

  @IsEmail()
  customer_email: string;

  
  @IsString()
  customer_phone: string;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderProducts : OrderItemDto[];

  @IsNumber()
  @Min(0)
  total: number;
}
