import { useParams } from "react-router-dom";
import { events } from "../data/events"; // Etkinlik verilerini alıyoruz
import EventDetail from "../components/events/EventDetail"; // Kartın içini çizecek bileşen
import NotFoundPage from "./NotFoundPage"; // Bulunamazsa çıkacak sayfa

function EventDetailPage() {
  // 1. Adresteki id'yi useParams ile okuyoruz
  const { id } = useParams();

  // 2. id ile eşleşen etkinliği verilerimiz arasında arıyoruz
  // id ?? "" yazmamızın sebebi: id tanımsız (undefined) gelirse hata vermesin, boş metin saysın
  const event = events.find((e) => e.id === (id ?? ""));

  // 3. Etkinlik bulunamazsa Hata sayfasını göster
  if (!event) return <NotFoundPage />;

  // 4. Bulunursa Başlık ve Detay bileşenini çiz
  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;