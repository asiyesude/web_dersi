import React from 'react';

function KitapKarti({ baslik, yazar, kategori, id, favorideMi, onFavoriDegistir }) {
  return (
    <div className="kitap-karti">
      <h3>{baslik}</h3>
      <p>{yazar} - {kategori}</p>
      <button 
        className={favorideMi ? "favori-aktif" : ""} 
        onClick={() => onFavoriDegistir(id)}
      >
        {favorideMi ? "★ Favoride" : "☆ Favori Ekle"}
      </button>
    </div>
  );
}

export default KitapKarti;