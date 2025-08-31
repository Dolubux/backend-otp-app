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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_product_entity_1 = require("./entities/order-product.entity");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    orderRepository;
    orderProductRepository;
    productsService;
    usersService;
    constructor(orderRepository, orderProductRepository, productsService, usersService) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.productsService = productsService;
        this.usersService = usersService;
    }
    async create(createOrderDto) {
        const order = this.orderRepository.create({
            customer_name: createOrderDto.customer_name,
            customer_email: createOrderDto.customer_email,
            customer_phone: createOrderDto.customer_phone,
            total: createOrderDto.total,
            status: 'pending',
        });
        await this.usersService.create({
            name: createOrderDto.customer_name,
            email: createOrderDto.customer_email,
            phone: createOrderDto.customer_phone,
        });
        const savedOrder = await this.orderRepository.save(order);
        const orderProducts = await Promise.all(createOrderDto.orderProducts.map(async (item) => {
            await this.productsService.findOne(item.productId);
            const orderProduct = this.orderProductRepository.create({
                orderId: savedOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            });
            return await this.orderProductRepository.save(orderProduct);
        }));
        savedOrder.orderProducts = orderProducts;
        return savedOrder;
    }
    async findAll() {
        return await this.orderRepository.find({
            relations: ['orderProducts', 'orderProducts.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByStatus(status) {
        return await this.orderRepository.find({
            where: { status },
            relations: ['orderProducts', 'orderProducts.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderProducts', 'orderProducts.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        if (updateOrderDto.status)
            order.status = updateOrderDto.status;
        if (updateOrderDto.total !== undefined)
            order.total = updateOrderDto.total;
        if (updateOrderDto.items) {
            await this.orderProductRepository.delete({ orderId: id });
            const orderProducts = await Promise.all(updateOrderDto.items.map(async (item) => {
                await this.productsService.findOne(item.productId);
                const orderProduct = this.orderProductRepository.create({
                    orderId: id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                });
                return await this.orderProductRepository.save(orderProduct);
            }));
            order.orderProducts = orderProducts;
        }
        return await this.orderRepository.save(order);
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        return await this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_product_entity_1.OrderProduct)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map