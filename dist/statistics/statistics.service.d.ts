import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { StatisticsDto } from './dto/statistics.dto';
import { UsersService } from '../users/users.service';
export declare class StatisticsService {
    private readonly productRepository;
    private readonly orderRepository;
    private readonly usersService;
    constructor(productRepository: Repository<Product>, orderRepository: Repository<Order>, usersService: UsersService);
    getStatistics(): Promise<StatisticsDto>;
    private getTotalProducts;
    private getTotalOrders;
    private getTotalRevenue;
    private getLowStockItems;
    private getRecentOrders;
    private getMonthlySales;
    private getTopProducts;
}
