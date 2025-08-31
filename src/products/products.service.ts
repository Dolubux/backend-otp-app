import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Media } from '../media/entities/media.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { medias, ...productData } = createProductDto;
    
    // Créer le produit
    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);
    
    // Créer les médias associés si fournis
    if (medias && medias.length > 0) {
      const mediaEntities = medias.map((mediaData, index) => {
        return this.mediaRepository.create({
          ...mediaData,
          productId: savedProduct.id,
          isMain: index === 0, // Le premier média devient l'image principale
        });
      });
      
      await this.mediaRepository.save(mediaEntities);
    }
    
    // Retourner le produit avec ses médias
    return this.findOne(savedProduct.id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['medias'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ 
      where: { id },
      relations: ['medias'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { medias, mediasToUpdate, mediasToDelete, ...productData } = updateProductDto;
    
    // Mettre à jour les données du produit
    await this.productRepository.update(id, productData);
    
    // Ajouter de nouveaux médias si fournis
    if (medias && medias.length > 0) {
      const mediaEntities = medias.map(mediaData => {
        return this.mediaRepository.create({
          ...mediaData,
          productId: id,
          isMain: false, // Par défaut, les nouveaux médias ne sont pas principaux
        });
      });
      await this.mediaRepository.save(mediaEntities);
    }
    
    // Mettre à jour les médias existants
    if (mediasToUpdate && mediasToUpdate.length > 0) {
      for (const mediaUpdate of mediasToUpdate) {
        const { id: mediaId, ...mediaData } = mediaUpdate;
        if (mediaId) {
          await this.mediaRepository.update(mediaId, mediaData);
        }
      }
    }
    
    // Supprimer les médias spécifiés
    if (mediasToDelete && mediasToDelete.length > 0) {
      await this.mediaRepository.softDelete(mediasToDelete);
    }
    
    // Retourner le produit mis à jour avec ses médias
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock = quantity;
    product.inStock = quantity > 0;
    return await this.productRepository.save(product);
  }
}
