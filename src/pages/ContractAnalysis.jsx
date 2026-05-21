import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Download, AlertTriangle, AlertCircle, Info } from "lucide-react";
import Card from "../components/Card.jsx";
import ClauseViewer from "../components/ClauseViewer.jsx";
import DiagnosticPanel from "../components/DiagnosticPanel.jsx";
import { getContract } from "../api/contracts.js";

const GRAVIDADE_CONFIG = {
  alta:  { label: "Grave",    icon: AlertTriangle, color: "text-rose-600",   bg: "bg-rose-50",   ring: "ring-rose-200"  },
  media: { label: "Média",    icon: AlertCircle,   color: "text-amber-600",  bg: "bg-amber-50",  ring: "ring-amber-200" },
  baixa: { label: "Baixo",    icon: Info,          color: "text-emerald-600",bg: "bg-emerald-50",ring: "ring-emerald-200"},
};

export default function ContractAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riscoIdx, setRiscoIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getContract(id)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-400">
        Carregando análise…
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="mx-auto max-w-[800px] rounded-xl bg-white p-8 text-center text-ink-600 ring-1 ring-ink-100">
        <p className="text-sm">{error || "Contrato não encontrado"}</p>
        <Link to="/contratos" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          ← voltar para Contratos
        </Link>
      </div>
    );
  }

  const { meta, analise, texto_extraido } = data;
  const risco = analise.riscos?.[riscoIdx];

  const graves   = analise.riscos?.filter((r) => r.gravidade === "alta")  ?? [];
  const medias   = analise.riscos?.filter((r) => r.gravidade === "media") ?? [];
  const faltantes = analise.informacoes_faltantes ?? [];

  return (
    <div className="mx-auto max-w-[1200px] space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-ink-500">
        <Link to="/contratos" className="hover:text-ink-800">Contratos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-700">{meta?.nome ?? id}</span>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-400">Análise</p>
          <h1 className="text-2xl font-bold text-ink-900">{meta?.nome ?? id}</h1>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          <Download className="h-4 w-4" />
          Exportar
        </button>
      </header>

      {/* Cláusulas críticas + Resumo */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Cláusulas Críticas
          </p>
          <p className="mt-3 text-3xl font-bold text-ink-900">
            {(analise.riscos?.length ?? 0) + faltantes.length}
          </p>
          <p className="mt-1 text-xs text-ink-500">Problemas e lacunas encontradas</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <SeverityChip count={graves.length}   cfg={GRAVIDADE_CONFIG.alta}  />
            <SeverityChip count={medias.length}   cfg={GRAVIDADE_CONFIG.media} />
            <FaltanteChip count={faltantes.length} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Resumo do contrato
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{analise.resumo}</p>
          <p className="mt-3 text-xs text-ink-400">
            Tipo:{" "}
            <span className="font-semibold text-ink-700">{analise.tipo_documento}</span>
          </p>
        </Card>
      </section>

      {/* Navegação entre cláusulas */}
      {analise.riscos?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {analise.riscos.map((r, i) => {
            const cfg = GRAVIDADE_CONFIG[r.gravidade] ?? GRAVIDADE_CONFIG.baixa;
            const label = r.trecho_clausula.length > 35
              ? r.trecho_clausula.slice(0, 35) + "…"
              : r.trecho_clausula;
            return (
              <button
                key={r.id ?? i}
                onClick={() => setRiscoIdx(i)}
                className={
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
                  (i === riscoIdx
                    ? "bg-ink-900 text-white"
                    : "bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50")
                }
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === riscoIdx ? "bg-white" : cfg.color.replace("text-", "bg-")}`} />
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Viewer + Diagnóstico */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ClauseViewer
            nomeArquivo={meta?.nome ?? id}
            risco={risco}
            texto={texto_extraido}
          />
        </div>
        <div className="lg:col-span-2">
          <DiagnosticPanel risco={risco} recomendacaoGeral={analise.recomendacao} />
        </div>
      </section>

      {/* Recomendação geral + Cláusulas faltantes */}
      {(analise.recomendacao || faltantes.length > 0) && (
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {analise.recomendacao && (
            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink-900">Recomendação geral</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{analise.recomendacao}</p>
            </Card>
          )}

          {faltantes.length > 0 && (
            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink-900">Cláusulas faltantes</h3>
              <p className="mt-1 text-xs text-ink-400">A IA identificou as seguintes lacunas no contrato</p>
              <ul className="mt-3 space-y-2">
                {faltantes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ink-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink-100 text-[10px] font-bold text-ink-500">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 border-t border-amber-200 bg-amber-50 px-4 py-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
        <p className="text-xs text-amber-700">
          Ao recarregar a página você perderá esta análise e precisará enviar o contrato novamente.
        </p>
      </div>
    </div>
  );
}

function SeverityChip({ count, cfg }) {
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${cfg.bg} ${cfg.color} ${cfg.ring}`}>
      <Icon className="h-3.5 w-3.5" />
      {count} {cfg.label}
    </span>
  );
}

function FaltanteChip({ count }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-500 ring-1 ring-ink-200">
      <Info className="h-3.5 w-3.5" />
      {count} Faltante{count !== 1 ? "s" : ""}
    </span>
  );
}
