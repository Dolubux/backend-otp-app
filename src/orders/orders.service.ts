import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct } from './entities/order-product.entity';
import { ProductsService } from '../products/products.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
      ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Créer la commande
    const order = this.orderRepository.create({
      customer_name: createOrderDto.customer_name,
      customer_email: createOrderDto.customer_email,
      customer_phone: createOrderDto.customer_phone,
      total: createOrderDto.total,
      status: 'pending' as OrderStatus,
    });

    
    // Créer un nouvel utilisateur
     await this.usersService.create({
      name: createOrderDto.customer_name,
      email: createOrderDto.customer_email,
      phone: createOrderDto.customer_phone,
    });


    // Sauvegarder la commande pour obtenir l'ID
    const savedOrder = await this.orderRepository.save(order);

    // Créer les OrderProduct
    const orderProducts = await Promise.all(
      createOrderDto.orderProducts .map(async (item) => {
        // Vérifier que le produit existe
        await this.productsService.findOne(item.productId);
        
        const orderProduct = this.orderProductRepository.create({
          orderId: savedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
        
        return await this.orderProductRepository.save(orderProduct);
      })
    );

    // Mettre à jour la commande avec les produits
    savedOrder.orderProducts = orderProducts;
    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { status },
      relations: ['orderProducts', 'orderProducts.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // Mettre à jour les champs de base
    if (updateOrderDto.status) order.status = updateOrderDto.status;
    if (updateOrderDto.total !== undefined) order.total = updateOrderDto.total;
    
    // Si des items sont fournis, mettre à jour les produits
    if (updateOrderDto.items) {
      // Supprimer les anciens OrderProduct
      await this.orderProductRepository.delete({ orderId: id });
      
      // Créer les nouveaux OrderProduct
      const orderProducts = await Promise.all(
        updateOrderDto.items.map(async (item) => {
          await this.productsService.findOne(item.productId);
          
          const orderProduct = this.orderProductRepository.create({
            orderId: id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          });
          
          return await this.orderProductRepository.save(orderProduct);
        })
      );
      
      order.orderProducts = orderProducts;
    }
    
    return await this.orderRepository.save(order);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
