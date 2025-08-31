"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    ssl: false,
    connectTimeout: 10000,
    extra: {
        connectionLimit: 10,
        connectTimeout: 10000,
        charset: 'latin1',
    },
    retryAttempts: 5,
    retryDelay: 3000,
}));
