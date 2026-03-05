import axios from "axios";

export async function getAddresses(location: string) {
    	const { data } = await axios.post(
			'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
			{
				query: location
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Token ' + process.env.NEXT_PUBLIC_DADATA_API_KEY,
					'X-Secret': process.env.NEXT_PUBLIC_DADATA_SECRET_KEY
				}
			}
    )
    
    return data
}