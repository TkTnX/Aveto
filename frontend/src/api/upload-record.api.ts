import { axiosInstance } from "@/src/shared";

export async function uploadRecord(formData: FormData) {
    const { data } = await axiosInstance.post('upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    
    return data
} 