import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(email: string, name: string, token: string): Promise<void>;
    sendPasswordReset(email: string, name: string, token: string): Promise<void>;
    sendCustomEmail(to: string, subject: string, template: string, context: any): Promise<void>;
    sendAdminNotification(subject: string, message: string): Promise<void>;
    sendContactNotification(contactDto: any): Promise<void>;
    sendContactConfirmation(contactDto: any): Promise<void>;
}
