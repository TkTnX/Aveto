import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdModule } from './api/ad/ad.module';
import { CategoryModule } from './api/category/category.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AdModule,
		CategoryModule,
		PrismaModule
	]
})
export class AppModule {}
