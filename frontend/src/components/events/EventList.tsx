import EventCard from "./EventCard";
import type { CampusEvent } from "../../types/campus-event";

interface EventListProps {
  events: CampusEvent[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="kart-izgarasi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}