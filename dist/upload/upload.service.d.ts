export declare class UploadService {
    private readonly uploadPath;
    constructor();
    uploadSingle(file: Express.Multer.File): Promise<string>;
    uploadMultiple(files: Express.Multer.File[]): Promise<string[]>;
    private validateImageFile;
    private generateFilename;
}
