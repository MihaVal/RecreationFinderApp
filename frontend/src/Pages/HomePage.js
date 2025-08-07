import React from "react";
import EventCard from "../Components/EventCard";

function HomePage() {
  const mockEvents = [
    {
      id: 1,
      sport: "Football",
      location: "Koper",
      date: "2025-08-10",
      time: "18:00",
      skillLevel: "2 - Intermediate",
      ageGroup: "20–30",
    },
    {
      id: 2,
      sport: "Basketball",
      location: "Izola",
      date: "2025-08-11",
      time: "19:30",
      skillLevel: "3 - Competitive",
      ageGroup: "25–35",
    },
    {
      id: 3,
      sport: "Padel",
      location: "Lucija",
      date: "2025-08-12",
      time: "17:00",
      skillLevel: "1 - Casual",
      ageGroup: "18–25",
    },
  ];

  return (
    <div>
      <h2>Upcoming Events</h2>
      {mockEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default HomePage;
