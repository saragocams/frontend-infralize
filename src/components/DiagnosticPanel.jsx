import { Sparkles, Coins, Lightbulb, FileDown } from "lucide-react";

export default function DiagnosticPanel({ risco, onGerar, onRelatorio }) {
  if (!risco) return null;
  return (
    <div className="overflow-hidden rounded-xl bg-ink-900 text-white shadow-[0_2px_6px_rgba(20,22,28,0.08)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <Sparkles className="h-4 w-4 text-brand-300" />
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">
          Infralize AI
        </span>
      </div>

      <div className="px-5 py-5">
        <h3 className="text-lg font-semibold">Diagnóstico — Cláusula {risco.numero_clausula}</h3>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-300">
          Tipo
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/30">
          <Coins className="h-3.5 w-3.5" />
          {risco.categoria} ·{" "}
          {risco.gravidade === "alta"
            ? "Crítico"
            : risco.gravidade === "media"
            ? "Atenção"
            : "Baixo"}
        </p>

        <div className="mt-4 rounded-lg bg-rose-500/10 p-3 ring-1 ring-rose-500/20">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-300">
            Problema
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{risco.problema_curto}</p>
          <p className="mt-1 text-xs text-ink-300">{risco.por_que_importa}</p>
        </div>

        <div className="mt-3 rounded-lg bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
            Impacto
          </p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-300">
              {risco.impacto?.valor}
            </span>
            <span className="text-xs text-ink-300">{risco.impacto?.subtitulo}</span>
          </p>
        </div>

        <div className="mt-3 rounded-lg bg-brand-500/15 p-3 ring-1 ring-brand-500/30">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-200">
            <Lightbulb className="h-3.5 w-3.5" />
            Recomendação
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {risco.recomendacao?.titulo}
          </p>
          {risco.recomendacao?.bullets?.length ? (
            <ul className="mt-2 space-y-0.5 text-xs text-ink-300">
              {risco.recomendacao.bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={onGerar}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-400"
          >
            <Sparkles className="h-4 w-4" />
            Gerar Cláusula
          </button>
          <button
            onClick={onRelatorio}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
          >
            <FileDown className="h-4 w-4" />
            Relatório Completo
          </button>
        </div>
      </div>
    </div>
  );
}
