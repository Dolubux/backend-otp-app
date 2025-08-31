import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Media } from '../media/entities/media.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly mediaRepository;
    constructor(productRepository: Repository<Product>, mediaRepository: Repository<Media>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<Product>;
}
