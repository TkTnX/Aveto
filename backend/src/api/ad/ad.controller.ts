import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AdRequest } from 'src/api/ad/dto'

import { AdService } from './ad.service'

@Controller('ads')
export class AdController {
	public constructor(private readonly adService: AdService) {}

	@Get()
	public async getAll(@Query() query: Record<string, string>) {
		return this.adService.getAll(query)
	}

	@Post()
	public async create(@Body() dto: AdRequest) {
		return this.adService.create(dto)
	}
}
