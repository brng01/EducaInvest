import type { Level } from "../components/aprender/LevelFilter";
import type { Category } from "../components/aprender/CategoryFilter";

export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacao: string;
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
}

export const listaCompletaTermos: Termo[] = [
  // --- NÍVEL INICIANTE ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacao: "É a taxa mãe da economia. Define quanto rende a renda fixa e quanto custa pegar empréstimo.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacao: "Você empresta dinheiro para o banco e ele te devolve com juros. Garantido pelo FGC.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 3,
    sigla: "Liquidez",
    nome: "Facilidade de Resgate",
    explicacao: "Velocidade para transformar investimento em dinheiro na mão. Liquidez diária cai na hora.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 4,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacao: "Imposto cobrado se você sacar o dinheiro em menos de 30 dias. Começa alto e zera no 30º dia.",
    nivelId: "iniciante",
    categoria: "taxas"
  },
  
  // --- NÍVEL INTERMEDIÁRIO ---
  {
    id: 5,
    sigla: "LCI/LCA",
    nome: "Letras de Crédito",
    explicacao: "Empréstimo para setor imobiliário ou agro. Isento de Imposto de Renda para pessoa física.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "IPCA",
    nome: "Inflação Oficial",
    explicacao: "Mede o aumento de preços. Seu investimento precisa render mais que o IPCA para ter ganho real.",
    nivelId: "intermediario",
    categoria: "indicadores"
  },
  {
    id: 7,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacao: "Você compra pedacinhos de imóveis e recebe aluguéis mensais isentos de IR.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 8,
    sigla: "Come-Cotas",
    nome: "Antecipação de IR",
    explicacao: "O governo recolhe IR de alguns fundos automaticamente a cada 6 meses (maio e novembro).",
    nivelId: "intermediario",
    categoria: "taxas"
  },

  // --- NÍVEL EXPERIENTE ---
  {
    id: 9,
    sigla: "Ações",
    nome: "Papéis de Empresas",
    explicacao: "Você vira sócio da empresa. Ganha com a valorização ou dividendos (lucro distribuído).",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 10,
    sigla: "Derivativos",
    nome: "Opções e Futuros",
    explicacao: "Contratos baseados no preço futuro de um ativo. Usados para proteção ou alavancagem.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 11,
    sigla: "Volatilidade",
    nome: "Oscilação de Preço",
    explicacao: "Intensidade do sobe e desce. Alta volatilidade = Alto risco e chance de alto retorno.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 12,
    sigla: "Taxa de Performance",
    nome: "Prêmio do Gestor",
    explicacao: "Taxa extra cobrada por fundos quando eles rendem muito acima do esperado (benchmark).",
    nivelId: "experiente",
    categoria: "taxas"
  }
];
