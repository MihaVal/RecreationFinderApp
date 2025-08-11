import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.id);

    // Leave event
    const result = await pool.query(
      'DELETE FROM event_attendees WHERE "eventId" = $1 AND "userId" = $2',
      [eventId, decoded.userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not joined to this event' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Left event successfully' });
  } catch (error: any) {
    console.error('Leave event error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}