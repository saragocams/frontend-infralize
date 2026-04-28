// Camada de API. Em modo mock retorna dados estáticos com pequena latência
// simulada. Quando USE_MOCK = false, faz proxy para o FastAPI em /api/*
// (configurado no vite.config.js).

import {
  overviewKpis,
  contracts,
  distribuicaoRisco,
  atividadeRecente,
  principaisRiscos,
  contractAnalyses,
  buildGenericAnalysis,
} from "../data/mockData.js";

const USE_MOCK = true;
const API_BASE = "/api";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getOverview() {
  if (USE_MOCK) {
    await wait(150);
    return {
      kpis: overviewKpis,
      contratos_recentes: contracts.slice(0, 5),
      distribuicao_risco: distribuicaoRisco,
      atividade_recente: atividadeRecente,
      principais_riscos: principaisRiscos,
    };
  }
  const res = await fetch(`${API_BASE}/overview`);
  if (!res.ok) throw new Error("Falha ao carregar visão geral");
  return res.json();
}

export async function getContracts() {
  if (USE_MOCK) {
    await wait(120);
    return contracts;
  }
  const res = await fetch(`${API_BASE}/contracts`);
  if (!res.ok) throw new Error("Falha ao carregar contratos");
  return res.json();
}

export async function getContract(id) {
  if (USE_MOCK) {
    await wait(180);
    const meta = contracts.find((c) => c.id === id);
    const analysis = contractAnalyses[id] ?? buildGenericAnalysis(id);
    if (!meta || !analysis) throw new Error("Contrato não encontrado");
    return { meta, ...analysis };
  }
  const res = await fetch(`${API_BASE}/contracts/${id}`);
  if (!res.ok) throw new Error("Falha ao carregar contrato");
  return res.json();
}

// Liga direto no endpoint real do backend: POST /analyze-contract
// (vide main.py). Espera multipart/form-data com campo "file".
export async function analyzeContract(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/analyze-contract`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(detail.detail || "Falha na análise");
  }
  return res.json();
}
