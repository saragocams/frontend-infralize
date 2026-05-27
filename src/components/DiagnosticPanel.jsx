import { Sparkles, Lightbulb } from "lucide-react";

const GRAVIDADE_LABEL = { alta: "Grave", media: "Média", baixa: "Baixo" };
const GRAVIDADE_COLOR = {
  alta: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  media: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  baixa: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
};

export default function DiagnosticPanel({ risco }) {
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
        <h3 className="text-base font-semibold leading-snug">{risco.trecho_clausula}</h3>

        <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${GRAVIDADE_COLOR[risco.gravidade] ?? GRAVIDADE_COLOR.baixa}`}>
          {risco.categoria} · {GRAVIDADE_LABEL[risco.gravidade] ?? risco.gravidade}
        </p>

        <div className="mt-4 rounded-lg bg-rose-500/10 p-3 ring-1 ring-rose-500/20">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-300">
            Problema
          </p>
          <p className="mt-1 text-sm text-ink-300">{risco.por_que_importa}</p>
        </div>

        <div className="mt-3 rounded-lg bg-brand-500/15 p-3 ring-1 ring-brand-500/30">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-200">
            <Lightbulb className="h-3.5 w-3.5" />
            Recomendação
          </p>
          <p className="mt-1 text-sm text-ink-300">{risco.pergunta_sugerida}</p>
        </div>
      </div>
    </div>
  );
}
