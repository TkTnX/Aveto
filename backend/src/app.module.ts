import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AdModule } from './api/ad/ad.module'
import { AuthModule } from './api/auth/auth.module'
import { CategoryModule } from './api/category/category.module'
import { EmailModule } from './api/email/email.module'
import { ReviewModule } from './api/review/review.module'
import { UploadModule } from './api/upload/upload.module'
import { UserModule } from './api/user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { ChatModule } from './api/chat/chat.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET
		}),
		AdModule,
		CategoryModule,
		PrismaModule,
		UserModule,
		AuthModule,
		EmailModule,
		UploadModule,
		ReviewModule,
		ChatModule
	]
})
export class AppModule {}
