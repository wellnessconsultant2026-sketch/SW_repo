import { NextResponse } from 'next/server';
import { verifyPassword, createJwt } from '@/lib/serverAuth';

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
    }

    if (verifyPassword(password)) {
      const token = createJwt();
      const response = NextResponse.json({
        success: true,
        authenticated: true,
        user: 'Dr. Mayank Admin'
      });

      // Set HTTP-only cookie for secure persistence
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
