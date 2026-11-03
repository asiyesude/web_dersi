import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  categories: Category[];
  selectedCategory: Category | "";
  onCategoryChange: (category: Category | "") => void;
  searchText: string;
  onSearchChange: (text: string) => void;
}

export default function EventFilter({
  categories, selectedCategory, onCategoryChange, searchText, onSearchChange,
}: EventFilterProps) {
  return (
    <div className="filtreler">
      <div className="filtre-grubu">
        <label>Etkinlik ara</label>
        <input
          type="text"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="filtre-grubu">
        <label>Kategori</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}