"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const users_service_1 = require("../users/users.service");
let StatisticsService = class StatisticsService {
    productRepository;
    orderRepository;
    usersService;
    constructor(productRepository, orderRepository, usersService) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.usersService = usersService;
    }
    async getStatistics() {
        const [totalUsers, totalProducts, totalOrders, totalRevenue, lowStockItems, recentOrders, monthlySales, topProducts,] = await Promise.all([
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
    async getTotalProducts() {
        return await this.productRepository.count();
    }
    async getTotalOrders() {
        return await this.orderRepository
            .createQueryBuilder('order')
            .where("order.status != 'cancelled'")
            .getCount();
    }
    async getTotalRevenue() {
        const result = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.total)', 'total')
            .where('order.status != :status', { status: 'cancelled' })
            .getRawOne();
        return parseFloat(result?.total || '0');
    }
    async getLowStockItems() {
        return await this.productRepository
            .createQueryBuilder('product')
            .where('product.stock <= :threshold', { threshold: 10 })
            .andWhere('product.inStock = :inStock', { inStock: true })
            .getCount();
    }
    async getRecentOrders() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return await this.orderRepository
            .createQueryBuilder('order')
            .where('order.createdAt >= :date', { date: thirtyDaysAgo })
            .andWhere("order.status != 'cancelled'")
            .getCount();
    }
    async getMonthlySales() {
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
    async getTopProducts() {
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
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], StatisticsService);
