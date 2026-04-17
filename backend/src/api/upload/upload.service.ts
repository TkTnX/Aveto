import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    public async upload(file: Express.Multer.File | Express.Multer.File[]): Promise<string | string[]> {
        if (Array.isArray(file)) {
            return file.map((file) => `/uploads/${file.filename}`)
        }

        return `/uploads/${file.filename}`
    }
}
