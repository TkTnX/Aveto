import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import slugify from 'slugify'
import { AdRequest } from 'src/api/ad/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AdService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getAll(query: Record<string, string>) {
		const ads = await this.prismaService.ad.findMany()

		if (!ads) throw new NotFoundException('Объявления не найдены!')

		return ads
	}

	public async create(dto: AdRequest) {
		const { images, ...restDto } = dto
		const slug = slugify(dto.title, {
			replacement: '_',
			lower: true,
			locale: 'ru',
			remove: /[*+~.(),'"!:@]/g
		})

		const newAd = await this.prismaService.ad.create({
			data: {
				...restDto,
				slug,
				sellerId: 'ddbd30ae-7f2b-423c-a393-0237032bfa8d'
			}
		})

		if (!newAd) throw new BadGatewayException('Объявление не было создано')

		return newAd
	}
}
