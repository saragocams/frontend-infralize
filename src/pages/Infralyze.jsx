import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Visão Geral" },
  { icon: "☰", label: "Contratos", badge: 12, active: true },
  { icon: "📋", label: "Relatórios de Obra" },
  { icon: "⚙", label: "Configurações" },
];

const CLAUSES = [
  {
    id: "4.2",
    title: "Responsabilidade de materiais",
    risk: "Risco de Custo · Crítico",
    riskColor: "#dc2626",
    riskBg: "#fef2f2",
    level: "Crítico",
    levelColor: "#dc2626",
    levelBg: "#fef2f2",
    excerpt:
      "Os custos com materiais extras não previstos na planilha orçamentária inicial, bem como os acréscimos decorrentes de variação de preço dos insumos, serão de responsabilidade exclusiva da contratante, sem limitação de valor.",
    diagnosis:
      "A cláusula transfere variações de custo integralmente para a contratante e não estabelece teto financeiro.",
  },
  {
    id: "4.3",
    title: "Aditivos contratuais",
    risk: "Risco Jurídico · Alto",
    riskColor: "#d97706",
    riskBg: "#fffbeb",
    level: "Alto",
    levelColor: "#d97706",
    levelBg: "#fffbeb",
    excerpt:
      "Os aditivos deverão ser formalizados com antecedência mínima de 5 dias úteis, mediante notificação escrita.",
    diagnosis:
      "Prazo curto para aditivos pode gerar conflito operacional em obras com alteração frequente de escopo.",
  },
  {
    id: "7.1",
    title: "Multas e penalidades",
    risk: "Risco de Prazo · Médio",
    riskColor: "#2563eb",
    riskBg: "#eff6ff",
    level: "Médio",
    levelColor: "#2563eb",
    levelBg: "#eff6ff",
    excerpt:
      "Em caso de atraso, aplicar-se-á multa diária sobre o valor total do contrato até a regularização da entrega.",
    diagnosis:
      "Sugere revisão do cálculo da multa e inclusão de limite máximo de penalidade.",
  },
];

function Sidebar() {
  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #e5e7eb", display: "flex",
      flexDirection: "column", padding: "24px 16px", gap: 0,
      fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: "#1d4ed8",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 16,
        }}>⚖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1d4ed8", letterSpacing: "-0.3px" }}>Infralyze</div>
        </div>
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9ca3af", marginBottom: 8, textTransform: "uppercase" }}>Menu</div>

      {NAV.map((item) => (
        <div key={item.label} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 12px", borderRadius: 8, marginBottom: 2,
          background: item.active ? "#eff6ff" : "transparent",
          color: item.active ? "#1d4ed8" : "#6b7280",
          fontWeight: item.active ? 600 : 400, fontSize: 13.5,
          cursor: "pointer", transition: "background .15s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </div>
          {item.badge && (
            <span style={{
              background: "#ef4444", color: "#fff", fontSize: 10,
              fontWeight: 700, borderRadius: 999, padding: "1px 7px",
            }}>{item.badge}</span>
          )}
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: 10, background: "#f9fafb",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", background: "#1d4ed8",
          color: "#fff", fontSize: 12, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>MB</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Marcelo Braga</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Eng. Contratante</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 28px", borderBottom: "1px solid #e5e7eb",
      background: "#fff", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280" }}>
        <span>📄</span>
        <span>Contratos</span>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ color: "#111827", fontWeight: 500 }}>Torre Sul</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: 999, padding: "4px 12px",
          fontSize: 12, color: "#16a34a", fontWeight: 500,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Concluído em 1m 12s
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "#1d4ed8", color: "#fff", border: "none",
          borderRadius: 8, padding: "8px 16px", fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>
          ↓ Exportar
        </button>
      </div>
    </div>
  );
}

function ScoreCard() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      padding: "20px 24px", flex: 1,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 14 }}>Score de Risco</div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: "#ef4444", color: "#fff", borderRadius: 8,
        padding: "6px 14px", fontWeight: 700, fontSize: 13, marginBottom: 16,
      }}>
        ⚠ Alto Risco
      </div>
      <div style={{ position: "relative", height: 8, borderRadius: 999, overflow: "hidden", marginBottom: 8,
        background: "linear-gradient(to right, #22c55e, #facc15, #f97316, #ef4444)" }}>
        <div style={{
          position: "absolute", left: "78%", top: "50%", transform: "translate(-50%, -50%)",
          width: 14, height: 14, borderRadius: "50%", background: "#fff",
          border: "2px solid #374151", boxShadow: "0 1px 4px rgba(0,0,0,.25)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
        <span>78/100</span>
        <span style={{ color: "#1d4ed8", fontWeight: 600 }}>Percentil 94°</span>
      </div>
    </div>
  );
}

function FinanceCard() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      padding: "20px 24px", flex: 1,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>Impacto Financeiro Est.</div>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px", color: "#111827", marginBottom: 2 }}>R$ 1,25M</div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>Exposição máxima</div>
      <div style={{ display: "flex", gap: 12 }}>
        {[{ label: "Custo", value: "R$780K", color: "#111827" }, { label: "Jurídico", value: "R$470K", color: "#ef4444" }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClausesCard() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      padding: "20px 24px", flex: 1,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>Cláusulas Críticas</div>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px", color: "#111827", marginBottom: 2 }}>12</div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>Problemas encontrados</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: "4 Custo", bg: "#fef2f2", color: "#b91c1c" },
          { label: "5 Jurídico", bg: "#fffbeb", color: "#b45309" },
          { label: "3 Inconsist.", bg: "#eff6ff", color: "#1d4ed8" },
        ].map(b => (
          <span key={b.label} style={{
            background: b.bg, color: b.color, fontSize: 11, fontWeight: 600,
            borderRadius: 999, padding: "3px 10px",
          }}>{b.label}</span>
        ))}
      </div>
    </div>
  );
}

function DocumentPanel({ activeClause, onSelect }) {
  const clause = CLAUSES.find(c => c.id === activeClause) || CLAUSES[0];
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      padding: "20px 24px", flex: "1 1 0",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid #f3f4f6",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 13 }}>📄</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Empreitada_Torre_Sul.pdf</span>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Cláusula {clause.id} · Pág. 11 / 47</div>
        </div>
        <span style={{
          background: "#fef2f2", color: "#ef4444", fontSize: 11,
          fontWeight: 600, borderRadius: 999, padding: "3px 10px",
          border: "1px solid #fecaca",
        }}>📌 Grifado</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {CLAUSES.map(c => (
          <button key={c.id} onClick={() => onSelect(c.id)} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600,
            cursor: "pointer", border: "1px solid",
            background: activeClause === c.id ? "#1d4ed8" : "#f9fafb",
            color: activeClause === c.id ? "#fff" : "#6b7280",
            borderColor: activeClause === c.id ? "#1d4ed8" : "#e5e7eb",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all .15s",
          }}>Cl. {c.id}</button>
        ))}
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.75, color: "#374151" }}>
        <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111827", marginBottom: 10 }}>
          Cláusula {clause.id.split(".")[0]}ª — {clause.title}
        </div>
        {clause.id !== "4.2" && (
          <p style={{ marginBottom: 12 }}>
            4.1 A CONTRATADA será responsável pelo fornecimento de toda a mão-de-obra, equipamentos e insumos necessários à execução dos serviços descritos no Objeto deste Contrato, salvo previsão expressa no Anexo I.
          </p>
        )}
        <p style={{ marginBottom: 12 }}>
          {clause.id === "4.2" && <>
            <strong>{clause.id}</strong> Em conformidade com o escopo definido, ficam a cargo da CONTRATADA os materiais de construção em geral, excetuando-se aqueles previstos na planilha-base.{" "}
            <span style={{ background: "#fef08a", padding: "1px 2px", borderRadius: 3 }}>
              {clause.excerpt}
            </span>
          </>}
          {clause.id !== "4.2" && <>
            <strong>{clause.id}</strong> {clause.excerpt}
          </>}
        </p>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#fffbeb", border: "1px solid #fde68a",
        borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e",
        marginTop: 8,
      }}>
        ⚠ Trecho sem teto financeiro — diagnóstico no painel →
      </div>
    </div>
  );
}

function DiagnosisPanel({ clauseId }) {
  const clause = CLAUSES.find(c => c.id === clauseId) || CLAUSES[0];
  return (
    <div style={{
      background: "#1e3a8a", borderRadius: 14, padding: "22px 24px",
      flex: "1 1 0", color: "#fff", display: "flex", flexDirection: "column", gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#93c5fd", textTransform: "uppercase", marginBottom: 4 }}>⚡ Infralyze AI</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>Diagnóstico — Cláusula {clause.id}</div>
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#93c5fd", textTransform: "uppercase", marginBottom: 8 }}>Tipo</div>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(239,68,68,.2)", border: "1px solid rgba(239,68,68,.4)",
          color: "#fca5a5", fontSize: 12, fontWeight: 600,
          borderRadius: 6, padding: "5px 12px",
        }}>
          💰 {clause.risk}
        </span>
      </div>

      <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#f87171", textTransform: "uppercase", marginBottom: 6 }}>Problema</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Aditivos sem teto financeiro</div>
        <div style={{ fontSize: 12, color: "#bfdbfe", lineHeight: 1.5 }}>Contratada pode gerar aditivos ilimitados sem aprovação prévia de valor.</div>
      </div>

      <div style={{ background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#fcd34d", textTransform: "uppercase", marginBottom: 6 }}>Impacto</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fbbf24", letterSpacing: "-0.5px", marginBottom: 2 }}>R$ 780K</div>
        <div style={{ fontSize: 12, color: "#bfdbfe" }}>risco de estouro em alta de insumos</div>
      </div>

      <div style={{ background: "rgba(99,179,237,.1)", border: "1px solid rgba(99,179,237,.25)", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#93c5fd", textTransform: "uppercase", marginBottom: 6 }}>Recomendação</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Cap de reajuste + atrelar ao INCC-DI/FGV</div>
        {["Cap de 15% sobre planilha-base", "Aprovação prévia obrigatória"].map(r => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#bfdbfe", marginBottom: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", flexShrink: 0, display: "inline-block" }} />
            {r}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        <button style={{
          flex: 1, background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 8, padding: "11px 0", fontWeight: 700, fontSize: 13,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>→ Gerar Cláusula</button>
        <button style={{
          flex: 1, background: "transparent", color: "#fff",
          border: "1px solid rgba(255,255,255,.25)", borderRadius: 8,
          padding: "11px 0", fontWeight: 600, fontSize: 13,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>Relatório Completo</button>
      </div>
    </div>
  );
}

function ClauseCard({ clause }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      padding: "18px 20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Cláusula {clause.id}</div>
        <span style={{
          background: clause.levelBg, color: clause.levelColor,
          fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "3px 10px",
        }}>{clause.level}</span>
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>{clause.title}</div>
      <div style={{
        background: "#f9fafb", borderRadius: 8, padding: "12px",
        fontSize: 12, color: "#374151", lineHeight: 1.65, marginBottom: 10,
      }}>{clause.excerpt}</div>
      <div style={{
        background: "#eff6ff", border: "1px solid #bfdbfe",
        borderRadius: 8, padding: "10px 12px",
        fontSize: 12, color: "#1e40af", lineHeight: 1.6, marginBottom: 12,
      }}>
        <strong>Diagnóstico:</strong> {clause.diagnosis}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>{clause.risk.split("·")[0].trim()}</span>
        <button style={{
          background: "none", border: "none", color: "#2563eb",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", padding: "4px 8px",
          borderRadius: 6,
        }}>Ver detalhe →</button>
      </div>
    </div>
  );
}

export default function Infralyze() {
  const [activeClause, setActiveClause] = useState("4.2");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f3f4f6; }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopBar />
          <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18, overflowY: "auto" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
                Análise: Empreitada_Torre_Sul.pdf
              </h1>
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
                Interface para upload, leitura automatizada, score de risco e diagnóstico de cláusulas.
              </p>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <ScoreCard />
              <FinanceCard />
              <ClausesCard />
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <DocumentPanel activeClause={activeClause} onSelect={setActiveClause} />
              <DiagnosisPanel clauseId={activeClause} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {CLAUSES.map(c => <ClauseCard key={c.id} clause={c} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
