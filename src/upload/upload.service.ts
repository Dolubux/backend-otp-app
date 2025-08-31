import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';

  constructor() {
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadSingle(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    this.validateImageFile(file);

    const filename = this.generateFilename(file.originalname);
    const filepath = path.join(this.uploadPath, filename);

    fs.writeFileSync(filepath, file.buffer);

    // Retourner l'URL relative
    return `/uploads/${filename}`;
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const urls: string[] = [];

    for (const file of files) {
      this.validateImageFile(file);
      
      const filename = this.generateFilename(file.originalname);
      const filepath = path.join(this.uploadPath, filename);

      fs.writeFileSync(filepath, file.buffer);
      urls.push(`/uploads/${filename}`);
    }

    return urls;
  }

  private validateImageFile(file: Express.Multer.File): void {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Limite de taille : 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 5MB');
    }
  }

  private generateFilename(originalname: string): string {
    const ext = extname(originalname);
    const name = uuidv4();
    return `${name}${ext}`;
  }
}
