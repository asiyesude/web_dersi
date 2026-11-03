import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents(); // Veriyi artık Context'ten çekiyoruz

  // Sadece yaklaşan ilk 2 etkinliği ana sayfada gösteriyoruz
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <Link className="buton" to="/events">Tüm Etkinlikleri Gör</Link>
    </>
  );
}

export default HomePage;