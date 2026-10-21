import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (cat: Category | "") => void;
}

export default function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div>
      <input
        type="search"
        placeholder="Etkinlik ara..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}