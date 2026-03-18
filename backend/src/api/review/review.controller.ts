import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { ReviewRequest } from 'src/api/review/dto'

import { ReviewService } from './review.service'

@ApiTags('Отзывы')
@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get(':userId')
	@ApiResponse({ description: 'Получение отзывов пользователя' })
	public async getUserReviews(@Param('userId') userId: string) {
		return this.reviewService.getUserReviews(userId)
	}

	@UseGuards(AuthGuard)
	@Post()
	@ApiResponse({ description: 'Написание отзыва' })
	public async writeReview(
		@Body() dto: ReviewRequest,
		@User('userId') writerId: string
	) {
		return this.reviewService.writeReview(dto, writerId)
	}
}
