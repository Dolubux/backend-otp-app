import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'mysql', // Changé de 'mysql' à 'mariadb' car vous utilisez MariaDB
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT?.toString() || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  ssl: false, // Désactivé comme dans la connexion CLI
  logging: true,
} as TypeOrmModuleOptions));
