import { CreateProductDto } from './create-product.dto';
import { UpdateMediaDto } from '../../media/dto/update-media.dto';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    mediasToUpdate?: (UpdateMediaDto & {
        id?: string;
    })[];
    mediasToDelete?: string[];
}
export {};
