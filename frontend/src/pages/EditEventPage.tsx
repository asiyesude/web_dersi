import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams(); // URL'deki ID'yi alıyoruz
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  // ID'ye sahip etkinliği bul
  const event = events.find((e) => e.id === (id ?? ""));

  // Etkinlik yoksa hata sayfasını göster
  if (!event) return <NotFoundPage />;

  // Adım 10: Güncelleme sayfası için mevcut verileri form formatına çeviriyoruz
  // Not: capacity bizde sayı, formda string olduğu için String() ile çeviriyoruz
  const formData = {
    ...event,
    capacity: String(event.capacity),
  };

  return (
    <>
      <h2 className="bolum-baslik">Etkinliği Güncelle</h2>
      <EventForm
        initialData={formData}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data); // Context'teki güncelleme fonksiyonunu çağır
          navigate("/admin"); // Başarılı olunca Yönetim paneline dön
        }}
      />
    </>
  );
}

export default EditEventPage;