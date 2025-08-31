import { CreateOrderDto } from './create-order.dto';
import { OrderItemDto } from './order-item.dto';
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
declare const UpdateOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    status?: OrderStatus;
    total?: number;
    items?: OrderItemDto[];
}
export {};
