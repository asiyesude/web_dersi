import { useNavigate } from "react-router-dom";
import { useEvents, type EventFormData } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate(); // İşlem bitince başka sayfaya yönlendirmek için

  // Adım 10: Ekleme sayfası için tamamen boş bir başlangıç verisi
  const emptyForm: EventFormData = {
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
  };

  return (
    <>
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data); // Context'teki ekleme fonksiyonunu çağır
          navigate("/admin"); // Başarılı olunca Yönetim paneline dön
        }}
      />
    </>
  );
}

export default AddEventPage;