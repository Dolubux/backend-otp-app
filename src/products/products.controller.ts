import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau produit' })
  @ApiResponse({ status: 201, description: 'Produit créé avec succès', type: Product })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  @ApiResponse({ status: 200, description: 'Liste des produits', type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par ID' })
  @ApiParam({ name: 'id', description: 'ID du produit' })
  @ApiResponse({ status: 200, description: 'Produit trouvé', type: Product })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un produit' })
  @ApiParam({ name: 'id', description: 'ID du produit' })
  @ApiResponse({ status: 200, description: 'Produit mis à jour', type: Product })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un produit' })
  @ApiParam({ name: 'id', description: 'ID du produit' })
  @ApiResponse({ status: 200, description: 'Produit supprimé' })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Put(':id/stock')
  @ApiOperation({ summary: 'Mettre à jour le stock d\'un produit' })
  @ApiParam({ name: 'id', description: 'ID du produit' })
  @ApiBody({ schema: { type: 'object', properties: { quantity: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'Stock mis à jour', type: Product })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  updateStock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.productsService.updateStock(id, body.quantity);
  }
}
