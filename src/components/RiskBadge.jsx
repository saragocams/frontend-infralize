const styles = {
  alto: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
  medio: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  baixo: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

const labels = {
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

export default function RiskBadge({ level, className = "" }) {
  const cls = styles[level] || styles.medio;
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
        cls +
        " " +
        className
      }
    >
      {labels[level] || level}
    </span>
  );
}
