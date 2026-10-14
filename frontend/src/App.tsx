import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { CampusEvent, Category } from "./types/campus-event";

type PageName = "home" | "events" | "add" | "update" | "detail";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0); 
  }

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "detail" && selectedId) {
      const ev = findEventById(events, selectedId);
      if (ev) title = `Kampüs Etkinlikleri | ${ev.title}`;
    }
    document.title = title;
  }, [page, selectedId]);

  function renderCard(event: CampusEvent) {
    const [yil, , gun] = event.date.split("-");
    const formatliTarih = `${gun} Ekim ${yil}, ${event.time}`;

    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p>{event.category}</p>
        <p><strong>Tarih:</strong> {formatliTarih}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p>{event.description}</p>
        <button onClick={(e) => { e.preventDefault(); go("detail", event.id); }}>
          Detayları gör
        </button>
      </article>
    );
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const uniqueCategories = [...new Set(events.map(e => e.category))];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <h1>Kampüs Etkinlikleri</h1>
      
      <nav>
        <a href="#" aria-current={page === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a>
        <a href="#" aria-current={page === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a>
        <a href="#" aria-current={page === "add" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a>
      </nav>

      <br />

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="kart-izgarasi">
              {upcoming.map(renderCard)}
            </div>
            <br />
            <button onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <div>
              <input 
                type="search" 
                placeholder="Etkinlik ara..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} 
              />
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <p>
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <div className="kart-izgarasi">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && !selected && (
          <div>
            <p>"{selectedId}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
            <button onClick={() => go("events")}>Listeye dön</button>
          </div>
        )}
        
        {page === "detail" && selected && (
          <article>
            <h2>{selected.title}</h2>
            {selected.image && <img src={selected.image} alt="afiş" />}
            <div>
              <p><strong>Tarih:</strong> {selected.date.split("-")[2]} Ekim {selected.date.split("-")[0]}, {selected.time}</p>
              <p><strong>Yer:</strong> {selected.location}</p>
              <p><strong>Kategori:</strong> {selected.category}</p>
              <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
            </div>
            <p>{selected.description}</p>
            <button onClick={() => go("events")}>&larr; Listeye dön</button>
            <button onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
          </article>
        )}

        {/* EKLE / GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Etkinlik Adı</label>
                <input type="text" maxLength={80} />
              </div>
              <div>
                <label>Kategori</label>
                <select>
                  <option value="">Seçiniz</option>
                  {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Tarih</label>
                <input type="date" />
              </div>
              <div>
                <label>Saat</label>
                <input type="time" />
              </div>
              <div>
                <label>Yer</label>
                <input type="text" />
              </div>
              <div>
                <label>Kontenjan</label>
                <input type="number" />
              </div>
              <div>
                <label>Açıklama</label>
                <textarea rows={5}></textarea>
              </div>
              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <br />

      <footer>
        <p>Asiye Sude Ceylan · 2026</p>
      </footer>
    </>
  );
}

export default App;