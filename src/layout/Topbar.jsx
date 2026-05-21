export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-6">
      <p className="text-sm font-semibold text-ink-900">Análise de Contratos</p>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
        MB
      </div>
    </header>
  );
}
