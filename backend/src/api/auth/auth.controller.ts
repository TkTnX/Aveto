import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginRequest, RegisterRequest, ResetPasswordReqest, SendCodeRequest, VerifyCodeRequest } from 'src/api/auth/dto';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';



import { AuthService } from './auth.service';



















































































@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiResponse({ description: 'Регистрация пользователя' })
	public async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterRequest
	) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	@ApiResponse({ description: 'Вход в аккаунт пользователя' })
	public async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequest
	) {
		return this.authService.login(res, dto)
	}

	@UseGuards(AuthGuard)
	@Post('logout')
	@ApiResponse({ description: 'Выход из аккаунта' })
	public async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}

	@Post('send-code/:type')
	@ApiResponse({ description: 'Отправка кода' })
	public async sendCode(
		@Body() dto: SendCodeRequest,
		@Param('type') type: string
	) {
		return this.authService.sendCode(dto, type)
	}

	@Patch('reset-password')
	@ApiResponse({ description: 'Восстановление пароля' })
	public async resetPassword(@Body() dto: ResetPasswordReqest) {
		return this.authService.resetPassword(dto)
	}

	@Post('verify')
	@ApiResponse({ description: 'Проверка кода' })
	public async verifyCode(@Body() dto: VerifyCodeRequest) {
		return this.authService.verifyCode(dto)
	}

	@Post('refresh')
	@ApiResponse({ description: 'Рефреш токенов' })
	public async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	) {
		return this.authService.refresh(request, response)
	}
}
