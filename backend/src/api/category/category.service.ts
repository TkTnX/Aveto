import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Category } from 'generated/prisma/client'
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

		for (let i = 0; i < categories.length; i++) {
			const children = await this.getChildren(categories[i].id)

			categories[i].children = children
		}

		return categories
	}

	public async getBySlugWithChildren(slug: string) {
		const category = await this.prismaService.category.findUnique({
			where: { slug },
			include: {
				children: true
			}
		})

		if (!category) throw new NotFoundException('Категория не найдена!')

		const children = await this.getChildren(category.id)
		return { category, children }
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
				image: dto.image,
				parentId: dto.parentId
			}
		})

		if (!newCategory)
			throw new BadGatewayException('Не удалось создать категорию')

		return newCategory
	}

	private async getChildren(categoryId: string) {
		const children = await this.prismaService.category.findMany({
			where: { parentId: categoryId }
		})

		const result: (Category & { children: Category[] })[] = []

		for (const child of children) {
			const sub = await this.getChildren(child.id)

			result.push({
				...child,
				children: sub
			})
		}

		return result
	}
}
