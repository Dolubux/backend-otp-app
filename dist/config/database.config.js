"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    const baseConfig = {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        logging: process.env.NODE_ENV !== 'production' ? true : ['error', 'warn', 'query'],
        ssl: false,
        connectTimeout: 30000,
        acquireTimeout: 30000,
        retryAttempts: 5,
        retryDelay: 3000,
    };
    const extraOptions = {
        ssl: false,
        insecureAuth: true,
        connectionLimit: 10,
        connectTimeout: 30000,
        charset: 'latin1',
        sslMode: 'DISABLED',
    };
    return {
        ...baseConfig,
        extra: extraOptions,
    };
});
//# sourceMappingURL=database.config.js.map