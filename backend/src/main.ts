import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';



import { AppModule } from './app.module';














async function bootstrap() {
	const logger = new Logger()
	const config = new ConfigService()

	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser())
	app.setGlobalPrefix('api')

	app.enableCors({
		origin: config.getOrThrow('CLIENT_URL'),
		credentials: true
	})
	app.useStaticAssets(join(process.cwd(), 'uploads'), {
		prefix: '/uploads/'
	})

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
