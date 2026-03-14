import { axiosInstance } from "@/src/shared";

export async function getUserReviews(userId: string) {
    const { data } = await axiosInstance.get(`reviews/${userId}`)
    
    return data
}