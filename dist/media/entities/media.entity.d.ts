import { Product } from '../../products/entities/product.entity';
export declare class Media {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    path: string;
    url: string;
    size?: number;
    isMain: boolean;
    alt?: string;
    product: Product;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
