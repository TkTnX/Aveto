import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import {
	LoginRequest,
	RegisterRequest,
	ResetPasswordReqest,
	SendCodeRequest,
	VerifyCodeRequest
} from 'src/api/auth/dto'

import { AuthService } from './auth.service'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'

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

	@UseGuards(AuthGuard)
	@Post('logout')
	public async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}

	@Post('send-code/:type')
	public async sendCode(@Body() dto: SendCodeRequest, @Param('type') type:string) {
		return this.authService.sendCode(dto, type)
	}

	@Patch('reset-password')
	public async resetPassword(@Body() dto: ResetPasswordReqest) {
		return this.authService.resetPassword(dto)
		}

	@Post('verify')
	public async verifyCode(@Body() dto: VerifyCodeRequest) {
		return this.authService.verifyCode(dto)
	}

	@Post('refresh')
	public async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
		return this.authService.refresh(request, response)
	}
}
