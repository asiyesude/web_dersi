import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const uniqueCategories = [...new Set(events.map(e => e.category))] as Category[];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // HOCANIN İSTEDİĞİ DİNAMİK BAŞLIK KONTROLÜ
  const headerTitle = (page === "detail" && selected) ? selected.title : "Kampüs Etkinlikleri";

  return (
    <>
      <Header title={headerTitle} />
      <Navigation current={page} onNavigate={go} />
      
      <br />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <br />
            <button onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={uniqueCategories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p>
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} />
          </section>
        )}

        {page === "detail" && !selected && (
          <div>
            <p>"{selectedId}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
            <button onClick={() => go("events")}>Listeye dön</button>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail 
            event={selected} 
            onBack={() => go("events")} 
            onEdit={(id) => go("update", id)} 
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm 
            title={page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            categories={uniqueCategories}
            onSubmit={() => window.scrollTo(0, 0)} 
          />
        )}
      </main>

      <br />
      
      <Footer />
    </>
  );
}

export default App;