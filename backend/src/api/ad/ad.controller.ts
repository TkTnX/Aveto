import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AdRequest } from 'src/api/ad/dto'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { IAuthPayload } from 'src/types'

import { AdService } from './ad.service'

@Controller('ads')
export class AdController {
	public constructor(private readonly adService: AdService) {}

	@Get()
	public async getAll(@Query() query: Record<string, string>) {
		return this.adService.getAll(query)
	}

	@UseGuards(AuthGuard)
	@UseInterceptors(
		FilesInterceptor('images', 10, {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const suffix = Date.now()
					cb(null, `${suffix}${extname(file.originalname)}`)
				}
			})
		})
	)
	@Post()
	public async create(
		@UploadedFiles() images: Express.Multer.File[],
		@Body() dto: AdRequest,
		@User() user: IAuthPayload
	) {
		return this.adService.create(dto, images, user)
	}
}
