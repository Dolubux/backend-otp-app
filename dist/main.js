"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('OTP API')
        .setDescription('API pour la gestion des produits, commandes et statistiques')
        .setVersion('1.0')
        .addTag('products', 'Gestion des produits')
        .addTag('orders', 'Gestion des commandes')
        .addTag('categories', 'Gestion des catégories')
        .addTag('statistics', 'Statistiques')
        .addTag('upload', 'Upload d\'images')
        .addTag('media', 'Gestion des médias et images')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map