import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  // If trying to access admin pages without auth, redirect to login
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If trying to access auth pages while logged in, redirect to admin
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*']
}