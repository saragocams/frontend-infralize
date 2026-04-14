import React, { useState } from 'react';

export default function UploadBox() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Arquivo selecionado:', file.name);
      // TODO: Implementar upload
    }
  };

  return (
    <div className="upload-box">
      <h2>Carregar Arquivo</h2>
      <input 
        type="file" 
        onChange={handleFileChange}
        accept=".pdf,.xlsx,.csv"
      />
      {file && <p>Arquivo selecionado: {file.name}</p>}
      <button onClick={handleUpload}>Enviar</button>
    </div>
  );
}
