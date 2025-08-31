import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  constructor(private mailerService: MailerService) {}

  /**
   * Envoie un email de confirmation d'inscription
   * @param email Email du destinataire
   * @param name Nom du destinataire
   * @param token Jeton de confirmation
   */
  async sendUserConfirmation(email: string, name: string, token: string) {
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
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi de l'email de confirmation à ${email}`, error.stack);
      throw new Error('Impossible d\'envoyer l\'email de confirmation');
    }
  }

  /**
   * Envoie un email de réinitialisation de mot de passe
   * @param email Email du destinataire
   * @param name Nom du destinataire
   * @param token Jeton de réinitialisation
   */
  async sendPasswordReset(email: string, name: string, token: string) {
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
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi de l'email de réinitialisation à ${email}`, error.stack);
      throw new Error('Impossible d\'envoyer l\'email de réinitialisation');
    }
  }

  /**
   * Envoie un email personnalisé
   * @param to Email du destinataire
   * @param subject Sujet de l'email
   * @param template Nom du template (sans extension)
   * @param context Contexte pour le template
   */
  async sendCustomEmail(to: string, subject: string, template: string, context: Record<string, any> = {}) {
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
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi de l'email personnalisé à ${to}`, error.stack);
      throw new Error(`Impossible d'envoyer l'email: ${error.message}`);
    }
  }

  /**
   * Envoie une notification à l'administrateur
   * @param subject Sujet de la notification
   * @param message Contenu du message
   */
  async sendAdminNotification(subject: string, message: string) {
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

  /**
   * Envoie une notification à l'administrateur pour un nouveau contact
   * @param contactDto Données du formulaire de contact
   * @returns Promesse résolue si l'email est envoyé avec succès
   */
  async sendContactNotification(contactDto: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
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
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de la notification de contact pour ${contactDto.email}`,
        error.stack
      );
      return false;
    }
  }

  /**
   * Envoie une confirmation au visiteur qui a rempli le formulaire de contact
   * @param contactDto Données du formulaire de contact
   * @returns Promesse résolue si l'email est envoyé avec succès
   */
  async sendContactConfirmation(contactDto: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
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
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de la confirmation de contact à ${contactDto.email}`,
        error.stack
      );
      return false;
    }
  }
}
