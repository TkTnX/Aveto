import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { UserUpdateRequest } from 'src/api/user/dto'
import { IAuthPayload } from 'src/types'

import { UserService } from './user.service'

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('me')
	@ApiResponse({ description: 'Получение личного аккаунта' })
	public async getMe(@User() user: IAuthPayload) {
		return this.userService.getMe(user)
	}

	@Get('brand/:brandId')
	@ApiResponse({ description: 'Получение аккаунта продавца' })
	public async getBrand(@Param('brandId') brandId: string) {
		return this.userService.getBrand(brandId)
	}

	@UseGuards(AuthGuard)
	@Patch()
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const suffix = Date.now()
					cb(null, `${suffix}${extname(file.originalname)}`)
				}
			})
		})
	)
	@ApiResponse({ description: 'Обновление профиля' })
	public async update(
		@UploadedFile() file: Express.Multer.File,
		@Body() body: UserUpdateRequest,
		@User() payload: IAuthPayload
	) {
		return this.userService.update(body, file, payload)
	}
}
