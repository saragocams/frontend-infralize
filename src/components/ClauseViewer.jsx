import { FileText, Bookmark, AlertTriangle } from "lucide-react";
import Card from "./Card.jsx";

function highlight(text, snippet) {
  if (!snippet) return [text];
  const idx = text.toLowerCase().indexOf(snippet.toLowerCase());
  if (idx < 0) return [text];
  return [
    text.slice(0, idx),
    <mark
      key="hl"
      className="rounded-sm bg-amber-200/70 px-0.5 text-ink-900"
    >
      {text.slice(idx, idx + snippet.length)}
    </mark>,
    text.slice(idx + snippet.length),
  ];
}

export default function ClauseViewer({ nomeArquivo, risco, texto }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-600">
            <FileText className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">{nomeArquivo}</p>
            <p className="text-xs text-ink-400">{risco?.trecho_clausula ?? "Selecione uma cláusula"}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200">
          <Bookmark className="h-3 w-3" />
          Grifado
        </span>
      </div>

      <div className="px-6 py-6">
        <div className="whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
          {highlight(texto, risco?.evidencia)}
        </div>

        {risco?.por_que_importa && (
          <div className="mt-5 flex items-start gap-2 rounded-md bg-amber-50/80 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>{risco.por_que_importa}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
