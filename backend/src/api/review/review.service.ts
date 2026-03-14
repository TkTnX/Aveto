import { Injectable, NotFoundException } from '@nestjs/common'
import { ReviewRequest } from 'src/api/review/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReviewService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getUserReviews(userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		})
		if (!user) throw new NotFoundException('Пользователь не найден')

		const reviews = await this.prismaService.review.findMany({
			where: { receiverId: user.id },
			include: {
				ad: true,
				writer: true
			}
		})
		if (!reviews) throw new NotFoundException('Отзывы не найдены!')

		return reviews
	}

	public async writeReview(dto: ReviewRequest, writerId: string) {
		const { rating, receiverId, text, adId } = dto

		const receiver = await this.prismaService.user.findUnique({
			where: { id: receiverId },
			include: {
				receiverReviews: true
			}
		})
		if (!receiver) throw new NotFoundException('Пользователь не найден')

		const review = await this.prismaService.review.create({
			data: {
				rating,
				receiverId,
				text,
				writerId,
				adId
			}
		})

		const avgRating = await this.prismaService.review.aggregate({
			_avg: { rating: true },
			where: {
				receiverId: receiver.id
			}
		})

		await this.prismaService.user.update({
			where: { id: receiver.id },
			data: {
				rating: avgRating._avg.rating || receiver.rating
			}
		})

		return review
	}
}
