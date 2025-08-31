import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import databaseConfig from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', '..', 'public'), // Chemin vers le dossier public
        serveRoot: '/public', // URL de base pour accéder aux fichiers
        serveStaticOptions: {
          index: false, // Ne pas servir d'index.html par défaut
          redirect: false, // Ne pas rediriger
        },
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        load: [databaseConfig],
        envFilePath: '.env',
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const config = configService.get('database');
          return {
            ...config,
          } as TypeOrmModuleOptions;
        },
        inject: [ConfigService],
      }),
      AuthModule,
      MediaModule,
      ContactModule,
      MailModule,
      UsersModule,
      ProductsModule,
      OrdersModule,
      CategoriesModule,
      StatisticsModule,
      UploadModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
