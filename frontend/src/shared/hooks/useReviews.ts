import { useMutation, useQuery } from "@tanstack/react-query";



import { getUserReviews, writeReview } from "@/src/api";
import { IReview, IWriteReview } from "@/src/shared/types";









export function useReviews() {
    const userReviewsQuery = (userId: string) => useQuery({
        queryKey: ['get user reviews', userId],
        queryFn: (): Promise<IReview[]> => getUserReviews(userId)
    }) 

    const writeReviewMutation = () => useMutation({
        mutationKey: ['write review'],
        mutationFn: (values: IWriteReview): Promise<IReview> => writeReview(values)
    })

    return {
        userReviewsQuery,
        writeReviewMutation
    }
}