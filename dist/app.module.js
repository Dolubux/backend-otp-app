"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const categories_module_1 = require("./categories/categories.module");
const statistics_module_1 = require("./statistics/statistics.module");
const upload_module_1 = require("./upload/upload.module");
const auth_module_1 = require("./auth/auth.module");
const media_module_1 = require("./media/media.module");
const contact_module_1 = require("./contact/contact.module");
const mail_module_1 = require("./mail/mail.module");
const database_config_1 = __importDefault(require("./config/database.config"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default],
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const config = configService.get('database');
                    if (!config) {
                        throw new Error('Configuration de la base de données introuvable');
                    }
                    const dbConfig = {
                        ...config,
                        logging: process.env.NODE_ENV === 'production'
                            ? ['error', 'warn']
                            : ['error', 'warn', 'query'],
                        cache: false,
                        synchronize: process.env.NODE_ENV !== 'production',
                    };
                    const logConfig = {
                        type: dbConfig.type,
                        database: dbConfig.database,
                        entities: dbConfig.entities ? 'chargées' : 'non spécifiées',
                        synchronize: dbConfig.synchronize,
                        logging: dbConfig.logging,
                    };
                    if ('host' in dbConfig)
                        logConfig.host = dbConfig.host;
                    if ('port' in dbConfig)
                        logConfig.port = dbConfig.port;
                    if ('ssl' in dbConfig)
                        logConfig.ssl = dbConfig.ssl;
                    if (dbConfig.extra) {
                        logConfig.extra = {
                            ...dbConfig.extra,
                            password: '***',
                        };
                    }
                    console.log('Configuration de la base de données:', logConfig);
                    return dbConfig;
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            media_module_1.MediaModule,
            contact_module_1.ContactModule,
            mail_module_1.MailModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            categories_module_1.CategoriesModule,
            statistics_module_1.StatisticsModule,
            upload_module_1.UploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map