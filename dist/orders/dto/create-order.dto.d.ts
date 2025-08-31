import { OrderItemDto } from './order-item.dto';
export declare class CreateOrderDto {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    orderProducts: OrderItemDto[];
    total: number;
}
