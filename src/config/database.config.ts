import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'mariadb', // Changé de 'mysql' à 'mariadb' car vous utilisez MariaDB
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  ssl: false, // Désactivé comme dans la connexion CLI
  connectTimeout: 10000,
  extra: {
    connectionLimit: 10,
    connectTimeout: 10000,
    charset: 'latin1', // Correspond au paramètre du serveur
  },
  retryAttempts: 5,
  retryDelay: 3000,
} as TypeOrmModuleOptions));
