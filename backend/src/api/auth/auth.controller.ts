import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { LoginRequest, RegisterRequest, SendCodeRequest, VerifyCodeRequest } from 'src/api/auth/dto'

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

	@Post('send-code')
	public async sendCode(@Body() dto: SendCodeRequest) {
		return this.authService.sendCode(dto)
	}

	@Post('verify')
	public async verifyCode(@Body() dto: VerifyCodeRequest) {
		return this.authService.verifyCode(dto)
	}
}
