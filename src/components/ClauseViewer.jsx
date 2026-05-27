import { useEffect, useRef } from "react";
import { FileText, Bookmark, AlertTriangle } from "lucide-react";
import Card from "./Card.jsx";

function findMatch(text, snippet) {
  // 1) exact match
  const exact = text.toLowerCase().indexOf(snippet.toLowerCase());
  if (exact >= 0) return { start: exact, end: exact + snippet.length };

  // 2) word-by-word match: tolerates whitespace/newline differences between words
  const words = snippet.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;

  const lower = text.toLowerCase();
  let from = 0;

  while (from <= lower.length - words[0].length) {
    const start = lower.indexOf(words[0], from);
    if (start < 0) break;

    let pos = start + words[0].length;
    let ok = true;

    for (let i = 1; i < words.length; i++) {
      while (pos < lower.length && /\s/.test(lower[pos])) pos++;
      if (lower.startsWith(words[i], pos)) {
        pos += words[i].length;
      } else {
        ok = false;
        break;
      }
    }

    if (ok) return { start, end: pos };
    from = start + 1;
  }

  return null;
}

function highlight(text, snippet, markRef) {
  if (!snippet) return [text];
  const match = findMatch(text, snippet);
  if (!match) return [text];
  return [
    text.slice(0, match.start),
    <mark
      key="hl"
      ref={markRef}
      className="rounded-sm bg-amber-200/70 px-0.5 text-ink-900"
    >
      {text.slice(match.start, match.end)}
    </mark>,
    text.slice(match.end),
  ];
}

export default function ClauseViewer({ nomeArquivo, risco, texto }) {
  const markRef = useRef(null);

  useEffect(() => {
    if (markRef.current) {
      markRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [risco]);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-600">
            <FileText className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">{nomeArquivo}</p>
            <p className="text-xs text-ink-400">{risco?.trecho_clausula ?? "Texto extraído do contrato"}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200">
          <Bookmark className="h-3 w-3" />
          Grifado
        </span>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
        <div className="whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
          {highlight(texto, risco?.evidencia, markRef)}
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
