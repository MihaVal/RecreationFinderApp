import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const eventId = parseInt(params.id);

    // Check if already joined
    const existing = await pool.query(
      'SELECT id FROM event_attendees WHERE "eventId" = $1 AND "userId" = $2',
      [eventId, decoded.userId]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Already joined this event' }, { status: 400 });
    }

    // Join event
    await pool.query(
      'INSERT INTO event_attendees ("eventId", "userId") VALUES ($1, $2)',
      [eventId, decoded.userId]
    );

    return NextResponse.json({ message: 'Joined event successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}