import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRequest } from 'src/api/category/dto';

@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAll() {
    return this.categoryService.getAll()
  }

  @Post()
  public async create(@Body() dto: CategoryRequest) {
    return this.categoryService.create(dto)
  }
}
