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
          
          // Vérification de la configuration
          if (!config) {
            throw new Error('Configuration de la base de données introuvable');
          }
          
          // Configuration de base avec typage étendu
          const dbConfig: TypeOrmModuleOptions & { 
            host?: string; 
            port?: number; 
            ssl?: boolean | any;
            extra?: any;
          } = {
            ...config,
            // Activation des logs en fonction de l'environnement
            logging: process.env.NODE_ENV === 'production' 
              ? ['error', 'warn'] 
              : ['error', 'warn', 'query'],
            // Désactivation du cache pour le débogage
            cache: false,
            // Désactivation de la synchronisation automatique en production
            synchronize: process.env.NODE_ENV !== 'production',
          };
          
          // Log de la configuration (sans informations sensibles)
          const logConfig: Record<string, any> = {
            type: dbConfig.type,
            database: dbConfig.database,
            entities: dbConfig.entities ? 'chargées' : 'non spécifiées',
            synchronize: dbConfig.synchronize,
            logging: dbConfig.logging,
          };
          
          // Ajout des propriétés optionnelles si elles existent
          if ('host' in dbConfig) logConfig.host = dbConfig.host;
          if ('port' in dbConfig) logConfig.port = dbConfig.port;
          if ('ssl' in dbConfig) logConfig.ssl = dbConfig.ssl;
          if (dbConfig.extra) {
            logConfig.extra = {
              ...dbConfig.extra,
              password: '***', // Ne pas logger le mot de passe
            };
          }
          
          console.log('Configuration de la base de données:', logConfig);
          
          return dbConfig;
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
