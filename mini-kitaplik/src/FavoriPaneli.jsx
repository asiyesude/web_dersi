import React from 'react';

function FavoriPaneli({ kitaplar, favoriler, onFavoriCikar }) {
  const favoriKitaplar = kitaplar.filter(kitap => favoriler.includes(kitap.id));

  return (
    <div className="favori-paneli">
      <h3>Favoriler ({favoriler.length})</h3>
      <ul>
        {favoriKitaplar.map((kitap) => (
          <li key={kitap.id}>
            • {kitap.baslik}
            <button onClick={() => onFavoriCikar(kitap.id)}>Kaldır</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriPaneli;