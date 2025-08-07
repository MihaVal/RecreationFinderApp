import React from "react";

function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#1e1e1e",
        color: "#fff",
      }}
    >
      <h3>
        {event.sport} @ {event.location}
      </h3>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>
        <strong>Skill Level:</strong> {event.skillLevel}
      </p>
      <p>
        <strong>Age Group:</strong> {event.ageGroup}
      </p>
    </div>
  );
}

export default EventCard;
