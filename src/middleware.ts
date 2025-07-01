import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
                      path === '/auth/signin' || 
                      path === '/about' ||
                      path === '/blog' ||
                      path.startsWith('/blog/') ||
                      path === '/shop' ||
                      path.startsWith('/shop/') ||
                      path.startsWith('/images/');

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // Redirect unauthenticated users to signin
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Redirect authenticated users away from signin page
  if (path === '/auth/signin' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 