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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_entity_1 = require("./entities/category.entity");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll(includeInactive) {
        return this.categoriesService.findAll(includeInactive);
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
    toggleStatus(id) {
        return this.categoriesService.toggleStatus(id);
    }
    findByName(name) {
        return this.categoriesService.findByName(name);
    }
    getActiveCount() {
        return this.categoriesService.getActiveCount();
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Catégorie créée avec succès', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les catégories' }),
    (0, swagger_1.ApiQuery)({ name: 'includeInactive', required: false, type: Boolean, description: 'Inclure les catégories inactives' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des catégories', type: [category_entity_1.Category] }),
    __param(0, (0, common_1.Query)('includeInactive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une catégorie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie trouvée', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une catégorie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie mise à jour', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nom de catégorie déjà utilisé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une catégorie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie supprimée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activer/désactiver une catégorie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut de la catégorie modifié', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Get)('search/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher une catégorie par nom' }),
    (0, swagger_1.ApiParam)({ name: 'name', description: 'Nom de la catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie trouvée', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Get)('stats/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir le nombre de catégories actives' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nombre de catégories actives' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getActiveCount", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
