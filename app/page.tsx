'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  sport: string;
  location: string;
  dateTime: string;
  skillLevel: number;
  ageGroup: string;
  creator_name: string;
  creator_surname: string;
  attendee_count: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Load events
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinEvent = async (eventId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        loadEvents(); // Refresh events
      }
    } catch (error) {
      console.error('Failed to join event:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <h1>Recreation Finder</h1>
          <div>
            {user ? (
              <>
                <span>Hello, {user.name}!</span>
                <Link href="/create" className="btn" style={{ margin: '0 10px' }}>Create Event</Link>
                <button onClick={logout} className="btn">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn" style={{ marginRight: '10px' }}>Login</Link>
                <Link href="/register" className="btn">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container">
        <h2>Upcoming Events</h2>
        
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="card">
                <h3>{event.sport}</h3>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleTimeString()}</p>
                <p><strong>Skill Level:</strong> {event.skillLevel}/5</p>
                <p><strong>Age Group:</strong> {event.ageGroup}</p>
                <p><strong>Organizer:</strong> {event.creator_name} {event.creator_surname}</p>
                <p><strong>Attendees:</strong> {event.attendee_count}</p>
                
                {user && (
                  <button 
                    onClick={() => joinEvent(event.id)}
                    className="btn"
                    style={{ marginTop: '10px' }}
                  >
                    Join Event
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <p>No events found. <Link href="/create" className="btn">Create the first one!</Link></p>
        )}
      </div>
    </div>
  );
}