import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { UploadService } from './upload.service'

@ApiTags('Публикация файлов')
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const suffix = Date.now()
					cb(null, `${suffix}${extname(file.originalname)}`)
				}
			})
		})
	)
	@ApiResponse({ description: 'Загрузка файлов на сервер' })
	public uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.upload(file)
	}
}
