import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const AuthToken = request.cookies.get('AuthToken')?.value

    const RefreshToken = request.cookies.get('RefreshToken')?.value

    if (!AuthToken && !RefreshToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/boards/:path*', '/'],
}
