import React from 'react';

function AramaCubugu({ aramaMetni, onArama }) {
  return (
    <input 
      type="text" 
      placeholder="Başlık veya yazar ara..." 
      value={aramaMetni} 
      onChange={(e) => onArama(e.target.value)} 
    />
  );
}

export default AramaCubugu;