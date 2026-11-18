import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, Category } from "../types/campus-event";

export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  image?: string;
}

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => Promise<void>;
  updateEvent: (id: string, data: EventFormData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>([]);

  // 1. Backend adresi düzeltildi (/events)
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((e: any) => ({ ...e, id: e._id }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  // 2. Ekleme adresi düzeltildi (/events)
  async function addEvent(data: EventFormData) {
    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, capacity: Number(data.capacity) }),
      });
      const newEvent = await res.json();
      setEvents([...events, { ...newEvent, id: newEvent._id }]);
    } catch (err) {
      console.error("Ekleme hatası:", err);
    }
  }

  // 3. Güncelleme adresi düzeltildi (/events)
  async function updateEvent(id: string, data: EventFormData) {
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, capacity: Number(data.capacity) }),
      });
      const updatedEvent = await res.json();
      setEvents(events.map((e) => (e.id === id ? { ...updatedEvent, id: updatedEvent._id } : e)));
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  }

  // 4. Silme adresi düzeltildi (/events)
  async function deleteEvent(id: string) {
    try {
      await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("Provider yok");
  return value;
}