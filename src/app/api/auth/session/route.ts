import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    // Verify JWT token
    const decoded = verify(sessionCookie.value, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    return NextResponse.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    });

  } catch (error) {
    console.error('Session validation error:', error);
    
    // Clear invalid cookie
    const response = NextResponse.json({ user: null });
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;
  }
} 