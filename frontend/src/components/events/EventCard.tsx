import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  // Yıl-Ay-Gün formatını "12 Ekim 2026" formatına çevirme
  const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [yil, ay, gun] = event.date.split("-");
  const formatliTarih = `${parseInt(gun)} ${aylar[parseInt(ay) - 1]} ${yil}`;

  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <span className="kategori-rozet">{event.category}</span>
      <p>Tarih: {formatliTarih}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      
      <Link to={`/events/${event.id}`} className="detay-link">
        Detayları gör
      </Link>
    </article>
  );
}