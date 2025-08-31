import { Controller, Post, Body } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactMessage(@Body() contactDto: ContactDto) {
    return this.contactService.sendContactMessage(contactDto);
  }
}
