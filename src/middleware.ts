import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin paths
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session');

    // Bypass check if it is the login page
    if (pathname === '/admin/login') {
      // If session exists, redirect straight to dashboard
      if (sessionCookie) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Require token for other dashboard sub-paths
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Target all admin dashboard path endpoints
export const config = {
  matcher: ['/admin/:path*'],
};
