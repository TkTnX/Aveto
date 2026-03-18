import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from 'src/api/auth/auth.service';












@ApiTags('Вход в аккаунт через гугл')
@Controller('auth/google')
export class GoogleController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	@ApiResponse({ description: 'Роут к авторизации через Гугл' })
	async googleAuth(@Req() req: Request) {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	@ApiResponse({ description: 'Перенаправление посел авторизации через гугл' })
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		await this.authService.googleLogin(req.user, res)
		return res.redirect(`${this.configService.getOrThrow('CLIENT_URL')}`)
	}
}
