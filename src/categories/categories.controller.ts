import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle catégorie' })
  @ApiResponse({ status: 201, description: 'Catégorie créée avec succès', type: Category })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les catégories' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean, description: 'Inclure les catégories inactives' })
  @ApiResponse({ status: 200, description: 'Liste des catégories', type: [Category] })
  findAll(@Query('includeInactive') includeInactive?: boolean) {
    return this.categoriesService.findAll(includeInactive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie mise à jour', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  @ApiResponse({ status: 409, description: 'Nom de catégorie déjà utilisé' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie supprimée' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Activer/désactiver une catégorie' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({ status: 200, description: 'Statut de la catégorie modifié', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  toggleStatus(@Param('id') id: string) {
    return this.categoriesService.toggleStatus(id);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Rechercher une catégorie par nom' })
  @ApiParam({ name: 'name', description: 'Nom de la catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  findByName(@Param('name') name: string) {
    return this.categoriesService.findByName(name);
  }

  @Get('stats/count')
  @ApiOperation({ summary: 'Obtenir le nombre de catégories actives' })
  @ApiResponse({ status: 200, description: 'Nombre de catégories actives' })
  getActiveCount() {
    return this.categoriesService.getActiveCount();
  }
}
