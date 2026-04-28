import { useEffect, useState } from "react";
import { FileText, DollarSign, ShieldAlert, CheckCircle2 } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import ContractsTable from "../components/ContractsTable.jsx";
import RiskDistribution from "../components/RiskDistribution.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import TopRisks from "../components/TopRisks.jsx";
import UploadModal from "../components/UploadModal.jsx";
import { getOverview } from "../api/contracts.js";

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    getOverview()
      .then((d) => alive && setData(d))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-400">
        Carregando…
      </div>
    );
  }

  const k = data.kpis;

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink-900">Visão Geral</h1>
        <p className="mt-1 text-sm text-ink-500">
          Portfólio de contratos · Março 2025
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Contratos Analisados"
          value={k.contratos_analisados.valor}
          delta={k.contratos_analisados.delta}
          positive={k.contratos_analisados.positivo}
          icon={FileText}
          iconBg="bg-brand-50"
          iconColor="text-brand-600"
        />
        <StatCard
          label="Exposição Total"
          value={k.exposicao_total.valor}
          delta={k.exposicao_total.delta}
          positive={k.exposicao_total.positivo}
          icon={DollarSign}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
        />
        <StatCard
          label="Alto Risco"
          value={k.alto_risco.valor}
          delta={k.alto_risco.delta}
          positive={k.alto_risco.positivo}
          icon={ShieldAlert}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
        />
        <StatCard
          label="Validados"
          value={k.validados.valor}
          delta={k.validados.delta}
          positive={k.validados.positivo}
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContractsTable
            items={data.contratos_recentes}
            onUpload={() => setUploadOpen(true)}
          />
        </div>
        <div className="space-y-6">
          <RiskDistribution data={data.distribuicao_risco} />
          <RecentActivity items={data.atividade_recente} />
        </div>
      </section>

      <section>
        <TopRisks items={data.principais_riscos} />
      </section>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
