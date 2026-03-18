import { ApiProperty } from "@nestjs/swagger";

export class SendCodeRequest {
        @ApiProperty({
            title: 'Почта пользователя',
            example: 'test@example.com',
            type: String
        })
    email: string
}