import { Module } from '@nestjs/common'
import { UploadModule } from 'src/api/upload/upload.module'

import { AdController } from './ad.controller'
import { AdService } from './ad.service'

@Module({
	imports: [UploadModule],
	controllers: [AdController],
	providers: [AdService]
})
export class AdModule {}
