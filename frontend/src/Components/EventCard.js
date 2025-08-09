import React from "react";
import { useApp } from "../Context/AppContext";

export default function EventCard({ event }) {
  const { user, joinEvent, leaveEvent } = useApp();
  const joined = user && event.attendees.includes(user.email);

  const handleJoin = () => user && joinEvent(event.id, user.email);
  const handleLeave = () => user && leaveEvent(event.id, user.email);

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <h3>
        {event.sport} @ {event.location}
      </h3>
      <p>
        <b>Date:</b> {event.date} <b>Time:</b> {event.time}
      </p>
      <p>
        <b>Skill:</b> {event.skillLevel} <b>Age:</b> {event.ageGroup}
      </p>
      <p>
        <b>Created by:</b> {event.createdBy}
      </p>
      <p>
        <b>Attendees:</b> {event.attendees.length}
      </p>
      {user ? (
        joined ? (
          <button onClick={handleLeave}>Leave</button>
        ) : (
          <button onClick={handleJoin}>Join</button>
        )
      ) : (
        <small>Login to join</small>
      )}
    </div>
  );
}
