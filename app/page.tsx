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
  user_joined: boolean;
  createdById: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    skillLevel: '',
    date: ''
  });

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

  // Filter events when filters change
  useEffect(() => {
    let filtered = events;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(event => 
        event.sport.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sport filter
    if (filters.sport) {
      filtered = filtered.filter(event => event.sport === filters.sport);
    }

    // Skill level filter
    if (filters.skillLevel) {
      filtered = filtered.filter(event => event.skillLevel === parseInt(filters.skillLevel));
    }

    // Date filter
    if (filters.date) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.dateTime).toDateString();
        const filterDate = new Date(filters.date).toDateString();
        return eventDate === filterDate;
      });
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const loadEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/events', { headers });
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
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
      } else {
        const error = await res.json();
        console.error('Failed to join event:', error.error);
      }
    } catch (error) {
      console.error('Failed to join event:', error);
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
        loadEvents(); // Refresh events
      } else {
        const error = await res.json();
        console.error('Failed to leave event:', error.error);
      }
    } catch (error) {
      console.error('Failed to leave event:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      sport: '',
      skillLevel: '',
      date: ''
    });
  };

  // Get unique sports for filter dropdown
  const uniqueSports = [...new Set(events.map(event => event.sport))].sort();

  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <h1>Recreation Finder</h1>
          <div>
            {user ? (
              <>
                <span>Hello, {user.name}!</span>
                <Link href="/profile" className="btn" style={{ margin: '0 10px' }}>My Profile</Link>
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
        
        {/* Filters */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Filters & Search</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Search (sport or location)</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Basketball, Central Park..."
              />
            </div>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label>Sport</label>
              <select name="sport" value={filters.sport} onChange={handleFilterChange}>
                <option value="">All Sports</option>
                {uniqueSports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label>Skill Level</label>
              <select name="skillLevel" value={filters.skillLevel} onChange={handleFilterChange}>
                <option value="">All Levels</option>
                <option value="1">1 - Beginner</option>
                <option value="2">2 - Novice</option>
                <option value="3">3 - Intermediate</option>
                <option value="4">4 - Advanced</option>
                <option value="5">5 - Expert</option>
              </select>
            </div>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <button onClick={clearFilters} className="btn" style={{ background: '#6c757d' }}>
              Clear Filters
            </button>
            <span style={{ marginLeft: '15px', color: '#666' }}>
              Showing {filteredEvents.length} of {events.length} events
            </span>
          </div>
        </div>
        
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="card">
                <h3>{event.sport}</h3>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleTimeString()}</p>
                <p><strong>Skill Level:</strong> {event.skillLevel}/5</p>
                <p><strong>Age Group:</strong> {event.ageGroup}</p>
                <p><strong>Organizer:</strong> {event.creator_name} {event.creator_surname}</p>
                <p><strong>Attendees:</strong> {event.attendee_count}</p>
                
                {user && user.id !== event.createdById && (
                  event.user_joined ? (
                    <button 
                      onClick={() => leaveEvent(event.id)}
                      className="btn"
                      style={{ marginTop: '10px', background: '#dc3545' }}
                    >
                      Leave Event
                    </button>
                  ) : (
                    <button 
                      onClick={() => joinEvent(event.id)}
                      className="btn"
                      style={{ marginTop: '10px' }}
                    >
                      Join Event
                    </button>
                  )
                )}
                
                {user && user.id === event.createdById && (
                  <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#666' }}>
                    Your event
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <p>No events found. <Link href="/create" className="btn">Create the first one!</Link></p>
        )}
        
        {!loading && events.length > 0 && filteredEvents.length === 0 && (
          <p>No events match your filters. <button onClick={clearFilters} className="btn">Clear filters</button></p>
        )}
      </div>
    </div>
  );
}