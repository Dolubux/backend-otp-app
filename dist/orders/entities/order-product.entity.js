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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const product_entity_1 = require("../../products/entities/product.entity");
let OrderProduct = class OrderProduct {
    id;
    quantity;
    price;
    orderId;
    productId;
    order;
    product;
    createdAt;
    updatedAt;
};
exports.OrderProduct = OrderProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderProduct.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, order => order.orderProducts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", order_entity_1.Order)
], OrderProduct.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.orderProducts, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], OrderProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OrderProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OrderProduct.prototype, "updatedAt", void 0);
exports.OrderProduct = OrderProduct = __decorate([
    (0, typeorm_1.Entity)('order_products')
], OrderProduct);
