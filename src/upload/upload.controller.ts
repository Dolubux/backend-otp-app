import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto/upload-response.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload d\'une seule image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploadée avec succès', type: UploadResponseDto })
  @ApiResponse({ status: 400, description: 'Fichier invalide ou manquant' })
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const url = await this.uploadService.uploadSingle(file);
    return { url };
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload de plusieurs images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Images uploadées avec succès', type: MultipleUploadResponseDto })
  @ApiResponse({ status: 400, description: 'Fichiers invalides ou manquants' })
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<MultipleUploadResponseDto> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const urls = await this.uploadService.uploadMultiple(files);
    return { urls };
  }
}
