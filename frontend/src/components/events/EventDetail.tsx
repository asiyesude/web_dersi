import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
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
      
      {/* Eski butonlar yerine Link kullanıyoruz */}
      <Link to="/events" className="buton">&larr; Listeye dön</Link>
      <Link to={`/admin/${event.id}/edit`} className="buton">Bu etkinliği güncelle</Link>
    </article>
  );
}