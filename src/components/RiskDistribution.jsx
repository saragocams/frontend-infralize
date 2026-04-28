import Card from "./Card.jsx";

const rows = [
  { key: "alto", label: "Alto Risco", bar: "bg-rose-500", num: "text-rose-500" },
  { key: "medio", label: "Risco Médio", bar: "bg-amber-500", num: "text-amber-600" },
  { key: "baixo", label: "Baixo Risco", bar: "bg-emerald-500", num: "text-emerald-600" },
];

export default function RiskDistribution({ data }) {
  if (!data) return null;
  const total = (data.alto || 0) + (data.medio || 0) + (data.baixo || 0) || 1;

  return (
    <Card className="p-5">
      <h3 className="text-base font-semibold text-ink-900">Distribuição de Riscos</h3>

      <div className="mt-5 space-y-4">
        {rows.map((r) => {
          const value = data[r.key] || 0;
          const pct = Math.max(2, Math.round((value / total) * 100));
          return (
            <div key={r.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600">{r.label}</span>
                <span className={`font-semibold ${r.num}`}>{value}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className={`h-full ${r.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
