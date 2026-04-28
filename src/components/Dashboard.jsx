export default function Dashboard() {
  return (
    <div className="cards">
      
      <div className="card">
        <h4>Score de Risco</h4>
        <span className="risk-high">ALTO RISCO</span>
        <p>78/100</p>
      </div>

      <div className="card">
        <h4>Impacto Financeiro</h4>
        <h2>R$ 1,25M</h2>
      </div>

      <div className="card">
        <h4>Cláusulas Críticas</h4>
        <h2>12</h2>
      </div>

    </div>
  );
}