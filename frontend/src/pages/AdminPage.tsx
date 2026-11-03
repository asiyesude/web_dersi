import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  // Silmeden önce kullanıcıdan onay alan fonksiyon
  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  if (events.length === 0) {
    return <p>Henüz etkinlik yok.</p>;
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/admin/new" className="buton">+ Yeni etkinlik</Link>
      </div>
      <table className="tablo">
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td data-baslik="Etkinlik">{event.title}</td>
              <td data-baslik="Tarih">{event.date.split("-").reverse().join(".")}</td>
              <td data-baslik="Kategori">{event.category}</td>
              <td className="islemler">
                <Link to={`/admin/${event.id}/edit`} className="buton">Düzenle</Link>
                <button
                  className="buton buton-sil"
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminPage;