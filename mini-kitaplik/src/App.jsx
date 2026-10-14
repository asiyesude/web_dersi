import React, { useState, useEffect } from 'react';
import AramaCubugu from './AramaCubugu';
import KategoriFiltre from './KategoriFiltre';
import KitapListe from './KitapListe';
import FavoriPaneli from './FavoriPaneli';
import './App.css';

// Hocanın PDF görselindeki kitap listesi
const SABIT_KITAPLAR = [
  { id: 1, baslik: "React'e Giriş", yazar: "D. Usta", kategori: "Web" },
  { id: 2, baslik: "İleri JavaScript", yazar: "S. Kılıç", kategori: "Web" },
  { id: 3, baslik: "Veri Yapıları", yazar: "A. Demir", kategori: "CS" },
  { id: 4, baslik: "Algoritmalar", yazar: "E. Kaya", kategori: "CS" },
  { id: 5, baslik: "UI/UX Temelleri", yazar: "N. Akın", kategori: "Tasarım" }
];

function App() {
  // 1. Durumlar (States) ve localStorage'dan okuma işlemleri
  const [aramaMetni, setAramaMetni] = useState(localStorage.getItem("aramaMetni") || "");
  const [kategori, setKategori] = useState("Tümü");
  
  const [favoriler, setFavoriler] = useState(() => {
    const kayitli = localStorage.getItem("favoriler");
    return kayitli ? JSON.parse(kayitli) : [];
  });

  // 2. Yan Etkiler (Side-Effects): Değişiklik olduğunda localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem("aramaMetni", aramaMetni);
  }, [aramaMetni]);

  useEffect(() => {
    localStorage.setItem("favoriler", JSON.stringify(favoriler));
  }, [favoriler]);

  // 3. Favori Ekleme/Çıkarma Fonksiyonu
  const handleFavoriDegistir = (id) => {
    if (favoriler.includes(id)) {
      setFavoriler(favoriler.filter(favId => favId !== id)); // Çıkar
    } else {
      setFavoriler([...favoriler, id]); // Ekle
    }
  };

  // 4. Arama ve Kategoriye Göre Filtreleme İşlemi
  const filtrelenmisKitaplar = SABIT_KITAPLAR.filter((kitap) => {
    const aramaUyumu = kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) || 
                       kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());
    const kategoriUyumu = kategori === "Tümü" || kitap.kategori === kategori;
    return aramaUyumu && kategoriUyumu;
  });

  return (
    <div className="container">
      <h1 className="baslik">Mini Kitaplık</h1>
      
      <div className="layout">
        {/* Sol Taraf: Filtreler ve Kitap Listesi */}
        <div className="sol-panel">
          <div className="filtre-alani">
            <AramaCubugu aramaMetni={aramaMetni} onArama={setAramaMetni} />
            <KategoriFiltre kategori={kategori} onKategoriDegis={setKategori} />
          </div>
          <KitapListe 
            kitaplar={filtrelenmisKitaplar} 
            favoriler={favoriler} 
            onFavoriDegistir={handleFavoriDegistir} 
          />
        </div>
        
        {/* Sağ Taraf: Favoriler Paneli */}
        <div className="sag-panel">
          <FavoriPaneli 
            kitaplar={SABIT_KITAPLAR} 
            favoriler={favoriler} 
            onFavoriCikar={handleFavoriDegistir} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;