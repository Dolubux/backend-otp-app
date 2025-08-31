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


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [databaseConfig],
        envFilePath: '.env',
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const config = configService.get('database');
          console.log('Database configuration:', {
            host: config.host,
            port: config.port,
            username: config.username,
            database: config.database,
            ssl: config.ssl
          });
          return {
            ...config,
            logging: true, // Activer les logs SQL
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
