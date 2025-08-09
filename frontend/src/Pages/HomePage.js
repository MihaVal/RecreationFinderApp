import React, { useMemo, useState } from "react";
import { useApp } from "../Context/AppContext";
import EventCard from "../Components/EventCard";

export default function HomePage() {
  const { events } = useApp();
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");

  const filtered = useMemo(() => {
    return events.filter(
      (e) =>
        (sport ? e.sport.toLowerCase().includes(sport.toLowerCase()) : true) &&
        (location
          ? e.location.toLowerCase().includes(location.toLowerCase())
          : true) &&
        (skill ? String(e.skillLevel) === String(skill) : true)
    );
  }, [events, sport, location, skill]);

  return (
    <div>
      <h2>Upcoming Events</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
          <option value="">Skill (any)</option>
          <option value="1">1 - Casual</option>
          <option value="2">2 - Intermediate</option>
          <option value="3">3 - Competitive</option>
        </select>
        <button
          onClick={() => {
            setSport("");
            setLocation("");
            setSkill("");
          }}
        >
          Clear
        </button>
      </div>

      {filtered.length === 0 && <p>No events found.</p>}
      {filtered.map((evt) => (
        <EventCard key={evt.id} event={evt} />
      ))}
    </div>
  );
}
