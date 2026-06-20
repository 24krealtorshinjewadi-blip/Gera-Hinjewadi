import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Incorrect administrator password' },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_signing_key_change_me_in_production';
    const expiryMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const token = await signToken({ role: 'admin' }, jwtSecret, expiryMs);

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully'
    });

    // Set secure httpOnly session cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to process authentication request' },
      { status: 500 }
    );
  }
}
