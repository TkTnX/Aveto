import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private resend: Resend

    public constructor(private readonly configService: ConfigService) {
        this.resend = new Resend(
            this.configService.getOrThrow('RESEND_API_KEY')
        )
    }

    public async sendCodeEmail(email: string, title: string, code: string) {
        const response = await this.resend.emails.send({
            from: 'Aveto <onboarding@resend.dev>',
            to: email,
            subject: title,
            html: `
                <h2>${title}</h2>
                <p>Ваш код: ${code}</p>
                <p>Время действия кода 5 минут</p>
            `
        })

        return response
    }
}
