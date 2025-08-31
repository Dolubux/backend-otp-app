import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    logger.log('Démarrage de l\'application...');
    
    // Création de l'application avec logging activé
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    
    // Configuration de base
    logger.log('Application créée avec succès');
    
    // Configuration CORS
    const corsOptions = {
      origin: true, // Permet toutes les origines en développement
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };
    
    app.enableCors(corsOptions);
    logger.log('CORS configuré avec succès');
    
    // Configuration du dossier des uploads
    const uploadsPath = join(__dirname, '..', 'uploads');
    app.useStaticAssets(uploadsPath, {
      prefix: '/uploads/',
    });
    logger.log(`Dossier des uploads configuré: ${uploadsPath}`);
    
    // Validation globale
    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
    
    app.useGlobalPipes(validationPipe);
    logger.log('Validation globale configurée');

    // Configuration Swagger
    const config = new DocumentBuilder()
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

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    logger.log('Swagger configuré avec succès');

    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    logger.log(`Application démarrée sur le port ${port}`);
    logger.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`URL Swagger: http://localhost:${port}/api`);
    
  } catch (error) {
    logger.error('Erreur lors du démarrage de l\'application', error);
    process.exit(1);
  }
}

bootstrap().catch(error => {
  console.error('Erreur critique lors du démarrage:', error);
  process.exit(1);
});
