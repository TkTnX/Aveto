import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/api/auth/auth.module'
import { YandexStrategy } from 'src/api/auth/strategies/yandex.strategy'

import { YandexController } from './yandex.controller'

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [YandexController],
	providers: [YandexStrategy]
})
export class YandexModule {}
