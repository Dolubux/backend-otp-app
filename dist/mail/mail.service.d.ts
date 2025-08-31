import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    private readonly logger;
    private readonly frontendUrl;
    constructor(mailerService: MailerService);
    sendUserConfirmation(email: string, name: string, token: string): Promise<void>;
    sendPasswordReset(email: string, name: string, token: string): Promise<void>;
    sendCustomEmail(to: string, subject: string, template: string, context?: Record<string, any>): Promise<void>;
    sendAdminNotification(subject: string, message: string): Promise<false | undefined>;
    sendContactNotification(contactDto: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<boolean>;
    sendContactConfirmation(contactDto: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<boolean>;
}
