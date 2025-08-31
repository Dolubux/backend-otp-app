import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, name: string, token: string) {
    const url = `http://votre-frontend.com/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Bienvenue sur notre plateforme ! Confirmez votre email',
      template: './confirmation', // Le nom du template (sans l'extension)
      context: {
        name,
        url,
      },
    });
  }

  async sendPasswordReset(email: string, name: string, token: string) {
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

  async sendCustomEmail(to: string, subject: string, template: string, context: any) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: `./${template}`,
      context,
    });
  }

  async sendAdminNotification(subject: string, message: string) {
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

  async sendContactNotification(contactDto: any) {
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

  async sendContactConfirmation(contactDto: any) {
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
}
