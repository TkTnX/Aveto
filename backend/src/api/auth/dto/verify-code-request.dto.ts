import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class VerifyCodeRequest {
	@ApiProperty({
		title: 'Код',
		example: '000000',
		type: String
	})
	@IsString({ message: 'Код должен быть строкой' })
	@Length(6, 6, { message: 'Код должен быть из 6 символов!' })
	code: string
}
