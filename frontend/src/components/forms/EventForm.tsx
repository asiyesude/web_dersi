import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  categories: Category[];
  title: string; 
}

export default function EventForm({ onSubmit, categories, title }: EventFormProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label>Etkinlik Adı</label>
          <input type="text" maxLength={80} />
        </div>
        <div>
          <label>Kategori</label>
          <select>
            <option value="">Seçiniz</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
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
  );
}