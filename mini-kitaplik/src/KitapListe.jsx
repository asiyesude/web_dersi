import React from 'react';
import KitapKarti from './KitapKarti';

function KitapListe({ kitaplar, favoriler, onFavoriDegistir }) {
  return (
    <div className="kitap-liste">
      {kitaplar.map((kitap) => (
        <KitapKarti 
          key={kitap.id} 
          {...kitap} 
          favorideMi={favoriler.includes(kitap.id)}
          onFavoriDegistir={onFavoriDegistir}
        />
      ))}
    </div>
  );
}

export default KitapListe;