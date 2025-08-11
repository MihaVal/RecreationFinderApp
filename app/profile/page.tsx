'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
  id: number;
  sport: string;
  location: string;
  dateTime: string;
  skillLevel: number;
  ageGroup: string;
  creator_name?: string;
  creator_surname?: string;
  attendee_count: number;
}

interface UserEvents {
  created: Event[];
  joined: Event[];
}

export default function Profile() {
  const [userEvents, setUserEvents] = useState<UserEvents>({ created: [], joined: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    loadUserEvents();
  }, [router]);

  const loadUserEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/user/events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setUserEvents(data);
      } else {
        console.error('Failed to load user events');
      }
    } catch (error) {
      console.error('Failed to load user events:', error);
    } finally {
      setLoading(false);
    }
  };

  const leaveEvent = async (eventId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`/api/events/${eventId}/leave`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        loadUserEvents(); // Refresh events
      }
    } catch (error) {
      console.error('Failed to leave event:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="logo">Recreation Finder</Link>
          <div>
            <span>Hello, {user.name}!</span>
            <Link href="/create" className="btn" style={{ margin: '0 10px' }}>Create Event</Link>
            <Link href="/" className="btn">Back to Events</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>My Profile</h1>
        
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {user.name} {user.surname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        </div>

        {loading ? (
          <p>Loading your events...</p>
        ) : (
          <>
            {/* Created Events */}
            <div style={{ marginBottom: '40px' }}>
              <h2>Events I Created ({userEvents.created.length})</h2>
              {userEvents.created.length > 0 ? (
                <div className="events-grid">
                  {userEvents.created.map(event => (
                    <div key={event.id} className="card">
                      <h3>{event.sport}</h3>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleTimeString()}</p>
                      <p><strong>Skill Level:</strong> {event.skillLevel}/5</p>
                      <p><strong>Age Group:</strong> {event.ageGroup}</p>
                      <p><strong>Attendees:</strong> {event.attendee_count}</p>
                      
                      <div style={{ marginTop: '10px' }}>
                        <span className="status-badge creator">
                          Your Event
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You haven't created any events yet. <Link href="/create" className="btn">Create your first event!</Link></p>
              )}
            </div>

            {/* Joined Events */}
            <div>
              <h2>Events I Joined ({userEvents.joined.length})</h2>
              {userEvents.joined.length > 0 ? (
                <div className="events-grid">
                  {userEvents.joined.map(event => (
                    <div key={event.id} className="card">
                      <h3>{event.sport}</h3>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleTimeString()}</p>
                      <p><strong>Skill Level:</strong> {event.skillLevel}/5</p>
                      <p><strong>Age Group:</strong> {event.ageGroup}</p>
                      <p><strong>Organizer:</strong> {event.creator_name} {event.creator_surname}</p>
                      <p><strong>Attendees:</strong> {event.attendee_count}</p>
                      
                      <button 
                        onClick={() => leaveEvent(event.id)}
                        className="btn"
                        style={{ marginTop: '10px', background: '#dc3545' }}
                      >
                        Leave Event
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You haven't joined any events yet. <Link href="/" className="btn">Browse events to join!</Link></p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}