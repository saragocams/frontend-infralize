import { useEffect, useMemo, useState } from "react";
import ContractsTable from "../components/ContractsTable.jsx";
import UploadModal from "../components/UploadModal.jsx";
import { getContracts } from "../api/contracts.js";

const filters = [
  { key: "todos", label: "Todos" },
  { key: "alto", label: "Alto Risco" },
  { key: "medio", label: "Risco Médio" },
  { key: "baixo", label: "Baixo Risco" },
];

export default function Contracts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    getContracts()
      .then((d) => alive && setItems(d))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return items.filter((c) => {
      if (filter !== "todos" && c.risco !== filter) return false;
      if (search && !c.nome.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, filter, search]);

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Contratos</h1>
          <p className="mt-1 text-sm text-ink-500">
            {items.length} contrato{items.length === 1 ? "" : "s"} analisado{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrar por nome…"
          className="h-9 w-64 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-700 placeholder:text-ink-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
              (filter === f.key
                ? "bg-ink-900 text-white"
                : "bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center text-sm text-ink-400">
          Carregando…
        </div>
      ) : (
        <ContractsTable
          items={filtered}
          title="Todos os contratos"
          onUpload={() => setUploadOpen(true)}
        />
      )}

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
