import React, { useMemo, useState } from 'react';
import { Bell, ChevronRight, CircleAlert, Download, FileText, LayoutDashboard, Settings, UploadCloud, Scale, ShieldAlert, Sparkles, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const clauses = [
  {
    number: '4.2',
    title: 'Responsabilidade de materiais',
    risk: 'Risco de custo',
    level: 'Crítico',
    excerpt:
      'Os custos com materiais extras não previstos na planilha orçamentária inicial, bem como os acréscimos decorrentes de variação de preço dos insumos, serão de responsabilidade exclusiva da contratante, sem limitação de valor.',
    diagnosis:
      'A cláusula transfere variações de custo integralmente para a contratante e não estabelece teto financeiro.',
  },
  {
    number: '4.3',
    title: 'Aditivos contratuais',
    risk: 'Risco jurídico',
    level: 'Alto',
    excerpt:
      'Os aditivos deverão ser formalizados com antecedência mínima de 5 dias úteis, mediante notificação escrita.',
    diagnosis:
      'Prazo curto para aditivos pode gerar conflito operacional em obras com alteração frequente de escopo.',
  },
  {
    number: '7.1',
    title: 'Multas e penalidades',
    risk: 'Risco de prazo',
    level: 'Médio',
    excerpt:
      'Em caso de atraso, aplicar-se-á multa diária sobre o valor total do contrato até a regularização da entrega.',
    diagnosis:
      'Sugere revisão do cálculo da multa e inclusão de limite máximo de penalidade.',
  },
];

function RiskBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    'Crítico': 'bg-rose-100 text-rose-700 border-rose-200',
    'Alto': 'bg-amber-100 text-amber-700 border-amber-200',
    'Médio': 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return <Badge className={`border ${styles[label] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>{label}</Badge>;
}

export default function ContractAnalysisDashboard() {
  const [fileName, setFileName] = useState('Empreitada_Torre_Sul.pdf');
  const [score] = useState(78);
  const [progress] = useState(78);
  const riskLabel = useMemo(() => (score >= 75 ? 'ALTO RISCO' : score >= 45 ? 'RISCO MODERADO' : 'BAIXO RISCO'), [score]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r bg-white/90 px-5 py-6 shadow-sm md:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-blue-700">Infralyze</div>
              <div className="text-xs text-slate-400">Análise de contratos com IA</div>
            </div>
          </div>

          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Menu</div>
          <nav className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Visão Geral" active />
            <SidebarItem icon={FileText} label="Contratos" count="12" />
            <SidebarItem icon={Sparkles} label="Relatórios de Obra" />
            <SidebarItem icon={Settings} label="Configurações" />
          </nav>

          <div className="mt-8 rounded-3xl border bg-gradient-to-br from-blue-50 to-white p-4">
            <p className="text-sm font-semibold text-slate-800">Fluxo sugerido</p>
            <p className="mt-1 text-sm text-slate-500">
              Faça upload do PDF, rode a análise e revise cláusulas críticas com recomendações automáticas.
            </p>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">MB</div>
              <div>
                <div className="text-sm font-medium">Seu perfil</div>
                <div className="text-xs text-slate-500">Eng. Contratante</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-4 md:px-6 md:py-5">
          <header className="mb-5 flex items-center justify-between gap-4 rounded-3xl border bg-white px-4 py-3 shadow-sm">
            <div className="max-w-xl flex-1">
              <div className="relative">
                <Input placeholder="Buscar contratos..." className="h-11 rounded-2xl bg-slate-50 pl-10" />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">MB</div>
            </div>
          </header>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Contratos</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-slate-700">Torre Sul</span>
          </div>

          <div className="mb-5 flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Análise: {fileName}</h1>
              <p className="mt-1 text-sm text-slate-500">
                Interface para upload, leitura automatizada, score de risco e diagnóstico de cláusulas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-blue-600 px-5 shadow-lg shadow-blue-200 hover:bg-blue-700">
                <UploadCloud className="mr-2 h-4 w-4" />
                Enviar contrato
              </Button>
              <Button variant="outline" className="rounded-2xl px-5">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="rounded-3xl border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-[0.22em] text-slate-400">Score de risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-rose-500 px-3 py-1 text-white hover:bg-rose-500">{riskLabel}</Badge>
                  <span className="text-sm text-slate-500">Percentil 94</span>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                    <span>{score}/100</span>
                    <span>Alto risco</span>
                  </div>
                  <Progress value={progress} className="h-2 rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-[0.22em] text-slate-400">Impacto financeiro estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tight">R$ 1,25M</div>
                <p className="mt-1 text-sm text-slate-500">Exposição máxima estimada</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniStat label="Custo" value="R$780K" icon={Wallet} />
                  <MiniStat label="Jurídico" value="R$470K" icon={Scale} />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-[0.22em] text-slate-400">Cláusulas críticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tight">12</div>
                <p className="mt-1 text-sm text-slate-500">Problemas encontrados</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge className="rounded-full bg-rose-50 text-rose-700 hover:bg-rose-50">4 Custo</Badge>
                  <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50">5 Jurídico</Badge>
                  <Badge className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-50">3 Inconsist.</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <Card className="rounded-3xl border bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
                <div>
                  <CardTitle className="text-base font-semibold">Empreitada_Torre_Sul.pdf</CardTitle>
                  <p className="text-sm text-slate-500">Cláusula 4.2 · Pág. 11 / 47</p>
                </div>
                <Badge className="rounded-full bg-rose-50 text-rose-700 hover:bg-rose-50">Grifado</Badge>
              </CardHeader>
              <CardContent className="space-y-5 pt-5">
                <section className="rounded-2xl border bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FileText className="h-4 w-4" />
                    Visualização do trecho
                  </div>
                  <p className="leading-7 text-slate-700">
                    <span className="font-semibold">Cláusula 4a — Responsabilidade de materiais</span>
                    <br />
                    4.1 A contratada será responsável pelo fornecimento de toda a mão de obra, equipamentos e insumos necessários à execução dos serviços descritos no objeto deste contrato, salvo previsão expressa no Anexo I.
                    <br /><br />
                    4.2 Em conformidade com o escopo definido, ficam a cargo da contratada os materiais de construção em geral, excetuando-se aqueles previstos na planilha-base.{' '}
                    <span className="rounded bg-amber-200 px-1 py-0.5">
                      Os custos com materiais extras não previstos na planilha orçamentária inicial, bem como os acréscimos decorrentes de variação de preço dos insumos, serão de responsabilidade exclusiva da contratante, sem limitação de valor.
                    </span>
                    <br /><br />
                    4.3 Os aditivos deverão ser formalizados com antecedência mínima de 5 dias úteis, mediante notificação escrita.
                  </p>
                </section>

                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  Trecho sem teto financeiro — destaque automático do sistema.
                </section>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-base font-semibold">Diagnóstico — Cláusula 4.2</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-700">
                    <CircleAlert className="h-4 w-4" />
                    Problema
                  </div>
                  <div className="text-lg font-bold text-slate-900">Aditivos sem teto financeiro</div>
                  <p className="mt-1 text-sm text-slate-600">
                    A redação permite custos ilimitados sem aprovação prévia de valor.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-700">
                    <Wallet className="h-4 w-4" />
                    Impacto
                  </div>
                  <div className="text-3xl font-extrabold text-rose-600">R$ 780K</div>
                  <p className="mt-1 text-sm text-slate-600">Risco de estouro em alta de insumos</p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <ShieldAlert className="h-4 w-4" />
                    Recomendação
                  </div>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Cap de reajuste + atrelamento ao INCC-DI/FGV</span>
                    <br />
                    • Cap de 15% sobre a planilha-base
                    <br />
                    • Aprovação prévia obrigatória para aditivos acima do limite
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700">Gerar cláusula</Button>
                  <Button variant="outline" className="flex-1 rounded-2xl">Relatório completo</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {clauses.map((clause) => (
              <Card key={clause.number} className="rounded-3xl border bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base">Cláusula {clause.number}</CardTitle>
                    <RiskBadge label={clause.level} />
                  </div>
                  <p className="text-sm text-slate-500">{clause.title}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{clause.excerpt}</div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                    <span className="font-semibold text-blue-700">Diagnóstico:</span> {clause.diagnosis}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{clause.risk}</span>
                    <Button variant="ghost" className="rounded-full px-3 text-blue-600">Ver detalhe</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false, count }: { icon: any; label: string; active?: boolean; count?: string }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition ${
        active ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {count ? <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">{count}</span> : null}
    </div>
  );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
