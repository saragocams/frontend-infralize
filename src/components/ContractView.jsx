export default function ContractView() {
  return (
    <div className="content">

      <div className="pdf">
        <h3>Contrato.pdf</h3>
        <p>[Aqui vai o PDF depois]</p>

        <p style={{ background: "#fff3cd", padding: 10 }}>
          Os custos com materiais extras não previstos...
        </p>
      </div>

      <div className="analysis">
        <h3>Diagnóstico</h3>

        <p><strong>Tipo:</strong> Risco de custo crítico</p>

        <div style={{ background: "#fde2e2", padding: 10 }}>
          <strong>Problema:</strong>
          <p>Aditivos sem teto financeiro</p>
        </div>

        <div style={{ background: "#fff3cd", padding: 10, marginTop: 10 }}>
          <strong>Impacto:</strong>
          <p>R$ 780K</p>
        </div>

        <div style={{ background: "#e0edff", padding: 10, marginTop: 10 }}>
          <strong>Recomendação:</strong>
          <p>Adicionar limite de reajuste</p>
        </div>
      </div>

    </div>
  );
}