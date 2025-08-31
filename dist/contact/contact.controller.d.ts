import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    sendContactMessage(contactDto: ContactDto): Promise<{
        message: string;
    }>;
}
