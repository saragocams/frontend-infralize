import Card from "./Card.jsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  delta,
  positive,
  icon: Icon,
  iconBg = "bg-brand-50",
  iconColor = "text-brand-600",
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
          {label}
        </p>
        {Icon ? (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        ) : null}
      </div>

      <div className="mt-3 text-3xl font-bold text-ink-900">{value}</div>

      {delta ? (
        <div
          className={
            "mt-2 inline-flex items-center gap-1 text-xs font-medium " +
            (positive ? "text-emerald-600" : "text-rose-600")
          }
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {delta}
        </div>
      ) : null}
    </Card>
  );
}
