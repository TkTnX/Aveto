import { getUserReviews } from "@/src/api";
import { IReview } from "@/src/shared/types";
import { useQuery } from "@tanstack/react-query";

export function useReviews() {
    const userReviewsQuery = (userId: string) => useQuery({
        queryKey: ['get user reviews', userId],
        queryFn: (): Promise<IReview[]> => getUserReviews(userId)
    }) 


    return {
        userReviewsQuery
    }
}