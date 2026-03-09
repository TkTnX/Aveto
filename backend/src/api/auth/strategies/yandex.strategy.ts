import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.getOrThrow('YANDEX_CLIENT_ID'),
			clientSecret: configService.getOrThrow('YANDEX_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow('YANDEX_CLIENT_REDIRECT_URL')
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: any
	): Promise<any> {
		const { name, emails, photos } = profile
		console.log(profile)
		const user = {
			email: emails[0].value,
			name: name.display_name,
			avatar: photos[0].value,
			accessToken
		}

		done(null, user)
	}
}
