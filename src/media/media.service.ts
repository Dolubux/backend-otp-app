import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepository.create(createMediaDto);
    return await this.mediaRepository.save(media);
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaRepository.find({
      relations: ['product'],
    });
  }

  async findOne(id: string): Promise<Media | null> {
    return await this.mediaRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async findByProduct(productId: string): Promise<Media[]> {
    return await this.mediaRepository.find({
      where: { productId },
      order: { isMain: 'DESC', createdAt: 'ASC' },
    });
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media | null> {
    await this.mediaRepository.update(id, updateMediaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.mediaRepository.softDelete(id);
    return { message: 'La média a été supprimée avec succès' };
  }

  async setMainImage(id: string, productId: string): Promise<Media | null> {
    // Désactiver toutes les images principales du produit
    await this.mediaRepository.update(
      { productId },
      { isMain: false }
    );
    
    // Activer l'image sélectionnée comme principale
    await this.mediaRepository.update(id, { isMain: true });
    
    return this.findOne(id);
  }
}
