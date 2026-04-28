import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  ChevronRight,
} from "lucide-react";
import Card from "../components/Card.jsx";
import ScoreCard from "../components/ScoreCard.jsx";
import ClauseViewer from "../components/ClauseViewer.jsx";
import DiagnosticPanel from "../components/DiagnosticPanel.jsx";
import { getContract } from "../api/contracts.js";

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
    return () => {
      alive = false;
    };
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

  return (
    <div className="mx-auto max-w-[1200px] space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-ink-500">
        <Link to="/contratos" className="hover:text-ink-800">Contratos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-700">{meta.id}</span>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-400">Análise</p>
          <h1 className="text-2xl font-bold text-ink-900">{meta.nome}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Concluído em {analise.tempo_processamento}
          </span>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ScoreCard score={analise.score_risco} percentil={analise.percentil} />

        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Impacto Financeiro Est.
          </p>
          <p className="mt-3 text-3xl font-bold text-ink-900">
            {analise.impacto_financeiro?.total}
          </p>
          <p className="mt-1 text-xs text-ink-500">Exposição máxima</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-ink-50/60 p-2.5">
              <p className="text-[11px] uppercase tracking-wider text-ink-400">Custo</p>
              <p className="mt-1 text-base font-bold text-rose-600">
                {analise.impacto_financeiro?.custo}
              </p>
            </div>
            <div className="rounded-lg bg-ink-50/60 p-2.5">
              <p className="text-[11px] uppercase tracking-wider text-ink-400">Jurídico</p>
              <p className="mt-1 text-base font-bold text-rose-600">
                {analise.impacto_financeiro?.juridico}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Cláusulas Críticas
          </p>
          <p className="mt-3 text-3xl font-bold text-ink-900">
            {analise.riscos?.length ?? 0}
          </p>
          <p className="mt-1 text-xs text-ink-500">Problemas encontrados</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <CategoryChip color="rose" label={`${analise.contagem_categorias?.custo ?? 0} Custo`} />
            <CategoryChip color="amber" label={`${analise.contagem_categorias?.juridico ?? 0} Jurídico`} />
            <CategoryChip color="brand" label={`${analise.contagem_categorias?.inconsistencia ?? 0} Inconsist.`} />
          </div>
        </Card>
      </section>

      {analise.riscos?.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {analise.riscos.map((r, i) => (
            <button
              key={r.id ?? i}
              onClick={() => setRiscoIdx(i)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
                (i === riscoIdx
                  ? "bg-ink-900 text-white"
                  : "bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50")
              }
            >
              Cláusula {r.numero_clausula} · {r.problema_curto}
            </button>
          ))}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ClauseViewer
            nomeArquivo={meta.nome}
            risco={risco}
            totalPaginas={analise.paginas}
            texto={texto_extraido}
          />
        </div>
        <div className="lg:col-span-2">
          <DiagnosticPanel risco={risco} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-base font-semibold text-ink-900">Resumo do contrato</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{analise.resumo}</p>
          <p className="mt-3 text-xs text-ink-400">
            Tipo: <span className="font-semibold text-ink-700">{analise.tipo_documento}</span> · Confiança geral:{" "}
            <span className="font-semibold text-ink-700">
              {Math.round((analise.confianca_geral ?? 0) * 100)}%
            </span>
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-ink-900">Recomendação geral</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{analise.recomendacao}</p>
          {analise.informacoes_faltantes?.length ? (
            <>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                Informações faltantes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-600">
                {analise.informacoes_faltantes.map((i, idx) => (
                  <li key={idx}>• {i}</li>
                ))}
              </ul>
            </>
          ) : null}
        </Card>
      </section>
    </div>
  );
}

function CategoryChip({ color, label }) {
  const cls =
    {
      rose: "bg-rose-50 text-rose-700 ring-rose-200",
      amber: "bg-amber-50 text-amber-700 ring-amber-200",
      brand: "bg-brand-50 text-brand-700 ring-brand-200",
    }[color] || "bg-ink-50 text-ink-700 ring-ink-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>
      {label}
    </span>
  );
}
