import Card from "./Card.jsx";
import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";

const icons = {
  alerta: { Icon: AlertOctagon, color: "text-rose-500", bg: "bg-rose-50" },
  warn: { Icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  ok: { Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
};

export default function RecentActivity({ items = [] }) {
  return (
    <Card className="p-5">
      <h3 className="text-base font-semibold text-ink-900">Atividade Recente</h3>

      <ul className="mt-4 space-y-4">
        {items.map((it) => {
          const { Icon, color, bg } = icons[it.tipo] || icons.warn;
          return (
            <li key={it.id} className="flex items-start gap-3">
              <span
                className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ${bg}`}
              >
                <Icon className={`h-3.5 w-3.5 ${color}`} />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink-800">{it.texto}</p>
                <p className="text-xs text-ink-400">{it.quando}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
