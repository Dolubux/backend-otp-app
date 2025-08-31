import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Post('upload/:productId')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Seuls les fichiers image sont autorisés!'), false);
      }
    },
  }))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Param('productId') productId: string) {
    if (!files || files.length === 0) {
      throw new Error('Aucun fichier fourni');
    }

    const mediaPromises = files.map(async (file, index) => {
      const createMediaDto: CreateMediaDto = {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
        url: `/uploads/${file.filename}`,
        size: file.size,
        productId,
        isMain: index === 0, // Le premier fichier devient l'image principale
      };

      return this.mediaService.create(createMediaDto);
    });

    return await Promise.all(mediaPromises);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.mediaService.findByProduct(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Patch(':id/set-main/:productId')
  setMainImage(@Param('id') id: string, @Param('productId') productId: string) {
    return this.mediaService.setMainImage(id, productId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
