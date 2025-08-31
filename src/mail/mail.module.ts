import { Module, Logger } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('MailerConfig');
        const nodeEnv = configService.get('NODE_ENV') || 'development';
        const isProduction = nodeEnv === 'production';
        const isTest = nodeEnv === 'test';
        
        // Configuration de base
        const mailConfig = {
          host: configService.get('MAIL_HOST'),
          port: parseInt(configService.get('MAIL_PORT') || '465', 10),
          secure: configService.get('MAIL_SECURE') === 'true',
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
          tls: {
            // Désactive la vérification du certificat en développement
            rejectUnauthorized: isProduction,
          },
          // Configuration du pool de connexions
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          rateDelta: 1000,
          rateLimit: 5,
          // Activation du débogage en développement
          debug: !isProduction,
          logger: !isProduction,
        };

        // Configuration pour les tests
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
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          };
        }

        // Configuration pour la production/développement
        logger.log(`Configuration du serveur SMTP: ${mailConfig.host}:${mailConfig.port}`);
        logger.log(`Utilisateur SMTP: ${mailConfig.auth.user}`);
        
        return {
          transport: mailConfig,
          defaults: {
            from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
