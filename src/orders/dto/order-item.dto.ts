import { IsUUID, IsInt, Min, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderItemDto extends OrderItemDto {}

export class UpdateOrderItemDto extends OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
