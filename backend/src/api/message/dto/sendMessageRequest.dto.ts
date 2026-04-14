import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { EMessageType } from 'generated/prisma/enums'

export class SendMessageRequst {
	@ApiProperty({
		title: 'Текст сообщения',
		example: 'Всё супер!',
		type: String
	})
	@IsNotEmpty({ message: 'Текст обязателен!' })
	@IsString({ message: 'Текст должен быть строкой!' })
	text!: string

	type?: EMessageType

	
	replyTo?: string
}
