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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const order_entity_1 = require("./entities/order.entity");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }
    async findAll(status) {
        if (status) {
            return await this.ordersService.findByStatus(status);
        }
        return await this.ordersService.findAll();
    }
    async findOne(id) {
        return await this.ordersService.findOne(id);
    }
    async update(id, updateOrderDto) {
        return await this.ordersService.update(id, updateOrderDto);
    }
    async updateStatus(id, status) {
        return await this.ordersService.updateStatus(id, status);
    }
    async remove(id) {
        await this.ordersService.remove(id);
        return { message: 'Commande supprimée avec succès' };
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commande créée avec succès', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produit non trouvé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les commandes' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des commandes', type: [order_entity_1.Order] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une commande par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande trouvée', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une commande' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande mise à jour', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour le statut d\'une commande' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut de la commande mis à jour', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une commande' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la commande à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande supprimée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map