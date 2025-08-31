"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        logger.log('Démarrage de l\'application...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        });
        logger.log('Application créée avec succès');
        const corsOptions = {
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        app.enableCors(corsOptions);
        logger.log('CORS configuré avec succès');
        const uploadsPath = (0, path_1.join)(__dirname, '..', 'uploads');
        app.useStaticAssets(uploadsPath, {
            prefix: '/uploads/',
        });
        logger.log(`Dossier des uploads configuré: ${uploadsPath}`);
        const validationPipe = new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        });
        app.useGlobalPipes(validationPipe);
        logger.log('Validation globale configurée');
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
        logger.log('Swagger configuré avec succès');
        const port = process.env.PORT || 3000;
        await app.listen(port);
        logger.log(`Application démarrée sur le port ${port}`);
        logger.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
        logger.log(`URL Swagger: http://localhost:${port}/api`);
    }
    catch (error) {
        logger.error('Erreur lors du démarrage de l\'application', error);
        process.exit(1);
    }
}
bootstrap().catch(error => {
    console.error('Erreur critique lors du démarrage:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map