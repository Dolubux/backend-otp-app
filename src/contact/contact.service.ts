import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private mailService: MailService) {}

  async sendContactMessage(contactDto: ContactDto) {
    // Envoyer l'email à l'administrateur
    await this.mailService.sendContactNotification(contactDto);
    
    // Envoyer un accusé de réception à l'expéditeur
    await this.mailService.sendContactConfirmation(contactDto);
    
    return { message: 'Votre message a été envoyé avec succès. Nous vous répondrons dès que possible.' };
  }
}
