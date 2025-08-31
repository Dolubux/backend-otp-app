import { OrderProduct } from './order-product.entity';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export declare class Order {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    orderProducts: OrderProduct[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
