import React from 'react';

function KategoriFiltre({ kategori, onKategoriDegis }) {
  return (
    <select value={kategori} onChange={(e) => onKategoriDegis(e.target.value)}>
      <option value="Tümü">Tümü</option>
      <option value="Web">Web</option>
      <option value="CS">CS</option>
      <option value="Tasarım">Tasarım</option>
    </select>
  );
}

export default KategoriFiltre;