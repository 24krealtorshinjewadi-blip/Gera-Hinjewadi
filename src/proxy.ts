import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Exclude the admin login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Exclude public API endpoints
  // Specifically: public can POST a new lead to /api/leads
  if (pathname === '/api/leads' && method === 'POST') {
    return NextResponse.next();
  }

  // 3. Define paths to protect
  const isCrmPage = pathname.startsWith('/admin');
  const isCrmApi = pathname.startsWith('/api/leads') || pathname.startsWith('/api/agents');

  if (isCrmPage || isCrmApi) {
    const sessionCookie = request.cookies.get('admin_session');
    const token = sessionCookie?.value;

    const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_signing_key_change_me_in_production';
    const payload = token ? await verifyToken(token, jwtSecret) : null;

    if (!payload || payload.role !== 'admin') {
      if (isCrmApi) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized: Authentication session required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        // Redirect page requests to login screen
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ['/admin/:path*', '/api/leads/:path*', '/api/agents/:path*'],
};
