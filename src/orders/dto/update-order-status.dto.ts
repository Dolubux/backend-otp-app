import { IsEnum } from 'class-validator';
import type { OrderStatus } from '../entities/order.entity';

export class UpdateOrderStatusDto {
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status: OrderStatus;
}
