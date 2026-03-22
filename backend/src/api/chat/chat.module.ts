import { Module } from '@nestjs/common'
import { UserModule } from 'src/api/user/user.module'

import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	imports: [UserModule],
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService]
})
export class ChatModule {}
