import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CategoryRequest } from 'src/api/category/dto'

import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@Get()
	public async getAll(@Query() params?: Record<string, unknown>) {
		return this.categoryService.getAll(params)
	}

	@Get(':slug')
	public async getBySlugWithChildren(@Param('slug') slug: string) {
		return this.categoryService.getBySlugWithChildren(slug)
	}

	@Post()
	public async create(@Body() dto: CategoryRequest) {
		return this.categoryService.create(dto)
	}
}
