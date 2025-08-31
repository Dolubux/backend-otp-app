import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';
export declare class ContactService {
    private mailService;
    constructor(mailService: MailService);
    sendContactMessage(contactDto: ContactDto): Promise<{
        message: string;
    }>;
}
