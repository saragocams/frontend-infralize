import { useState } from "react";

export default function ContractAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState([]);

  function onFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleAnalyze() {
    // simulação (depois conecta com backend)
    setAnalysis([
      {
        type: "Multa abusiva",
        description: "Multa de 30% em caso de atraso",
      },
      {
        type: "Cláusula ambígua",
        description: "Termos vagos sobre prazo",
      },
    ]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>IA Analisadora de Contratos</h1>

      <input type="file" onChange={onFileChange} />
      <button onClick={handleAnalyze}>Analisar</button>

      <h2>Resultados</h2>

      {analysis.map((risk, i) => (
        <div key={i}>
          <strong>{risk.type}</strong>
          <p>{risk.description}</p>
        </div>
      ))}
    </div>
  );
}