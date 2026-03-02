import { getMe } from "@/src/api";
import { IUser } from "@/src/shared/types";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
    const getMeQuery = () => useQuery({
        queryKey: ['get me'],
        queryFn: (): Promise<IUser> => getMe()
    })

    return {getMeQuery}
}