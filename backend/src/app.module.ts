import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AdModule } from './api/ad/ad.module'
import { AuthModule } from './api/auth/auth.module'
import { CategoryModule } from './api/category/category.module'
import { UserModule } from './api/user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { EmailModule } from './api/email/email.module';
import { UploadModule } from './api/upload/upload.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			
		}),
		AdModule,
		CategoryModule,
		PrismaModule,
		UserModule,
		AuthModule,
		EmailModule,
		UploadModule,
	]
})
export class AppModule {}
