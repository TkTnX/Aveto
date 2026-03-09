import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/api/auth/auth.module'
import { GoogleStrategy } from 'src/api/auth/strategies/google.strategy'

import { GoogleController } from './google.controller'

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [GoogleController],
	providers: [GoogleStrategy]
})
export class GoogleModule {}
