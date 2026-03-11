import { Metadata } from 'next'

import { ResetPasswordForm } from '@/src/features'

export const metadata: Metadata = {
	robots: {
		index: false
	}
}
const ResetPage = async ({
	searchParams
}: {
	searchParams: Promise<{ email: string; code: string }>
}) => {
	const { code, email } = await searchParams
	return (
		<div className='max-w-150'>
			<ResetPasswordForm code={code} email={email} />
		</div>
	)
}

export default ResetPage
