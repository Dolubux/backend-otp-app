import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  // Configuration de base commune
  const baseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true, // Désactivé pour la production
    logging: process.env.NODE_ENV !== 'production' ? true : ['error', 'warn', 'query'],
    // Désactive complètement SSL
    ssl: false,
    // Options de connexion
    connectTimeout: 30000,
    acquireTimeout: 30000,
    retryAttempts: 5,
    retryDelay: 3000,
  };

  // Options supplémentaires pour le driver MySQL
  const extraOptions = {
    ssl: false,
    insecureAuth: true,
    connectionLimit: 10,
    connectTimeout: 30000,
    charset: 'latin1',
    sslMode: 'DISABLED',
  };

  // Fusionner les configurations
  return {
    ...baseConfig,
    extra: extraOptions,
  };
});
