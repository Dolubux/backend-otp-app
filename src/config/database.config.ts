import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'db_otp',
  autoLoadEntities: true,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'development',
  ssl: false, // <-- désactiver SSL
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  dateStrings: false,
} as TypeOrmModuleOptions));
