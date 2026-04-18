import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')

	if (!token) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: ['/profile/:path', '/review', '/additem']
}
