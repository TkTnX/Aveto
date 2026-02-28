import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { IAuthPayload } from 'src/types'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('me')
	public async getMe(@User() user: IAuthPayload) {
		return user
	}
}
