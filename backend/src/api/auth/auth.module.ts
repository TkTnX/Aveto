import { forwardRef, Module } from '@nestjs/common'
import { EmailModule } from 'src/api/email/email.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleModule } from './socials/google/google.module'
import { YandexModule } from './socials/yandex/yandex.module'

@Module({
	imports: [
		EmailModule,
		forwardRef(() => GoogleModule),
		forwardRef(() => YandexModule),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}
