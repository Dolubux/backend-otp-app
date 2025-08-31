import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name }
    });
    
    if (existingCategory) {
      throw new ConflictException(`Une catégorie avec le nom "${createCategoryDto.name}" existe déjà`);
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      isActive: createCategoryDto.isActive ?? true
    });
    
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la catégorie');
    }
  }

  async findAll(includeInactive: boolean = false): Promise<Category[]> {
    const whereCondition = includeInactive ? {} : { isActive: true };
    
    return await this.categoryRepository.find({
      where: whereCondition,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    
    // Vérifier si le nouveau nom n'est pas déjà utilisé par une autre catégorie
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name }
      });
      
      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException(`Une catégorie avec le nom "${updateCategoryDto.name}" existe déjà`);
      }
    }
    
    Object.assign(category, updateCategoryDto);
    
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de la catégorie');
    }
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    
    try {
      await this.categoryRepository.remove(category);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de la catégorie');
    }
  }

  async toggleStatus(id: string): Promise<Category> {
    const category = await this.findOne(id);
    category.isActive = !category.isActive;
    
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException('Erreur lors du changement de statut');
    }
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { name, isActive: true }
    });
  }

  async getActiveCount(): Promise<number> {
    return await this.categoryRepository.count({
      where: { isActive: true }
    });
  }
}
