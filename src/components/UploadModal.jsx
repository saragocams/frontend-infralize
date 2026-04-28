import { useEffect, useRef, useState } from "react";
import { UploadCloud, X, Loader2, FileText } from "lucide-react";
import { analyzeContract } from "../api/contracts.js";

export default function UploadModal({ open, onClose, onAnalyzed }) {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setSubmitting(false);
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  function pick(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  async function submit() {
    if (!file) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await analyzeContract(file);
      onAnalyzed?.(result);
      onClose?.();
    } catch (err) {
      setError(err.message || "Falha na análise. Verifique se o backend está rodando em localhost:8000.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="text-base font-semibold text-ink-900">Novo upload de contrato</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          <label
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            htmlFor="file-input"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-10 text-center hover:border-brand-300 hover:bg-brand-50/40"
          >
            {file ? (
              <>
                <FileText className="h-8 w-8 text-brand-600" />
                <p className="text-sm font-semibold text-ink-800">{file.name}</p>
                <p className="text-xs text-ink-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="mt-2 text-xs font-medium text-brand-600 hover:underline"
                >
                  trocar arquivo
                </button>
              </>
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-ink-400" />
                <p className="text-sm font-semibold text-ink-700">
                  Arraste o PDF ou clique para selecionar
                </p>
                <p className="text-xs text-ink-400">PDF até 20 MB</p>
              </>
            )}
            <input
              ref={inputRef}
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={pick}
              className="hidden"
            />
          </label>

          {error ? (
            <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-rose-200">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-ink-100 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!file || submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analisando…
              </>
            ) : (
              "Analisar contrato"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
