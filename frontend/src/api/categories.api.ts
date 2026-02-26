import { axiosInstance } from "@/src/shared";

export async function getCategories() {
    const { data } = await axiosInstance.get('categories')
    
    return data
}