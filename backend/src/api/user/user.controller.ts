import {
	Body,
	Controller,
	Get,
	Patch,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { UserUpdateRequest } from 'src/api/user/dto'
import { IAuthPayload } from 'src/types'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('me')
	public async getMe(@User() user: IAuthPayload) {
		return this.userService.getMe(user)
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
	public async update(
		@UploadedFile() file: Express.Multer.File,
		@Body() body: UserUpdateRequest,
		@User() payload: IAuthPayload
	) {
		console.log(file)
		return this.userService.update(body, file, payload)
	}
}
