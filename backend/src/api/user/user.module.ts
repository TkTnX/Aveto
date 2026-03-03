import { Module } from '@nestjs/common'
import { UploadModule } from 'src/api/upload/upload.module'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [UploadModule],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
