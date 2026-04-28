import Card from "./Card.jsx";
import { Coins, Scale, Zap } from "lucide-react";

const variants = {
  custo: {
    Icon: Coins,
    cardBg: "bg-rose-50/60",
    border: "border-rose-100",
    titleColor: "text-rose-700",
    valueColor: "text-rose-600",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  juridico: {
    Icon: Scale,
    cardBg: "bg-amber-50/70",
    border: "border-amber-100",
    titleColor: "text-amber-700",
    valueColor: "text-amber-700",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  prazo: {
    Icon: Zap,
    cardBg: "bg-rose-50/60",
    border: "border-rose-100",
    titleColor: "text-rose-700",
    valueColor: "text-rose-600",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
};

export default function TopRisks({ items = [] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink-900">
          Principais Riscos Identificados
        </h3>
        <a className="text-sm font-medium text-brand-600 hover:underline" href="#">
          Ver todos →
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((r, i) => {
          const v = variants[r.categoria] || variants.custo;
          const Icon = v.Icon;
          return (
            <div
              key={i}
              className={`relative rounded-xl border ${v.border} ${v.cardBg} p-4`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-md ${v.iconBg}`}
              >
                <Icon className={`h-4 w-4 ${v.iconColor}`} />
              </div>
              <p
                className={`mt-3 text-[11px] font-semibold uppercase tracking-wider ${v.titleColor}`}
              >
                {r.titulo}
              </p>
              <p className="mt-1 text-sm text-ink-700">{r.descricao}</p>
              <p className={`mt-3 text-xl font-bold ${v.valueColor}`}>{r.valor}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
