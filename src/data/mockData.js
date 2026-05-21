// Mock data fiel ao protótipo. Os shapes batem com os schemas Pydantic
// definidos em contract_analysis.py do backend (ContractAnalysis, Risco, etc.).

export const overviewKpis = {
  contratos_analisados: { valor: 34, delta: "+8 este mês", positivo: true },
  exposicao_total: { valor: "R$ 4,8M", delta: "+R$ 1,2M vs fev", positivo: false },
  alto_risco: { valor: 6, delta: "contratos críticos", positivo: false },
  validados: { valor: 18, delta: "sem pendências", positivo: true },
};

export const contracts = [
  {
    id: "torre-sul",
    nome: "Empreitada_Torre_Sul.pdf",
    data: "2025-03-28",
    risco: "alto",
    score: 78,
    clausulas_criticas: 12,
    valor: "R$ 8,2M",
    valor_num: 8_200_000,
  },
  {
    id: "fundacao-bloco-a",
    nome: "Contrato_Fundação_Bloco_A.pdf",
    data: "2025-03-22",
    risco: "medio",
    score: 51,
    clausulas_criticas: 5,
    valor: "R$ 3,1M",
    valor_num: 3_100_000,
  },
  {
    id: "acabamento-piso4",
    nome: "Empreitada_Acabamento_Piso4.pdf",
    data: "2025-03-18",
    risco: "baixo",
    score: 22,
    clausulas_criticas: 2,
    valor: "R$ 890K",
    valor_num: 890_000,
  },
  {
    id: "eletrica-geral",
    nome: "Subcontrato_Elétrica_Geral.pdf",
    data: "2025-03-10",
    risco: "alto",
    score: 69,
    clausulas_criticas: 8,
    valor: "R$ 2,4M",
    valor_num: 2_400_000,
  },
  {
    id: "estrutura-metalica",
    nome: "Contrato_Estrutura_Metálica.pdf",
    data: "2025-03-04",
    risco: "medio",
    score: 44,
    clausulas_criticas: 4,
    valor: "R$ 5,7M",
    valor_num: 5_700_000,
  },
  {
    id: "hidraulica-bloco-b",
    nome: "Subcontrato_Hidráulica_BlocoB.pdf",
    data: "2025-02-27",
    risco: "baixo",
    score: 18,
    clausulas_criticas: 1,
    valor: "R$ 620K",
    valor_num: 620_000,
  },
  {
    id: "vidracaria",
    nome: "Empreitada_Vidraçaria.pdf",
    data: "2025-02-20",
    risco: "medio",
    score: 47,
    clausulas_criticas: 3,
    valor: "R$ 1,4M",
    valor_num: 1_400_000,
  },
];

export const distribuicaoRisco = {
  alto: 6,
  medio: 10,
  baixo: 18,
};

export const atividadeRecente = [
  { id: 1, tipo: "alerta", texto: "12 cláusulas críticas — Torre Sul", quando: "2h atrás" },
  { id: 2, tipo: "ok", texto: "Contrato Acabamento validado", quando: "1d atrás" },
  { id: 3, tipo: "warn", texto: "5 riscos médios — Elétrica Geral", quando: "3d atrás" },
  { id: 4, tipo: "ok", texto: "Fundação Bloco A aprovado com ressalvas", quando: "8d atrás" },
];

export const principaisRiscos = [
  {
    categoria: "custo",
    titulo: "RISCO DE CUSTO",
    descricao: "Aditivos sem teto · Torre Sul",
    valor: "R$ 780K",
  },
  {
    categoria: "juridico",
    titulo: "RISCO JURÍDICO",
    descricao: "Multa abaixo do mercado · Torre Sul",
    valor: "R$ 350K",
  },
  {
    categoria: "custo",
    titulo: "RISCO DE CUSTO",
    descricao: "Reajuste sem índice · Elétrica Geral",
    valor: "R$ 210K",
  },
];

// Detalhe de análise — espelha o shape AnalyzeContractResponse do backend.
export const contractAnalyses = {
  "torre-sul": {
    ocr_warning: { has_warning: false, message: "" },
    texto_extraido:
      "CLÁUSULA 4ª — RESPONSABILIDADE DE MATERIAIS\n\n4.1 A CONTRATADA será responsável pelo fornecimento de toda a mão-de-obra, equipamentos e insumos necessários à execução dos serviços descritos no Objeto deste Contrato, salvo previsão expressa no Anexo I.\n\n4.2 Em conformidade com o escopo definido, ficam a cargo da CONTRATADA os materiais de construção em geral, excetuando-se aqueles previstos na planilha-base. Os custos com materiais extras não previstos na planilha orçamentária inicial, bem como os acréscimos decorrentes de variação de preço dos insumos, serão de responsabilidade exclusiva da CONTRATANTE, sem limitação de valor.\n\n4.3 Os aditivos deverão ser formalizados com antecedência mínima de 5 dias úteis, mediante notificação escrita.",
    analise: {
      tipo_documento: "Contrato de Empreitada — Construção Civil",
      confianca_geral: 0.91,
      resumo:
        "Contrato de empreitada para execução da Torre Sul, com escopo amplo de fornecimento de mão-de-obra e materiais. A cláusula 4.2 transfere risco de custo significativo à CONTRATANTE sem teto financeiro.",
      score_risco: 78,
      percentil: 94,
      impacto_financeiro: { total: "R$ 1,25M", custo: "R$ 780K", juridico: "R$ 470K" },
      contagem_categorias: { custo: 4, juridico: 5, inconsistencia: 3 },
      tempo_processamento: "1m 12s",
      paginas: 47,
      riscos: [
        {
          id: "r1",
          trecho_clausula: "CLÁUSULA 4ª — RESPONSABILIDADE DE MATERIAIS",
          categoria: "Risco de Custo",
          gravidade: "alta",
          por_que_importa:
            "Contratada pode gerar aditivos ilimitados sem aprovação prévia de valor. O contrato não prevê teto para custos extras, expondo a contratante a variações imprevisíveis.",
          evidencia: "sem limitação de valor",
          pergunta_sugerida:
            "Posso negociar um cap percentual sobre a planilha-base e atrelar reajustes a um índice oficial?",
          confianca: 0.93,
        },
        {
          id: "r2",
          trecho_clausula: "CLÁUSULA 9ª — MULTAS E PENALIDADES",
          categoria: "Risco Jurídico",
          gravidade: "alta",
          por_que_importa:
            "Multa muito abaixo da prática de mercado (10% típico). Em obra de R$ 8,2M, isso representa um incentivo econômico ao atraso por parte da contratada.",
          evidencia: "limitada a 5% do valor do contrato",
          pergunta_sugerida:
            "Podemos elevar o teto da multa para 10% e adicionar gatilhos por marco de entrega?",
          confianca: 0.88,
        },
        {
          id: "r3",
          trecho_clausula: "CLÁUSULA 12ª — REAJUSTE",
          categoria: "Risco de Custo",
          gravidade: "media",
          por_que_importa:
            "Reajuste sem indexação a índice oficial abre brecha para imposição unilateral de valor pela contratada.",
          evidencia: "sem indexação a índice oficial",
          pergunta_sugerida:
            "Qual índice oficial (INCC-DI, IPCA) podemos vincular ao cálculo de reajuste anual?",
          confianca: 0.82,
        },
      ],
      informacoes_faltantes: [
        {
          titulo: "Cronograma físico-financeiro detalhado",
          motivo:
            "Contratos de empreitada devem conter cronograma físico-financeiro vinculado ao pagamento. Sem ele, a contratante perde o controle sobre o avanço da obra e fica sem base para recusar pagamentos por serviços incompletos.",
          exemplo:
            "CLÁUSULA X — CRONOGRAMA FÍSICO-FINANCEIRO\n\nX.1 A CONTRATADA deverá apresentar, em até 10 (dez) dias úteis após a assinatura deste Contrato, cronograma físico-financeiro detalhado, discriminando as etapas de execução, os marcos de medição e os valores correspondentes a cada fase da obra.\n\nX.2 O cronograma físico-financeiro, após aprovado pela CONTRATANTE, passará a integrar este Contrato como Anexo II, sendo vinculante para fins de liberação de pagamentos.\n\nX.3 Qualquer alteração no cronograma aprovado deverá ser formalmente acordada entre as partes, mediante aditivo contratual.",
        },
        {
          titulo: "Anexo I com planilha-base assinada",
          motivo:
            "A cláusula 4.2 referencia o Anexo I como limitador das responsabilidades da CONTRATADA, mas o anexo não está presente no documento. Sem a planilha-base assinada, qualquer custo extra pode ser contestado como 'não previsto'.",
          exemplo:
            "ANEXO I — PLANILHA-BASE DE MATERIAIS\n\nA presente planilha especifica os materiais de construção fornecidos pela CONTRATANTE, conforme referenciado na Cláusula 4.2 deste Contrato. Quaisquer materiais não listados neste Anexo são de responsabilidade exclusiva da CONTRATADA.\n\nOs preços unitários constantes nesta planilha servirão como referência para eventuais aditivos, sendo reajustados pelo INCC-DI acumulado no período.\n\nEste Anexo deve ser assinado por ambas as partes e rubricado em todas as páginas para ter validade contratual.",
        },
      ],
      recomendacao:
        "Negociar cap de aditivos, atrelar reajustes a índice oficial e elevar o teto da multa por atraso antes da assinatura.",
    },
  },
};

// fallback genérico para outros contratos
export function buildGenericAnalysis(contractId) {
  const c = contracts.find((x) => x.id === contractId);
  if (!c) return null;
  return {
    ocr_warning: { has_warning: false, message: "" },
    texto_extraido:
      "Análise detalhada deste contrato ainda não disponível neste mock. Faça upload do PDF para gerar a análise via /analyze-contract.",
    analise: {
      tipo_documento: "Contrato de Construção Civil",
      confianca_geral: 0.7,
      resumo: `Análise simulada para ${c.nome}. Score ${c.score}/100, ${c.clausulas_criticas} cláusulas críticas detectadas.`,
      score_risco: c.score,
      percentil: 50,
      impacto_financeiro: { total: c.valor, custo: c.valor, juridico: "—" },
      contagem_categorias: { custo: 2, juridico: 1, inconsistencia: 1 },
      tempo_processamento: "—",
      paginas: 0,
      riscos: [],
      informacoes_faltantes: [],
      recomendacao: "Faça upload do PDF para análise completa.",
    },
  };
}
