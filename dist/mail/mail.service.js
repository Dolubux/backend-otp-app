"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = MailService_1 = class MailService {
    mailerService;
    logger = new common_1.Logger(MailService_1.name);
    frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendUserConfirmation(email, name, token) {
        const url = `${this.frontendUrl}/confirm-email?token=${token}`;
        const template = './confirmation';
        const subject = 'Bienvenue sur notre plateforme ! Confirmez votre email';
        try {
            await this.mailerService.sendMail({
                to: email,
                subject,
                template,
                context: { name, url },
            });
            this.logger.log(`Email de confirmation envoyé à ${email}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi de l'email de confirmation à ${email}`, error.stack);
            throw new Error('Impossible d\'envoyer l\'email de confirmation');
        }
    }
    async sendPasswordReset(email, name, token) {
        const url = `${this.frontendUrl}/reset-password?token=${token}`;
        const template = './password-reset';
        const subject = 'Réinitialisation de votre mot de passe';
        try {
            await this.mailerService.sendMail({
                to: email,
                subject,
                template,
                context: { name, url },
            });
            this.logger.log(`Email de réinitialisation envoyé à ${email}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi de l'email de réinitialisation à ${email}`, error.stack);
            throw new Error('Impossible d\'envoyer l\'email de réinitialisation');
        }
    }
    async sendCustomEmail(to, subject, template, context = {}) {
        if (!to || !subject || !template) {
            throw new Error('Les paramètres to, subject et template sont obligatoires');
        }
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                template: `./${template}`,
                context,
            });
            this.logger.log(`Email personnalisé envoyé à ${to} avec le template ${template}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi de l'email personnalisé à ${to}`, error.stack);
            throw new Error(`Impossible d'envoyer l'email: ${error.message}`);
        }
    }
    async sendAdminNotification(subject, message) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
            this.logger.warn('ADMIN_EMAIL non configuré. Impossible d\'envoyer la notification.');
            return false;
        }
        await this.mailerService.sendMail({
            to: adminEmail,
            subject: `[Notification Admin] ${subject}`,
            template: './admin-notification',
            context: {
                subject,
                message,
                date: new Date().toLocaleString(),
            },
        });
    }
    async sendContactNotification(contactDto) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
            this.logger.warn('ADMIN_EMAIL non configuré. Impossible d\'envoyer la notification de contact.');
            return false;
        }
        try {
            await this.mailerService.sendMail({
                to: adminEmail,
                subject: `[Contact] ${contactDto.subject}`,
                template: './contact-notification',
                context: {
                    name: contactDto.name,
                    email: contactDto.email,
                    subject: contactDto.subject,
                    message: contactDto.message,
                    date: new Date().toLocaleString(),
                },
            });
            this.logger.log(`Notification de contact envoyée à ${adminEmail} de la part de ${contactDto.email}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi de la notification de contact pour ${contactDto.email}`, error.stack);
            return false;
        }
    }
    async sendContactConfirmation(contactDto) {
        try {
            await this.mailerService.sendMail({
                to: contactDto.email,
                subject: `Confirmation de réception : ${contactDto.subject}`,
                template: './contact-confirmation',
                context: {
                    name: contactDto.name,
                    subject: contactDto.subject,
                    message: contactDto.message,
                    date: new Date().toLocaleString(),
                    supportEmail: process.env.SUPPORT_EMAIL || 'support@votredomaine.com',
                },
            });
            this.logger.log(`Confirmation de contact envoyée à ${contactDto.email}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi de la confirmation de contact à ${contactDto.email}`, error.stack);
            return false;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map