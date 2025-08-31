import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
export declare class OrderProduct {
    id: string;
    quantity: number;
    price: number;
    orderId: string;
    productId: string;
    order: Order;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
}
