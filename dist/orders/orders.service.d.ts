import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct } from './entities/order-product.entity';
import { ProductsService } from '../products/products.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from 'src/users/users.service';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderProductRepository;
    private readonly productsService;
    private readonly usersService;
    constructor(orderRepository: Repository<Order>, orderProductRepository: Repository<OrderProduct>, productsService: ProductsService, usersService: UsersService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByStatus(status: OrderStatus): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    remove(id: string): Promise<void>;
}
