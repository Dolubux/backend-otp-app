"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("./mail.service");
const config_2 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_2.ConfigModule],
                useFactory: async (configService) => {
                    const logger = new common_1.Logger('MailerConfig');
                    const nodeEnv = configService.get('NODE_ENV') || 'development';
                    const isProduction = nodeEnv === 'production';
                    const isTest = nodeEnv === 'test';
                    const mailConfig = {
                        host: configService.get('MAIL_HOST'),
                        port: parseInt(configService.get('MAIL_PORT') || '465', 10),
                        secure: configService.get('MAIL_SECURE') === 'true',
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                        tls: {
                            rejectUnauthorized: isProduction,
                        },
                        pool: true,
                        maxConnections: 5,
                        maxMessages: 100,
                        rateDelta: 1000,
                        rateLimit: 5,
                        debug: !isProduction,
                        logger: !isProduction,
                    };
                    if (isTest) {
                        const testAccount = await nodemailer.createTestAccount();
                        logger.log('Utilisation d\'un compte de test Ethereal');
                        return {
                            transport: {
                                host: 'smtp.ethereal.email',
                                port: 587,
                                secure: false,
                                auth: {
                                    user: testAccount.user,
                                    pass: testAccount.pass,
                                },
                            },
                            defaults: {
                                from: `"No Reply" <${testAccount.user}>`,
                            },
                            template: {
                                dir: (0, path_1.join)(__dirname, 'templates'),
                                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                                options: {
                                    strict: true,
                                },
                            },
                        };
                    }
                    logger.log(`Configuration du serveur SMTP: ${mailConfig.host}:${mailConfig.port}`);
                    logger.log(`Utilisateur SMTP: ${mailConfig.auth.user}`);
                    return {
                        transport: mailConfig,
                        defaults: {
                            from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, 'templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map