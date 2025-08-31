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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendUserConfirmation(email, name, token) {
        const url = `http://votre-frontend.com/confirm-email?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Bienvenue sur notre plateforme ! Confirmez votre email',
            template: './confirmation',
            context: {
                name,
                url,
            },
        });
    }
    async sendPasswordReset(email, name, token) {
        const url = `http://votre-frontend.com/reset-password?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            template: './password-reset',
            context: {
                name,
                url,
            },
        });
    }
    async sendCustomEmail(to, subject, template, context) {
        await this.mailerService.sendMail({
            to,
            subject,
            template: `./${template}`,
            context,
        });
    }
    async sendAdminNotification(subject, message) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
            console.warn('ADMIN_EMAIL non configuré. Impossible d\'envoyer la notification.');
            return;
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
            console.warn('ADMIN_EMAIL non configuré. Impossible d\'envoyer la notification de contact.');
            return;
        }
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
    }
    async sendContactConfirmation(contactDto) {
        await this.mailerService.sendMail({
            to: contactDto.email,
            subject: `Confirmation de réception : ${contactDto.subject}`,
            template: './contact-confirmation',
            context: {
                name: contactDto.name,
                subject: contactDto.subject,
                message: contactDto.message,
                date: new Date().toLocaleString(),
            },
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map