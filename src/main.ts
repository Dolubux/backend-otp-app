import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'],
    });

    // Configuration CORS plus stricte
    app.enableCors({
      origin: ['https://oeil-du-topo-consulting.com', 'https://www.oeil-du-topo-consulting.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // Validation globale
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Configuration Swagger
    const config = new DocumentBuilder()
      .setTitle('OTP API')
      .setDescription('API pour la gestion des produits, commandes et statistiques')
      .setVersion('1.0')
      .addServer('https://api.oeil-du-topo-consulting.com', 'Production')
      .addTag('products', 'Gestion des produits')
      .addTag('orders', 'Gestion des commandes')
      .addTag('categories', 'Gestion des catégories')
      .addTag('statistics', 'Statistiques')
      .addTag('upload', 'Upload d\'images')
      .addTag('media', 'Gestion des médias et images')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Démarrer l'application
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: http://localhost:${port}`);
    
  } catch (error) {
    console.error('Error during application startup', error);
    process.exit(1);
  }
}

bootstrap();