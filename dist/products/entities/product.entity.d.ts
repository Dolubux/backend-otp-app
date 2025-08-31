import { Media } from '../../media/entities/media.entity';
import { OrderProduct } from '../../orders/entities/order-product.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    description: string;
    medias: Media[];
    orderProducts: OrderProduct[];
    category: string;
    inStock: boolean;
    rating?: number;
    stock?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
