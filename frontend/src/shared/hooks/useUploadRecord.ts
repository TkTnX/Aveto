import { uploadRecord } from "@/src/api";
import { useMutation } from "@tanstack/react-query";

export function useUploadRecord() {
    const uploadRecordMutation = () => useMutation({
        mutationKey: ['upload record'],
        mutationFn: (formData: FormData) => uploadRecord(formData)
    })

    return {uploadRecordMutation}
}