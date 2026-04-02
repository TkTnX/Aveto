import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')
	if (
		!token &&
		(request.url.includes('/profile') || request.url.includes('/review')) || request.url.includes('/additem')
	) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: ['/profile/:path', '/review', '/additem']
}
