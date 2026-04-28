import Card from "./Card.jsx";
import { ShieldAlert } from "lucide-react";

function levelFromScore(score) {
  if (score >= 60) return "alto";
  if (score >= 35) return "medio";
  return "baixo";
}

const labelFor = {
  alto: "ALTO RISCO",
  medio: "RISCO MÉDIO",
  baixo: "BAIXO RISCO",
};

const pillStyle = {
  alto: "bg-rose-500 text-white",
  medio: "bg-amber-500 text-white",
  baixo: "bg-emerald-500 text-white",
};

export default function ScoreCard({ score, percentil }) {
  const level = levelFromScore(score);
  const pct = Math.min(100, Math.max(0, score));

  return (
    <Card className="p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        Score de Risco
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${pillStyle[level]}`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          {labelFor[level]}
        </span>
      </div>

      <div className="mt-4">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500">
          <div
            className="absolute -top-1 h-4 w-1 rounded-full bg-ink-900 ring-2 ring-white"
            style={{ left: `calc(${pct}% - 2px)` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
          <span className="font-semibold text-ink-800">{score}/100</span>
          {percentil != null ? <span>Percentil {percentil}º</span> : null}
        </div>
      </div>
    </Card>
  );
}
