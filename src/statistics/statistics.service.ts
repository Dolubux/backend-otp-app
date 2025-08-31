import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { StatisticsDto, MonthlySales, TopProduct } from './dto/statistics.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getStatistics(): Promise<StatisticsDto> {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockItems,
      recentOrders,
      monthlySales,
      topProducts,
    ] = await Promise.all([
      this.usersService.count(),
      this.getTotalProducts(),
      this.getTotalOrders(),
      this.getTotalRevenue(),
      this.getLowStockItems(),
      this.getRecentOrders(),
      this.getMonthlySales(),
      this.getTopProducts(),
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockItems,
      recentOrders,
      monthlySales,
      topProducts,
    };
  }

  private async getTotalProducts(): Promise<number> {
    return await this.productRepository.count();
  }

  private async getTotalOrders(): Promise<number> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where("order.status != 'cancelled'")
      .getCount();
  }

  private async getTotalRevenue(): Promise<number> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'total')
      .where('order.status != :status', { status: 'cancelled' })
      .getRawOne();
    
    return parseFloat(result?.total || '0');
  }

  private async getLowStockItems(): Promise<number> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.stock <= :threshold', { threshold: 10 })
      .andWhere('product.inStock = :inStock', { inStock: true })
      .getCount();
  }

  private async getRecentOrders(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await this.orderRepository
      .createQueryBuilder('order')
      .where('order.createdAt >= :date', { date: thirtyDaysAgo })
      .andWhere("order.status != 'cancelled'")
      .getCount();
  }

  private async getMonthlySales(): Promise<MonthlySales[]> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        'DATE_FORMAT(order.createdAt, "%Y-%m") as month',
        'SUM(order.total) as amount',
        'COUNT(order.id) as orderCount',

      ])
      .where('order.status IN (:status)', { status: ['shipped', 'delivered'] })
      .groupBy('DATE_FORMAT(order.createdAt, "%Y-%m")')
      .orderBy('month', 'DESC')
      .limit(12)
      .getRawMany();

    return result.map(row => ({
      month: row.month,
      amount: parseFloat(row.amount || '0'),
      orderCount: parseInt(row.orderCount || '0'),
    }));
  }

  private async getTopProducts(): Promise<TopProduct[]> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderProducts', 'orderProduct')
      .leftJoin('orderProduct.product', 'product')
      .select([
        'product.id as product_id',
        'product.name as product_name',
        'SUM(orderProduct.quantity) as sales',
        'SUM(orderProduct.price)  as product_price ',
      ])
      .where('order.status != :status', { status: 'cancelled' })
      .groupBy('product.id, product.name')
      .orderBy('sales', 'DESC')
      .limit(10)
      .getRawMany();

    return result.map(row => ({
      productId: row.product_id,
      productName: row.product_name,
      sales: parseInt(row.sales || '0'),
      productPrice: parseFloat(row.product_price || '0'),
    }));
  }
}
