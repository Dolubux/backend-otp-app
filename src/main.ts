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
    app.enableCors();

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
      .addServer('https://otp.babynounu.com', 'Production')
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
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    
  } catch (error) {
    console.error('Error during application startup', error);
    process.exit(1);
  }
}

bootstrap();