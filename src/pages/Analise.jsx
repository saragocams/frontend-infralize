import { useRef, useState } from "react";
import {
  UploadCloud, FileText, Loader2, RotateCcw,
  Download, AlertTriangle, AlertCircle, Info, Layers,
} from "lucide-react";
import { analyzeContract } from "../api/contracts.js";
import Card from "../components/Card.jsx";
import ClauseViewer from "../components/ClauseViewer.jsx";
import DiagnosticPanel from "../components/DiagnosticPanel.jsx";

const GRAVIDADE_CONFIG = {
  alta:  { label: "Grave", icon: AlertTriangle, color: "text-rose-600",    bg: "bg-rose-50",    ring: "ring-rose-200"   },
  media: { label: "Média", icon: AlertCircle,   color: "text-amber-600",   bg: "bg-amber-50",   ring: "ring-amber-200"  },
  baixa: { label: "Baixo", icon: Info,          color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" },
};

export default function Analise() {
  const [phase, setPhase] = useState("idle");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  function pick(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  function clearFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function submit() {
    if (!file) return;
    setFileName(file.name);
    setError(null);
    setPhase("loading");
    try {
      const data = await analyzeContract(file);
      setResult(data);
      setPhase("done");
    } catch (err) {
      setError(err.message || "Falha na análise. Verifique se o backend está rodando.");
      setPhase("idle");
    }
  }

  function reset() {
    setPhase("idle");
    setFile(null);
    setResult(null);
    setFileName("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (phase === "loading") return <LoadingScreen fileName={fileName} />;
  if (phase === "done" && result) return <ResultScreen result={result} fileName={fileName} onReset={reset} />;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#EEF3FF]">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-[48px] bg-blue-200/50" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-[48px] bg-blue-200/50" />

      {/* Conteúdo central */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20">
        {/* Badge */}
        <span className="rounded-full border border-slate-200 bg-white/60 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Inovação Legal · Construção Civil &amp; Tecnologia
        </span>

        {/* Logo */}
        <div className="mt-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-md">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-extrabold text-ink-900">Infralize</span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-2xl text-center text-5xl font-extrabold leading-tight text-ink-900 md:text-6xl">
          IA que identifica{" "}
          <span className="text-brand-600">riscos ocultos</span>{" "}
          em contratos de construção
        </h1>

        {/* Subtítulo */}
        <p className="mt-5 max-w-lg text-center text-lg text-slate-500">
          Inteligência para leitura e scoring de risco contratual em minutos.
        </p>

        {/* Upload */}
        <div className="mt-12 w-full max-w-lg">
          <label
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            htmlFor="file-input"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-blue-200 bg-white/70 px-6 py-12 text-center shadow-sm backdrop-blur-sm transition-colors hover:border-brand-400 hover:bg-white/90"
          >
            {file ? (
              <>
                <FileText className="h-10 w-10 text-brand-600" />
                <p className="text-sm font-semibold text-ink-800">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); clearFile(); }}
                  className="mt-1 text-xs font-medium text-brand-600 hover:underline"
                >
                  trocar arquivo
                </button>
              </>
            ) : (
              <>
                <UploadCloud className="h-10 w-10 text-slate-400" />
                <p className="text-sm font-semibold text-ink-700">
                  Arraste o PDF ou clique para selecionar
                </p>
                <p className="text-xs text-slate-400">PDF até 20 MB</p>
              </>
            )}
            <input ref={inputRef} id="file-input" type="file" accept="application/pdf" onChange={pick} className="hidden" />
          </label>

          {error && (
            <p className="mt-3 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700 ring-1 ring-rose-200">
              {error}
            </p>
          )}

          <button
            onClick={submit}
            disabled={!file}
            className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Analisar contrato
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-8 pb-6 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        <span>Confidencial</span>
        <span>Infralize © 2026</span>
      </div>
    </div>
  );
}

function LoadingScreen({ fileName }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#EEF3FF]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-[48px] bg-blue-200/50" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-[48px] bg-blue-200/50" />
      <div className="relative z-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 shadow-lg">
          <Layers className="h-8 w-8 animate-pulse text-white" />
        </div>
        <Loader2 className="mx-auto mt-6 h-8 w-8 animate-spin text-brand-600" />
        <p className="mt-4 text-lg font-semibold text-ink-900">Analisando contrato…</p>
        <p className="mt-1 text-sm text-slate-500">{fileName}</p>
        <p className="mt-1 text-xs text-slate-400">Isso pode levar até 1 minuto</p>
      </div>
    </div>
  );
}

function ResultScreen({ result, fileName, onReset }) {
  const [riscoIdx, setRiscoIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);

  const { analise, texto_extraido } = result;
  const risco = analise.riscos?.[riscoIdx];

  const graves    = analise.riscos?.filter((r) => r.gravidade === "alta")  ?? [];
  const medias    = analise.riscos?.filter((r) => r.gravidade === "media") ?? [];
  const faltantes = (analise.informacoes_faltantes ?? []).map((f) =>
    typeof f === "string" ? { titulo: f, motivo: null } : f
  );

  const [faltanteIdx, setFaltanteIdx] = useState(0);

  function toggleFilter(key) {
    setActiveFilter((prev) => (prev === key ? null : key));
  }

  function selectRisco(globalIdx) {
    setRiscoIdx(globalIdx);
    setActiveFilter(null);
  }

  function selectFaltante(idx) {
    setFaltanteIdx(idx);
  }

  const expandedRiscos =
    activeFilter === "alta"  ? graves  :
    activeFilter === "media" ? medias  : [];
  const showFaltantes = activeFilter === "faltante";

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-extrabold text-brand-600">Infralize</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            <RotateCcw className="h-4 w-4" />
            Nova análise
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-5 px-6 py-6">
        {/* Título */}
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-400">Análise</p>
          <h1 className="text-2xl font-bold text-ink-900">{fileName}</h1>
        </div>

        {/* Cláusulas críticas + Resumo */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              Cláusulas Críticas
            </p>
            <p className="mt-3 text-3xl font-bold text-ink-900">
              {(analise.riscos?.length ?? 0) + faltantes.length}
            </p>
            <p className="mt-1 text-xs text-ink-500">Problemas e lacunas encontradas</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SeverityChip count={graves.length}    cfg={GRAVIDADE_CONFIG.alta}  active={activeFilter === "alta"}     onClick={() => toggleFilter("alta")} />
              <SeverityChip count={medias.length}    cfg={GRAVIDADE_CONFIG.media} active={activeFilter === "media"}    onClick={() => toggleFilter("media")} />
              <FaltanteChip count={faltantes.length}                              active={activeFilter === "faltante"} onClick={() => toggleFilter("faltante")} />
            </div>

            {(expandedRiscos.length > 0 || showFaltantes) && (
              <div className="mt-4 overflow-hidden rounded-lg ring-1 ring-ink-100">
                {showFaltantes ? (
                  faltantes.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectFaltante(idx)}
                      className={`flex w-full items-center gap-2 border-b border-ink-50 px-3 py-2.5 text-left last:border-0 transition-colors ${
                        faltanteIdx === idx ? "bg-indigo-50" : "hover:bg-ink-50"
                      }`}
                    >
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        faltanteIdx === idx ? "bg-indigo-600 text-white" : "bg-ink-100 text-ink-500"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm text-ink-600">{item.titulo}</span>
                    </button>
                  ))
                ) : (
                  expandedRiscos.map((r) => {
                    const globalIdx = analise.riscos.indexOf(r);
                    return (
                      <button
                        key={r.id ?? globalIdx}
                        onClick={() => selectRisco(globalIdx)}
                        className="flex w-full items-center justify-between border-b border-ink-50 px-3 py-2.5 text-left last:border-0 hover:bg-ink-50"
                      >
                        <span className="text-sm text-ink-700">{r.trecho_clausula}</span>
                        <span className="ml-3 shrink-0 text-xs text-ink-400">{r.categoria}</span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              Resumo do contrato
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{analise.resumo}</p>
            <p className="mt-3 text-xs text-ink-400">
              Tipo: <span className="font-semibold text-ink-700">{analise.tipo_documento}</span>
            </p>
          </Card>
        </section>

        {/* Navegação entre cláusulas */}
        {analise.riscos?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {analise.riscos.map((r, i) => {
              const cfg = GRAVIDADE_CONFIG[r.gravidade] ?? GRAVIDADE_CONFIG.baixa;
              const label = r.trecho_clausula.length > 35 ? r.trecho_clausula.slice(0, 35) + "…" : r.trecho_clausula;
              return (
                <button
                  key={r.id ?? i}
                  onClick={() => setRiscoIdx(i)}
                  className={
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
                    (i === riscoIdx && !showFaltantes
                      ? "bg-ink-900 text-white"
                      : "bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50")
                  }
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${i === riscoIdx && !showFaltantes ? "bg-white" : cfg.color.replace("text-", "bg-")}`} />
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Viewer + Diagnóstico */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ClauseViewer nomeArquivo={fileName} risco={risco} texto={texto_extraido} />
          </div>
          <div className="lg:col-span-2">
            {showFaltantes && faltantes[faltanteIdx] ? (
              <FaltantePanel faltante={faltantes[faltanteIdx]} />
            ) : (
              <DiagnosticPanel risco={risco} recomendacaoGeral={analise.recomendacao} />
            )}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 border-t border-amber-200 bg-amber-50 px-4 py-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
        <p className="text-xs text-amber-700">
          Ao recarregar a página você perderá esta análise e precisará enviar o contrato novamente.
        </p>
      </div>
    </div>
  );
}

function SeverityChip({ count, cfg, active, onClick }) {
  const Icon = cfg.icon;
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-colors ${
        active ? "bg-ink-900 text-white ring-ink-900" : `${cfg.bg} ${cfg.color} ${cfg.ring} hover:opacity-80`
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {count} {cfg.label}
    </button>
  );
}


function FaltantePanel({ faltante }) {
  return (
    <div className="rounded-2xl bg-ink-900 p-5 text-white">
      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        <Info className="h-3.5 w-3.5 text-indigo-400" />
        Infralize AI
      </p>

      <h2 className="text-base font-bold leading-snug">{faltante.titulo}</h2>

      <span className="mt-2 inline-block rounded-full bg-indigo-600/30 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
        Cláusula Faltante
      </span>

      {faltante.motivo ? (
        <div className="mt-4 rounded-xl bg-white/5 p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
            Por que é importante?
          </p>
          <p className="text-sm leading-relaxed text-ink-200">{faltante.motivo}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-400">
          A IA identificou a ausência desta cláusula no documento analisado.
        </p>
      )}
    </div>
  );
}

function FaltanteChip({ count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-colors ${
        active ? "bg-ink-900 text-white ring-ink-900" : "bg-ink-50 text-ink-500 ring-ink-200 hover:opacity-80"
      }`}
    >
      <Info className="h-3.5 w-3.5" />
      {count} Faltante{count !== 1 ? "s" : ""}
    </button>
  );
}

