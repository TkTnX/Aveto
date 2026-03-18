import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryRequest } from 'src/api/category/dto';



import { CategoryService } from './category.service';























@ApiTags('Категории')
@Controller('categories')
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@ApiResponse({ description: 'Получение всех категорий' })
	public async getAll(@Query() params?: Record<string, unknown>) {
		return this.categoryService.getAll(params)
	}

	@Get(':slug')
	@ApiResponse({ description: 'Получение категорий по SLUG' })
	public async getBySlugWithChildren(@Param('slug') slug: string) {
		return this.categoryService.getBySlugWithChildren(slug)
	}

	@Post()
	@ApiResponse({ description: 'Создание категорий' })
	public async create(@Body() dto: CategoryRequest) {
		return this.categoryService.create(dto)
	}
}
