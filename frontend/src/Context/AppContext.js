import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const LS_EVENTS_KEY = "rf_events";
const LS_USER_KEY = "rf_user";

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(LS_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(LS_EVENTS_KEY);
    if (saved) return JSON.parse(saved);
    // seed a few demo events the first time
    return [
      {
        id: 1,
        sport: "Football",
        location: "Koper",
        date: "2025-08-10",
        time: "18:00",
        skillLevel: 2,
        ageGroup: "20–30",
        createdBy: "demo@rf.app",
        attendees: [],
      },
      {
        id: 2,
        sport: "Basketball",
        location: "Izola",
        date: "2025-08-11",
        time: "19:30",
        skillLevel: 3,
        ageGroup: "25–35",
        createdBy: "demo@rf.app",
        attendees: [],
      },
      {
        id: 3,
        sport: "Padel",
        location: "Lucija",
        date: "2025-08-12",
        time: "17:00",
        skillLevel: 1,
        ageGroup: "18–25",
        createdBy: "demo@rf.app",
        attendees: [],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(LS_EVENTS_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (user) localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_USER_KEY);
  }, [user]);

  const createEvent = (evt) => {
    const id = events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    setEvents((prev) => [...prev, { ...evt, id, attendees: [] }]);
  };

  const joinEvent = (eventId, email) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              attendees: e.attendees.includes(email)
                ? e.attendees
                : [...e.attendees, email],
            }
          : e
      )
    );
  };

  const leaveEvent = (eventId, email) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, attendees: e.attendees.filter((a) => a !== email) }
          : e
      )
    );
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      events,
      setEvents,
      createEvent,
      joinEvent,
      leaveEvent,
    }),
    [user, events]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
