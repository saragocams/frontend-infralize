import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  HardHat,
  Settings,
  Building2,
} from "lucide-react";

const items = [
  { to: "/", label: "Visão Geral", icon: LayoutGrid, end: true },
  { to: "/contratos", label: "Contratos", icon: FileText, badge: 12 },
  { to: "/relatorios", label: "Relatórios de Obra", icon: HardHat },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-ink-100 bg-white">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-brand-600">Infralize</span>
      </div>

      <p className="px-6 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        Menu
      </p>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map(({ to, label, icon: Icon, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-ink-50 text-ink-900 font-semibold"
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-800",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <Icon
                    className={
                      "h-4 w-4 " +
                      (isActive ? "text-ink-900" : "text-ink-400 group-hover:text-ink-600")
                    }
                  />
                  {label}
                </span>
                {badge ? (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-semibold text-white">
                    {badge}
                  </span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

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
