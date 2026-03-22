import { Module } from '@nestjs/common'
import { ChatModule } from 'src/api/chat/chat.module'
import { UserModule } from 'src/api/user/user.module'

import { MessageController } from './message.controller'
import { MessageService } from './message.service'

@Module({
	imports: [UserModule, ChatModule],
	controllers: [MessageController],
	providers: [MessageService]
})
export class MessageModule {}
