import { jsPDF } from "jspdf";

const GRAVIDADE_LABEL = { alta: "GRAVE", media: "MÉDIA", baixa: "BAIXO" };
const GRAVIDADE_COLOR = {
  alta:  [220, 38,  38],
  media: [217, 119, 6],
  baixa: [5,   150, 105],
};
const BRAND = [37, 99, 235];
const INK   = [20, 22,  28];

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function checkPage(doc, y, needed = 20) {
  if (y + needed > doc.internal.pageSize.getHeight() - 15) {
    doc.addPage();
    return 20;
  }
  return y;
}

export function exportAnalysisPdf({ fileName, analise }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentW = W - margin * 2;
  let y = 0;

  // ── Cabeçalho ──────────────────────────────────────────────
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, W, 28, "F");

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("INFRALIZE", margin, 11);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Análise de Risco Contratual", margin, 16);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  const nameLines = doc.splitTextToSize(fileName ?? "Contrato", contentW - 30);
  doc.text(nameLines, margin, 24);
  y = 38;

  // ── Tipo + confiança ───────────────────────────────────────
  doc.setFontSize(8);
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "normal");
  doc.text(`Tipo: ${analise.tipo_documento ?? "—"}`, margin, y);
  const conf = analise.confianca_geral != null
    ? `Confiança geral: ${Math.round(analise.confianca_geral * 100)}%`
    : "";
  if (conf) doc.text(conf, W - margin, y, { align: "right" });
  y += 8;

  // ── Resumo ─────────────────────────────────────────────────
  doc.setFillColor(243, 244, 246);
  const resumoLines = doc.splitTextToSize(analise.resumo ?? "", contentW - 6);
  const resumoH = resumoLines.length * 5 + 8;
  doc.roundedRect(margin, y, contentW, resumoH, 2, 2, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND);
  doc.text("RESUMO", margin + 3, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...INK);
  doc.text(resumoLines, margin + 3, y + 10);
  y += resumoH + 8;

  // ── Riscos ─────────────────────────────────────────────────
  const riscos = analise.riscos ?? [];
  if (riscos.length > 0) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text(`Riscos Identificados (${riscos.length})`, margin, y);
    y += 6;

    riscos.forEach((r, i) => {
      const color = GRAVIDADE_COLOR[r.gravidade] ?? GRAVIDADE_COLOR.baixa;
      const label = GRAVIDADE_LABEL[r.gravidade] ?? r.gravidade?.toUpperCase() ?? "—";

      // estimativa de altura do card
      const trechoLines = doc.splitTextToSize(r.trecho_clausula ?? "", contentW - 30);
      const importaLines = doc.splitTextToSize(r.por_que_importa ?? "", contentW - 6);
      const perguntaLines = doc.splitTextToSize(r.pergunta_sugerida ?? "", contentW - 6);
      const cardH = trechoLines.length * 5 + importaLines.length * 4.5 + perguntaLines.length * 4.5 + 26;

      y = checkPage(doc, y, cardH);

      // borda lateral colorida
      doc.setFillColor(...color);
      doc.rect(margin, y, 2.5, cardH, "F");

      // fundo do card
      doc.setFillColor(250, 250, 252);
      doc.rect(margin + 2.5, y, contentW - 2.5, cardH, "F");

      // número + título
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...color);
      doc.text(`${i + 1}. [${label}] ${r.categoria ?? ""}`, margin + 5, y + 5);

      doc.setFontSize(8.5);
      doc.setTextColor(...INK);
      doc.text(trechoLines, margin + 5, y + 10);
      let inner = y + 10 + trechoLines.length * 5 + 2;

      // por que importa
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 60, 60);
      doc.text("Problema:", margin + 5, inner);
      inner += 4.5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(importaLines, margin + 5, inner);
      inner += importaLines.length * 4.5 + 2;

      // pergunta sugerida
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Pergunta sugerida:", margin + 5, inner);
      inner += 4.5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(perguntaLines, margin + 5, inner);

      y += cardH + 4;
    });
  }

  // ── Cláusulas faltantes ────────────────────────────────────
  const faltantes = analise.informacoes_faltantes ?? [];
  if (faltantes.length > 0) {
    y = checkPage(doc, y, 20);
    y += 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text(`Cláusulas Faltantes (${faltantes.length})`, margin, y);
    y += 6;

    faltantes.forEach((item, i) => {
      const titulo = typeof item === "string" ? item : item.titulo ?? String(item);
      const motivo = typeof item === "object" ? item.motivo : null;
      const tituloLines = doc.splitTextToSize(`${i + 1}. ${titulo}`, contentW - 6);
      const motivoLines = motivo ? doc.splitTextToSize(motivo, contentW - 10) : [];
      const itemH = tituloLines.length * 5 + motivoLines.length * 4.5 + 8;

      y = checkPage(doc, y, itemH);

      doc.setFillColor(238, 242, 255);
      doc.roundedRect(margin, y, contentW, itemH, 2, 2, "F");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...INK);
      doc.text(tituloLines, margin + 3, y + 5);
      let inner = y + 5 + tituloLines.length * 5;

      if (motivoLines.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(80, 80, 80);
        doc.text(motivoLines, margin + 5, inner);
      }

      y += itemH + 3;
    });
  }

  // ── Recomendação geral ─────────────────────────────────────
  if (analise.recomendacao) {
    y = checkPage(doc, y, 20);
    y += 4;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text("Recomendação Geral", margin, y);
    y += 5;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    y = wrapText(doc, analise.recomendacao, margin, y, contentW, 5);
  }

  // ── Rodapé em todas as páginas ─────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.setFont("helvetica", "normal");
    const now = new Date().toLocaleDateString("pt-BR");
    doc.text(`Infralize · Gerado em ${now} · Esta análise não substitui consulta jurídica.`, margin, doc.internal.pageSize.getHeight() - 6);
    doc.text(`${p} / ${pageCount}`, W - margin, doc.internal.pageSize.getHeight() - 6, { align: "right" });
  }

  const safeName = (fileName ?? "contrato").replace(/[^a-z0-9_-]/gi, "_");
  doc.save(`Infralize_${safeName}.pdf`);
}
