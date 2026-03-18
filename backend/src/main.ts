import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { join } from 'path'

import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

	const swaggerConfig = new DocumentBuilder().setTitle("AVETO").setDescription('API документация для сервиса AVETO').setVersion('1.0').addTag('AVETO').build();
	const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api/docs', app, documentFactory)

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
