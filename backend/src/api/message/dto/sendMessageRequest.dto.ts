import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { EMessageType } from 'generated/prisma/enums'

export class SendMessageRequst {
	@ApiProperty({
		title: 'Текст сообщения',
		example: 'Всё супер!',
		type: String
	})
	@IsString({ message: 'Текст должен быть строкой!' })
	text?: string

	@ApiProperty({
		title: "Изображения, Видео и тд",
		example: ['/uploads/123.jpg', '/uploads/media.mp3'],
		type: String
	})
	media!: string[]
	
	type?: EMessageType

	
	replyTo?: string
}
