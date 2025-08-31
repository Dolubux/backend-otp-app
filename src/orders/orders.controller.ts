import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import type { OrderStatus } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès', type: Order })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les commandes' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Order] })
  async findAll(@Query('status') status?: OrderStatus) {
    if (status) {
      return await this.ordersService.findByStatus(status);
    }
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande mise à jour', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Statut de la commande mis à jour', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: OrderStatus,
  ) {
    return await this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande à supprimer' })
  @ApiResponse({ status: 200, description: 'Commande supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ordersService.remove(id);
    return { message: 'Commande supprimée avec succès' };
  }
}
