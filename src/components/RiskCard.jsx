import React from 'react';

export default function RiskCard({ title, risk, description }) {
  return (
    <div className="risk-card">
      <h3>{title || 'Risco'}</h3>
      <div className="risk-level">{risk || 'Médio'}</div>
      <p>{description || 'Descrição do risco'}</p>
    </div>
  );
}
