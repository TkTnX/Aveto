import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import slugify from 'slugify'
import { CategoryRequest } from 'src/api/category/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getAll() {
		const categories = await this.prismaService.category.findMany({
			include: { children: true }
		})

		if (!categories) throw new NotFoundException('Категории не найдены')

		return categories
	}

	public async create(dto: CategoryRequest) {
		const slug = slugify(dto.name, {
			replacement: '_',
			lower: true,
			locale: 'ru',
			remove: /[*+~.(),'"!:@]/g
		})

		const newCategory = await this.prismaService.category.create({
			data: {
				name: dto.name,
				slug,
				// TODO: Сделать добавление изображений
				image: dto.image,
				parentId: dto.parentId
			}
		})

		if (!newCategory)
			throw new BadGatewayException('Не удалось создать категорию')

		return newCategory
	}
}
