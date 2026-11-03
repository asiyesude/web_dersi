import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents(); 
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Dinamik olarak kategorileri belirliyoruz
  const categories = [...new Set(events.map((e) => e.category))] as Category[];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <EventFilter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        searchText={searchText}
        onSearchChange={setSearchText}
      />
      <p className="sonuc-metni">{filtered.length} etkinlik listeleniyor.</p>
      <EventList events={filtered} />
    </>
  );
}

export default EventsPage;