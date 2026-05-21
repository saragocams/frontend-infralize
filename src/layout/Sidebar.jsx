import { Building2 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-ink-100 bg-white">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-brand-600">Infralize</span>
      </div>

      <div className="flex-1" />

      <div className="m-3 flex items-center gap-3 rounded-lg border border-ink-100 px-3 py-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 text-xs font-semibold text-white">
          MB
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-ink-900">Marcelo Braga</div>
          <div className="truncate text-xs text-ink-400">Eng. Contratante</div>
        </div>
      </div>
    </aside>
  );
}
