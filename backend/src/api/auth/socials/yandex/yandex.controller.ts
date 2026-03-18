import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from 'src/api/auth/auth.service'

@Controller('auth/yandex')
export class YandexController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {}

	@Get()
	@UseGuards(AuthGuard('yandex'))
	async yandexAuth(@Req() req: Request) {}

	@Get('redirect')
	@UseGuards(AuthGuard('yandex'))
	async yandexAuthRedirect(@Req() req: Request, @Res() res: Response) {
		await this.authService.yandexAuth(req.user, res)

		return res.redirect(`${this.configService.getOrThrow('CLIENT_URL')}`)
	}
}
