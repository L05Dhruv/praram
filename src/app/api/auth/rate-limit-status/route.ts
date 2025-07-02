import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rateLimiter';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const sessionCookie = request.cookies.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verify(sessionCookie.value, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all blocked IPs
    const blockedIPs = rateLimiter.getAllBlocked();
    
    return NextResponse.json({
      blockedIPs: blockedIPs.map(({ ip, record }) => ({
        ip,
        attempts: record.count,
        firstAttempt: new Date(record.firstAttempt).toISOString(),
        lastAttempt: new Date(record.lastAttempt).toISOString(),
      }))
    });

  } catch (error) {
    console.error('Rate limit status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 