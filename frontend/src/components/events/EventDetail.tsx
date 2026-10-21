import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article>
      <h2>{event.title}</h2>
      {event.image && <img src={event.image} alt="afiş" />}
      <div>
        <p><strong>Tarih:</strong> {event.date.split("-")[2]} Ekim {event.date.split("-")[0]}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>
      <p>{event.description}</p>
      <button onClick={onBack}>&larr; Listeye dön</button>
      <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
    </article>
  );
}