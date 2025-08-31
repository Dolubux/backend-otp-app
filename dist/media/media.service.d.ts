import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
export declare class MediaService {
    private mediaRepository;
    constructor(mediaRepository: Repository<Media>);
    create(createMediaDto: CreateMediaDto): Promise<Media>;
    findAll(): Promise<Media[]>;
    findOne(id: string): Promise<Media | null>;
    findByProduct(productId: string): Promise<Media[]>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
    setMainImage(id: string, productId: string): Promise<Media | null>;
}
