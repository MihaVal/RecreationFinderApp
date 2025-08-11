import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

// Get all events
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    let userId = null;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        userId = decoded.userId;
      } catch {
        // Invalid token, continue without user context
      }
    }

    const result = await pool.query(`
      SELECT 
        e.*,
        u.name as creator_name,
        u.surname as creator_surname,
        COUNT(ea.id) as attendee_count,
        ${userId ? `BOOL_OR(ea."userId" = ${userId}) as user_joined` : 'false as user_joined'}
      FROM events e
      JOIN users u ON e."createdById" = u.id
      LEFT JOIN event_attendees ea ON e.id = ea."eventId"
      GROUP BY e.id, u.name, u.surname
      ORDER BY e."dateTime" ASC
    `);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create event
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const { sport, location, dateTime, skillLevel, ageGroup } = await request.json();

    const result = await pool.query(
      'INSERT INTO events (sport, location, "dateTime", "skillLevel", "ageGroup", "createdById") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [sport, location, dateTime, skillLevel, ageGroup, decoded.userId]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}