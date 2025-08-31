import { CreateMediaDto } from '../../media/dto/create-media.dto';
export declare class CreateProductDto {
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
    rating?: number;
    stock?: number;
    medias?: Omit<CreateMediaDto, 'productId'>[];
}
