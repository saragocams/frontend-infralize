import React, { useState } from 'react';

export default function DiagnosisPanel() {
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // TODO: Implementar análise
      setDiagnosis('Análise completa');
    } catch (error) {
      console.error('Erro ao analisar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-panel">
      <h2>Diagnóstico</h2>
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analisando...' : 'Analisar'}
      </button>
      {diagnosis && <div className="results">{diagnosis}</div>}
    </div>
  );
}
