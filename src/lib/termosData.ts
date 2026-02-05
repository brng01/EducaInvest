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
  // =================================================================
  // NÍVEL: INICIANTE
  // =================================================================
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacao: "É a 'Taxa Mãe'. Ela manda no dinheiro do país. Se ela sobe, os investimentos de Renda Fixa rendem mais, mas pegar empréstimo fica mais caro.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacao: "É a meta que seu dinheiro tem que bater. Se um investimento paga '100% do CDI', ele está pagando o justo. Menos que isso, desconfie.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacao: "É o vilão invisível que faz o seu dinheiro valer menos. Se seu investimento render MENOS que o IPCA, você, na prática, perdeu poder de compra.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacao: "Você vira o banqueiro. Em vez de pedir dinheiro emprestado para o banco, VOCÊ empresta para o banco. Ele usa seu dinheiro e te devolve com juros.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacao: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo. Ideal para sua Reserva de Emergência pois não tem risco de perder valor se sacar antes.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacao: "O investimento mais famoso e, infelizmente, um dos piores. Perde para a inflação com frequência e só rende no dia do 'aniversário'.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacao: "O imposto dos apressadinhos. Ele só existe se você colocar o dinheiro hoje e tirar daqui a menos de um mês. Depois de 30 dias, ele some.",
    nivelId: "iniciante",
    categoria: "taxas"
  },
  {
    id: 8,
    sigla: "RE",
    nome: "Reserva de Emergência",
    explicacao: "O 'colchão de segurança'. Dinheiro para quando o carro quebra, o dente dói ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacao: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacao: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro que investiu E sobre o dinheiro que o investimento já rendeu.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },

  // =================================================================
  // NÍVEL: INTERMEDIÁRIO
  // =================================================================
  {
    id: 11,
    sigla: "LCI / LCA",
    nome: "Letras de Crédito (Imob./Agro)",
    explicacao: "As primas ricas do CDB. O dinheiro vai para financiar casas ou plantações. O melhor: o governo não cobra Imposto de Renda sobre o seu lucro.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacao: "Você empresta dinheiro para empresas fazerem obras. Paga mais que o banco, mas se a empresa quebrar, o risco é seu.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacao: "Garante que você sempre vai ganhar acima da inflação. Ótimo para aposentadoria. Mas cuidado: se vender antes da data final, pode perder dinheiro.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacao: "Como ser dono de shopping sem ter dor de cabeça com inquilino. Você compra 'pedacinhos' (cotas) e recebe aluguel na sua conta todo mês.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacao: "Uma 'cesta básica' de ações. Em vez de escolher qual fruta comprar, você compra a cesta inteira. É o jeito mais fácil de investir na bolsa.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de Imposto de Renda",
    explicacao: "O governo não espera você sacar o dinheiro. Duas vezes por ano (maio e novembro), ele vai lá no seu fundo e pega a parte dele do lucro.",
    nivelId: "intermediario",
    categoria: "taxas"
  },
  {
    id: 17,
    sigla: "Taxa de Adm",
    nome: "Taxa de Administração",
    explicacao: "O salário do gestor do fundo. É cobrado todo ano sobre o valor TOTAL que você tem lá, ganhando ou perdendo dinheiro.",
    nivelId: "intermediario",
    categoria: "taxas"
  },
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacao: "A 'Inflação do Aluguel'. É outro termômetro de preços, mas que costuma subir muito mais rápido que o IPCA quando o Dólar sobe.",
    nivelId: "intermediario",
    categoria: "indicadores"
  },

  // =================================================================
  // NÍVEL: EXPERIENTE
  // =================================================================
  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias e Preferenciais",
    explicacao: "Você vira sócio da empresa. Se ela lucrar, você recebe parte do lucro (dividendos). Se ela valorizar, você ganha vendendo mais caro. Se ela falir, você perde.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacao: "O jeito de investir no exterior sem tirar o dinheiro do Brasil. Você compra um recibo aqui que vale por uma ação lá fora.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Mercado de Opções e Futuros",
    explicacao: "Apostas sobre o futuro. Você não compra a coisa em si, mas faz um contrato sobre o preço dela numa data futura.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacao: "As empresas 'adolescentes'. Elas são menores e têm chance de crescer muito (e te deixar rico), mas também têm mais chance de dar errado.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacao: "A intensidade do sobe-e-desce. Alta volatilidade assusta o iniciante (risco), mas gera oportunidade de lucro rápido para o profissional.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacao: "Investir 'fiado'. Você usa mais dinheiro do que tem na conta para tentar ganhar mais. Se der certo, lucro turbinado. Se der errado, você pode ficar devendo.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Cambial/Financeira",
    explicacao: "O seguro do investidor. É uma aposta contrária ao seu investimento principal para que, se tudo der errado, você não perca tudo.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacao: "Comprar de manhã e vender à tarde. É a modalidade mais difícil e arriscada da bolsa. Exige tela ligada o dia todo e sangue frio.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacao: "Um prêmio pela competência. Se o gestor fizer seu dinheiro render MUITO mais que o combinado, ele fica com um pedacinho desse lucro extra.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacao: "A taxa de uso da Bolsa. Toda vez que você compra ou vende uma ação, a Bolsa cobra uns centavos ou reais pelo serviço de registrar aquilo.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacao: "A diferença entre o preço de compra e venda. Se o spread é alto, você já começa perdendo dinheiro assim que compra.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacao: "O freio de mão de emergência. Quando o mercado entra em pânico e cai demais (10%), a bolsa 'puxa a tomada' por 30 minutos para todos se acalmarem.",
    nivelId: "experiente",
    categoria: "conceitos"
  }
];
