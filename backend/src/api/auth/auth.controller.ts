import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { LoginRequest, RegisterRequest } from 'src/api/auth/dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	public async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterRequest
	) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	public async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequest
	) {
		return this.authService.login(res, dto)
	}
}
