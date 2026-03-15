import { axiosInstance } from "@/src/shared";
import { IWriteReview } from "@/src/shared/types";

export async function getUserReviews(userId: string) {
    const { data } = await axiosInstance.get(`reviews/${userId}`)
    
    return data
}

export async function writeReview(values: IWriteReview) {
    const { data } = await axiosInstance.post(`reviews`, values)
    
    return data
}