import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { User } from 'src/api/auth/decorators/user.decorator'
import { ReviewRequest } from 'src/api/review/dto'

import { ReviewService } from './review.service'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get(':userId')
	public async getUserReviews(@Param('userId') userId: string) {
		return this.reviewService.getUserReviews(userId)
	}

	@UseGuards(AuthGuard)
	@Post()
	public async writeReview(
		@Body() dto: ReviewRequest,
		@User('userId') writerId: string
	) {
		return this.reviewService.writeReview(dto, writerId)
	}
}
