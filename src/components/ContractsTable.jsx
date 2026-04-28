import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import RiskBadge from "./RiskBadge.jsx";
import { Plus } from "lucide-react";

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

const scoreColor = (level) =>
  ({
    alto: "text-rose-600",
    medio: "text-amber-600",
    baixo: "text-emerald-600",
  }[level] || "text-ink-700");

export default function ContractsTable({ items = [], title = "Contratos Recentes", onUpload }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink-900">{title}</h3>
        {onUpload ? (
          <button
            onClick={onUpload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Novo Upload
          </button>
        ) : null}
      </div>

      <div className="mt-4 -mx-2 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              <th className="px-3 py-2">Contrato</th>
              <th className="px-3 py-2">Risco</th>
              <th className="px-3 py-2">Score</th>
              <th className="px-3 py-2">Cláusulas</th>
              <th className="px-3 py-2">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {items.map((c) => (
              <tr key={c.id} className="group hover:bg-ink-50/60">
                <td className="px-3 py-3">
                  <Link
                    to={`/contratos/${c.id}`}
                    className="block min-w-0 text-sm font-medium text-ink-800 group-hover:text-brand-600"
                  >
                    <div className="truncate">{c.nome}</div>
                    <div className="text-xs font-normal text-ink-400">
                      {fmtDate(c.data)}
                    </div>
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <RiskBadge level={c.risco} />
                </td>
                <td className={`px-3 py-3 font-semibold ${scoreColor(c.risco)}`}>
                  {c.score}
                </td>
                <td className="px-3 py-3 font-semibold text-ink-700">
                  {c.clausulas_criticas}
                </td>
                <td className="px-3 py-3 text-ink-700">{c.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
