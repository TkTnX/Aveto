import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    public async upload(file: Express.Multer.File): Promise<string> {
        return `/uploads/${file.filename}`
    }
}
