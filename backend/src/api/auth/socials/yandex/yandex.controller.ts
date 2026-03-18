import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { AuthService } from 'src/api/auth/auth.service'

@ApiTags('Вход в аккаунт через яндекс')
@Controller('auth/yandex')
export class YandexController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {}

	@Get()
	@UseGuards(AuthGuard('yandex'))
	@ApiResponse({ description: 'Роут к авторизации через Яндекс' })
	async yandexAuth(@Req() req: Request) {}

	@Get('redirect')
	@UseGuards(AuthGuard('yandex'))
	@ApiResponse({
		description: 'Перенаправление посел авторизации через Яндекс'
	})
	async yandexAuthRedirect(@Req() req: Request, @Res() res: Response) {
		await this.authService.yandexAuth(req.user, res)

		return res.redirect(`${this.configService.getOrThrow('CLIENT_URL')}`)
	}
}
