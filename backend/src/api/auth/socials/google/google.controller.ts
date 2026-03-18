import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from 'src/api/auth/auth.service';











@Controller('auth/google')
export class GoogleController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req: Request) {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		 await this.authService.googleLogin(
			req.user,
			res
		)
		return res.redirect(`${this.configService.getOrThrow('CLIENT_URL')}`)
	}
}
