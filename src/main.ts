import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
  app.enableCors({
    origin: true, // Permet toutes les origines en développement
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
