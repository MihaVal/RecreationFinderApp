import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    // Get events created by user
    const createdEvents = await pool.query(`
      SELECT 
        e.*,
        COUNT(ea.id) as attendee_count
      FROM events e
      LEFT JOIN event_attendees ea ON e.id = ea."eventId"
      WHERE e."createdById" = $1
      GROUP BY e.id
      ORDER BY e."dateTime" ASC
    `, [decoded.userId]);

    // Get events joined by user  
    const joinedEvents = await pool.query(`
      SELECT 
        e.*,
        u.name as creator_name,
        u.surname as creator_surname,
        COUNT(ea.id) as attendee_count
      FROM events e
      JOIN users u ON e."createdById" = u.id
      JOIN event_attendees ea_user ON e.id = ea_user."eventId" AND ea_user."userId" = $1
      LEFT JOIN event_attendees ea ON e.id = ea."eventId"
      WHERE e."createdById" != $1
      GROUP BY e.id, u.name, u.surname
      ORDER BY e."dateTime" ASC
    `, [decoded.userId]);

    return NextResponse.json({
      created: createdEvents.rows,
      joined: joinedEvents.rows
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}