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

	public async getBySlug(slug: string) {
		const ad = await this.prismaService.ad.findUnique({
			where: { slug },
			include: {
				characteristics: true,
				seller: {
					omit: {
						password: true
					}
				},
				category: {
					include: {
						parent: true
					}
				}
			}
		})

		if (!ad) throw new NotFoundException('Объявление не найдено!')

		await this.prismaService.ad.update({
			where: { id: ad.id },
			data: {
				views: {
					increment: 1
				}
			}
		})

		return ad
	}

	public async create(
		dto: AdRequest,
		files: Express.Multer.File[],
		user: IAuthPayload
	) {
		const images: string[] = []
		const baseSlug = slugify(dto.title, {
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
				slug: `${baseSlug}_${Math.floor(1000 + Math.random() * 1000000).toString()}`,
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
