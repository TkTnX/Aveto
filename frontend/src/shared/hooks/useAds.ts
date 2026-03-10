import { useMutation, useQuery } from '@tanstack/react-query';



import { addAdToFav, createAd, getAds } from '@/src/api';
import { IAd } from '@/src/shared/types';










export function useAds() {
	const getAllQuery = (query?: Record<string, unknown>) =>
		useQuery({
			queryKey: ['ads'],
			queryFn: (): Promise<IAd[]> => getAds(query)
		})

	const createMutation = () =>
		useMutation({
			mutationKey: ['create ad'],
			mutationFn: (formData: FormData): Promise<IAd> => createAd(formData)
		})

	const addAdToFavMutation = () =>
		useMutation({
			mutationKey: ['add to fav'],
			mutationFn: (id: string) => addAdToFav(id)
		})

	return { getAllQuery, createMutation, addAdToFavMutation }
}
