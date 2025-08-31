import { UploadService } from './upload.service';
import { UploadResponseDto, MultipleUploadResponseDto } from './dto/upload-response.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadSingle(file: Express.Multer.File): Promise<UploadResponseDto>;
    uploadMultiple(files: Express.Multer.File[]): Promise<MultipleUploadResponseDto>;
}
