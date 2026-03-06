import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import slugify from 'slugify'
import { AdRequest } from 'src/api/ad/dto'
import { UploadService } from 'src/api/upload/upload.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthPayload } from 'src/types'

@Injectable()
export class AdService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly uploadService: UploadService,
		private readonly configService: ConfigService
	) {}

	public async getAll(query: Record<string, string>) {
		const ads = await this.prismaService.ad.findMany({ where: query })

		if (!ads) throw new NotFoundException('Объявления не найдены!')

		return ads
	}

	public async create(
		dto: AdRequest,
		files: Express.Multer.File[],
		user: IAuthPayload
	) {
		const images: string[] = []
		const slug = slugify(dto.title, {
			replacement: '_',
			lower: true,
			locale: 'ru',
			remove: /[*+~.(),'"!:@]/g
		})

		for (let i = 0; i < files.length; i++) {
			const photoUrl = await this.uploadService.upload(files[i])
			images.push(
				`${this.configService.getOrThrow('SERVER_URL')}${photoUrl}`
			)
		}

		const newAd = await this.prismaService.ad.create({
			data: {
				...dto,
				slug,
				price: Number(dto.price),
				quantity: Number(dto.quantity),
				sellerId: user.userId,
				images
			}
		})

		if (!newAd) throw new BadGatewayException('Объявление не было создано')

		return newAd
	}
}
