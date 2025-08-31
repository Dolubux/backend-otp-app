import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'mariadb', // Changé de 'mysql' à 'mariadb' car vous utilisez MariaDB
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'c2243629c_otp',
  password: process.env.DB_PASSWORD || '4lFMWP].UlM?}DGH',
  database: process.env.DB_DATABASE || 'c2243629c_db_otp',
  autoLoadEntities: true,
  synchronize: true,
  ssl: false, // Désactivé comme dans la connexion CLI
  connectTimeout: 10000,
  extra: {
    socketPath: '/var/lib/mysql/mysql.sock', // Chemin du socket UNIX
    connectionLimit: 10,
    connectTimeout: 10000,
    charset: 'latin1', // Correspond au paramètre du serveur
  },
  logging: true, // Activer les logs pour le débogage
  retryAttempts: 5,
  retryDelay: 3000,
} as TypeOrmModuleOptions));
