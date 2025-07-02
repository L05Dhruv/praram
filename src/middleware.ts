import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, and public assets
  if (path.startsWith('/api/') || 
      path.startsWith('/_next/') || 
      path.startsWith('/images/') ||
      path.includes('.')) {
    return NextResponse.next();
  }

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
                      path === '/auth/signin' || 
                      path === '/about' ||
                      path === '/blog' ||
                      path.startsWith('/blog/') ||
                      path === '/shop' ||
                      path.startsWith('/shop/') ||
                      path === '/privacy-policy' ||
                      path === '/terms-and-conditions' ||
                      path === '/refund-policy';

  // Get the session token from the cookies (using correct cookie name)
  const sessionToken = request.cookies.get('session')?.value;

  // Redirect unauthenticated users to signin for protected paths
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Redirect authenticated users away from signin page
  if (path === '/auth/signin' && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}; 