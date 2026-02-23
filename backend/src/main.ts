import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
	const logger = new Logger()
	const config = new ConfigService()

	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())
	app.enableCors(config.getOrThrow('CLIENT_URL'))
	app.setGlobalPrefix('api')

	try {
		await app.listen(config.getOrThrow('SERVER_PORT'))
		logger.log(
			`Сервер запущен по адресу: ${config.getOrThrow('SERVER_URL')}`
		)
	} catch (error) {
		logger.error('Не удалось запустить сервер!')
	}
}
bootstrap()
