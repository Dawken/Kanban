import { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('AuthToken')?.value

    if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
        return Response.redirect(new URL('/', request.url))
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
