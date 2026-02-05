import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string; // Definição técnica
  explicacaoSimplificada: string; // O "trocando em miúdos"
  exemplo: string; // Analogia do dia a dia
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
}

export const listaCompletaTermos: Termo[] = [
  // =================================================================
  // NÍVEL: INICIANTE (O Básico do Básico)
  // =================================================================
  
  // --- Indicadores ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias. Ela serve de referência para todas as outras taxas de juros do mercado.",
    explicacaoSimplificada: "É a 'Taxa Mãe'. Ela manda no dinheiro do país. Se ela sobe, os investimentos de Renda Fixa rendem mais, mas pegar empréstimo fica mais caro.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe (Selic alta), quem tem imóvel (dinheiro) ganha mais, e quem precisa alugar (pegar empréstimo) paga mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si por um prazo de um dia. É o principal benchmark (meta) da Renda Fixa.",
    explicacaoSimplificada: "É a meta que seu dinheiro tem que bater. Se um investimento paga '100% do CDI', ele está pagando o justo. Menos que isso, desconfie, é pouco.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se o seu carro (investimento) está a 50% do CDI, você está andando na metade da velocidade dos outros. Você quer estar sempre a 100% ou mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos e serviços consumidos pelas famílias.",
    explicacaoSimplificada: "É o vilão invisível que faz o seu dinheiro valer menos. Se seu investimento render MENOS que o IPCA, você, na prática, perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho do mercado com R$ 100, e a inflação for 10%, ano que vem você vai precisar de R$ 110 para comprar as MESMAS coisas. Se você guardou os R$ 100 no colchão, saiu no prejuízo.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },

  // --- Renda Fixa ---
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos. Em troca, o banco devolve o valor corrigido por uma taxa de juros.",
    explicacaoSimplificada: "Você vira o banqueiro. Em vez de pedir dinheiro emprestado para o banco, VOCÊ empresta para o banco. Ele usa seu dinheiro e te devolve com juros.",
    exemplo: "Igual quando você empresta dinheiro para um amigo e combina: 'Me devolve mês que vem com 10 reais a mais?'. Só que o amigo é o Banco e é garantido.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic. Possui liquidez diária e o menor risco de crédito do mercado.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo. Ideal para sua Reserva de Emergência pois não tem risco de perder valor se sacar antes.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil e você pode sacar quando quiser sem medo de perder dinheiro.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei. Rende 70% da Selic + TR quando a Selic está baixa.",
    explicacaoSimplificada: "O investimento mais famoso e, infelizmente, um dos piores. Perde para a inflação com frequência e só rende no dia do 'aniversário'.",
    exemplo: "Se você colocar dinheiro na poupança dia 5, e sacar dia 4 do mês seguinte, você ganha ZERO de juros. No Tesouro Selic, você ganharia proporcional a todos esses dias.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },

  // --- Taxas ---
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que incide sobre operações de crédito, câmbio e seguros. Nos investimentos, incide sobre resgates inferiores a 30 dias.",
    explicacaoSimplificada: "O imposto dos apressadinhos. Ele só existe se você colocar o dinheiro hoje e tirar daqui a menos de um mês. Depois de 30 dias, ele some.",
    exemplo: "Colocou R$ 1.000 hoje e tirou amanhã? O governo morde quase todo o seu lucro. Deixou 30 dias? O governo não morde nada de IOF.",
    nivelId: "iniciante",
    categoria: "taxas"
  },

  // --- Conceitos ---
  {
    id: 8,
    sigla: "RE",
    nome: "Reserva de Emergência",
    explicacaoCompleta: "Montante financeiro acumulado para cobrir despesas imprevistas, equivalente a 6 a 12 meses do custo de vida mensal.",
    explicacaoSimplificada: "O 'colchão de segurança'. Dinheiro para quando o carro quebra, o dente dói ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    exemplo: "Se você gasta R$ 2.000 por mês, sua reserva deve ser de pelo menos R$ 12.000 guardados num lugar seguro que você saca na hora.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacaoCompleta: "Capacidade de converter um ativo em dinheiro corrente sem perda significativa de valor.",
    explicacaoSimplificada: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    exemplo: "Dinheiro na conta corrente é como água (líquido, flui na hora). Uma casa é como gelo (é água/dinheiro, mas demora para derreter/vender e virar dinheiro na mão).",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacaoCompleta: "Regime de juros onde os juros de cada período são somados ao capital para o cálculo de novos juros nos períodos seguintes.",
    explicacaoSimplificada: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro que investiu E sobre o dinheiro que o investimento já rendeu.",
    exemplo: "Mês 1: Ganhou R$ 10. Mês 2: Você ganha juros sobre o seu dinheiro original + juros sobre os R$ 10 que ganhou. No longo prazo, vira uma explosão.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },

  // =================================================================
  // NÍVEL: INTERMEDIÁRIO
  // =================================================================

  // --- Renda Fixa ---
  {
    id: 11,
    sigla: "LCI / LCA",
    nome: "Letras de Crédito (Imob./Agro)",
    explicacaoCompleta: "Títulos emitidos por bancos para financiar os setores imobiliário e agrícola. São isentos de Imposto de Renda para pessoa física.",
    explicacaoSimplificada: "As primas ricas do CDB. O dinheiro vai para financiar casas ou plantações. O melhor: o governo não cobra Imposto de Renda sobre o seu lucro.",
    exemplo: "Um CDB que paga 12% ao ano pode render menos dinheiro no seu bolso que uma LCI que paga 10% ao ano, porque no CDB o Leão morde uma parte, na LCI é tudo seu.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacaoCompleta: "Títulos de dívida emitidos por empresas (S.A.) para financiar projetos ou pagar dívidas. Não contam com a garantia do FGC.",
    explicacaoSimplificada: "Você empresta dinheiro para empresas (como a Vale, Petrobras ou a concessionária da rodovia) fazerem obras. Paga mais que o banco, mas se a empresa quebrar, o risco é seu.",
    exemplo: "É como emprestar dinheiro para o dono da padaria reformar a loja. Ele promete te pagar bem, mas se a padaria falir, não tem o banco para garantir.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacaoCompleta: "Título público que paga uma taxa fixa mais a variação da inflação (IPCA). Garante a manutenção do poder de compra no longo prazo.",
    explicacaoSimplificada: "Garante que você sempre vai ganhar acima da inflação. Ótimo para aposentadoria. Mas cuidado: se vender antes da data final, pode perder dinheiro.",
    exemplo: "É o investimento 'blidadado'. Não importa se o preço do arroz triplicar daqui a 10 anos, esse título vai render o aumento do arroz + um lucro extra.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },

  // --- Renda Variável ---
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacaoCompleta: "Fundos de investimento destinados à aplicação em empreendimentos imobiliários. Distribuem rendimentos mensais isentos de IR.",
    explicacaoSimplificada: "Como ser dono de shopping sem ter dor de cabeça com inquilino. Você compra 'pedacinhos' (cotas) e recebe aluguel na sua conta todo mês.",
    exemplo: "Com R$ 10,00 você compra uma cota de um fundo que é dono de 10 prédios comerciais em SP. Todo mês, uma parte do aluguel desses prédios cai na sua conta.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacaoCompleta: "Fundos de investimento que têm como referência um índice de mercado e cujas cotas são negociadas na bolsa de valores.",
    explicacaoSimplificada: "Uma 'cesta básica' de ações. Em vez de escolher qual fruta comprar, você compra a cesta inteira. É o jeito mais fácil de investir na bolsa.",
    exemplo: "Ao comprar 1 cota do ETF 'BOVA11', você está comprando automaticamente um pedacinho da Petrobras, Vale, Itaú, Bradesco e Ambev de uma vez só.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },

  // --- Taxas ---
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de Imposto de Renda",
    explicacaoCompleta: "Recolhimento semestral automático de IR que incide sobre fundos de investimento (Renda Fixa, Cambial e Multimercado).",
    explicacaoSimplificada: "O governo não espera você sacar o dinheiro. Duas vezes por ano (maio e novembro), ele vai lá no seu fundo e pega a parte dele do lucro.",
    exemplo: "É como se você tivesse uma plantação e o governo viesse pegar algumas sacas de milho a cada 6 meses, em vez de esperar você colher tudo no final.",
    nivelId: "intermediario",
    categoria: "taxas"
  },
  {
    id: 17,
    sigla: "Taxa de Adm",
    nome: "Taxa de Administração",
    explicacaoCompleta: "Percentual cobrado anualmente pelos gestores de fundos para remunerar a prestação de serviço de gestão e administração.",
    explicacaoSimplificada: "O salário do gestor do fundo. É cobrado todo ano sobre o valor TOTAL que você tem lá, ganhando ou perdendo dinheiro.",
    exemplo: "Se a taxa é 2% e você tem R$ 100,00 investidos, R$ 2,00 vão para o banco todo ano, mesmo se o fundo render zero.",
    nivelId: "intermediario",
    categoria: "taxas"
  },

  // --- Indicadores ---
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacaoCompleta: "Índice de inflação calculado pela FGV, muito sensível ao dólar e preços no atacado. Usado para reajuste de aluguéis.",
    explicacaoSimplificada: "A 'Inflação do Aluguel'. É outro termômetro de preços, mas que costuma subir muito mais rápido que o IPCA quando o Dólar sobe.",
    exemplo: "Se o IGP-M dispara, prepare o bolso: a conta de luz e o boleto do aluguel da casa provavelmente vão aumentar bastante no aniversário do contrato.",
    nivelId: "intermediario",
    categoria: "indicadores"
  },

  // =================================================================
  // NÍVEL: EXPERIENTE
  // =================================================================

  // --- Renda Variável ---
  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias e Preferenciais",
    explicacaoCompleta: "Valores mobiliários representativos de unidade do capital social de uma sociedade anônima.",
    explicacaoSimplificada: "Você vira sócio da empresa. Se ela lucrar, você recebe parte do lucro (dividendos). Se ela valorizar, você ganha vendendo mais caro. Se ela falir, você perde.",
    exemplo: "Ter uma ação da Apple é ser dono de um pedacinho microscópico da empresa. Você não apita na reunião, mas tem direito aos lucros dela.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacaoCompleta: "Certificados de depósito emitidos no Brasil que representam valores mobiliários de emissão de companhias abertas sediadas no exterior.",
    explicacaoSimplificada: "O jeito de investir no exterior sem tirar o dinheiro do Brasil. Você compra um recibo aqui que vale por uma ação lá fora.",
    exemplo: "Você usa seus Reais na bolsa brasileira para comprar BDRs da Disney ou Coca-Cola. Se o dólar subir ou a empresa crescer, você ganha.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Mercado de Opções e Futuros",
    explicacaoCompleta: "Instrumentos financeiros cujo valor deriva do preço de outro ativo (o ativo-objeto). Usados para hedge (proteção) ou especulação.",
    explicacaoSimplificada: "Apostas sobre o futuro. Você não compra a coisa em si, mas faz um contrato sobre o preço dela numa data futura.",
    exemplo: "Um fazendeiro vende 'Milho Futuro' para garantir o preço da saca daqui a 6 meses (proteção). Um especulador compra achando que o preço vai explodir (aposta).",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacaoCompleta: "Ações de empresas com menor valor de mercado, geralmente com maior potencial de crescimento e maior volatilidade.",
    explicacaoSimplificada: "As empresas 'adolescentes'. Elas são menores e têm chance de crescer muito (e te deixar rico), mas também têm mais chance de dar errado.",
    exemplo: "Enquanto a Petrobras é um navio transatlântico (seguro, mas lento), uma Small Cap é uma lancha (rápida, mas balança muito com qualquer onda).",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },

  // --- Conceitos Avançados ---
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacaoCompleta: "Medida estatística da dispersão dos retornos de um título ou índice de mercado. Representa o risco de oscilação.",
    explicacaoSimplificada: "A intensidade do sobe-e-desce. Alta volatilidade assusta o iniciante (risco), mas gera oportunidade de lucro rápido para o profissional.",
    exemplo: "A Poupança é uma estrada reta e plana (baixa volatilidade). O Bitcoin é uma montanha-russa insana (altíssima volatilidade).",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacaoCompleta: "Estratégia de usar capital de terceiros (empréstimo da corretora) para tentar aumentar o retorno de um investimento.",
    explicacaoSimplificada: "Investir 'fiado'. Você usa mais dinheiro do que tem na conta para tentar ganhar mais. Se der certo, lucro turbinado. Se der errado, você pode ficar devendo.",
    exemplo: "Você tem R$ 1.000, mas opera como se tivesse R$ 10.000. Se a ação subir 1%, você ganha 10%. Se cair 1%, você perde 10%. Perigoso.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Cambial/Financeira",
    explicacaoCompleta: "Operação financeira que visa reduzir ou eliminar o risco de variações indesejadas de preços.",
    explicacaoSimplificada: "O seguro do investidor. É uma aposta contrária ao seu investimento principal para que, se tudo der errado, você não perca tudo.",
    exemplo: "Você tem ações brasileiras (que caem se o dólar subir). Para se proteger, você compra um pouco de Dólar. Se a bolsa cair, o Dólar sobe e compensa sua perda.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacaoCompleta: "Estratégia de compra e venda do mesmo ativo no mesmo dia, buscando lucrar com as oscilações de curto prazo.",
    explicacaoSimplificada: "Comprar de manhã e vender à tarde. É a modalidade mais difícil e arriscada da bolsa. Exige tela ligada o dia todo e sangue frio.",
    exemplo: "É como comprar um carro de manhã por R$ 20.000 achando que vai conseguir vender ele por R$ 20.200 antes do almoço. O lucro é pequeno, mas feito várias vezes.",
    nivelId: "experiente",
    categoria: "conceitos"
  },

  // --- Taxas ---
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacaoCompleta: "Taxa cobrada pelo gestor do fundo sobre a parcela da rentabilidade que exceder o índice de referência (benchmark).",
    explicacaoSimplificada: "Um prêmio pela competência. Se o gestor fizer seu dinheiro render MUITO mais que o combinado, ele fica com um pedacinho desse lucro extra.",
    exemplo: "O combinado era render 10%. O gestor fez render 15%. Sobre esses 5% 'extras', ele cobra uma taxa de sucesso.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacaoCompleta: "Taxas cobradas pela B3 (Bolsa) e pela CBLC (Companhia Brasileira de Liquidação e Custódia) sobre operações de compra e venda.",
    explicacaoSimplificada: "A taxa de uso da Bolsa. Toda vez que você compra ou vende uma ação, a Bolsa cobra uns centavos ou reais pelo serviço de registrar aquilo.",
    exemplo: "É como o pedágio. Para usar a estrada da Bolsa de Valores e negociar suas ações, você paga uma taxinha a cada passagem (operação).",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacaoCompleta: "A diferença entre o preço que o mercado está pedindo para vender (Ask) e o preço que está oferecendo para comprar (Bid) um ativo.",
    explicacaoSimplificada: "A diferença entre o preço de compra e venda. Se o spread é alto, você já começa perdendo dinheiro assim que compra.",
    exemplo: "No câmbio turismo: Você compra Dólar a R$ 5,50, mas se quiser vender no mesmo segundo, a casa de câmbio só paga R$ 5,00. Esses R$ 0,50 são o spread.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacaoCompleta: "Mecanismo de segurança que interrompe o pregão da bolsa quando há quedas bruscas nos preços (10%, 15% e 20%).",
    explicacaoSimplificada: "O freio de mão de emergência. Quando o mercado entra em pânico e cai demais (10%), a bolsa 'puxa a tomada' por 30 minutos para todos beberem água e se acalmarem.",
    exemplo: "Imagine um estádio pegando fogo e todo mundo correndo para a porta. O Circuit Breaker fecha a porta por 30min para organizar a saída e evitar pisoteamento.",
    nivelId: "experiente",
    categoria: "conceitos"
  }
];import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string; // Definição técnica
  explicacaoSimplificada: string; // O "trocando em miúdos"
  exemplo: string; // Analogia do dia a dia
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
}

export const listaCompletaTermos: Termo[] = [
  // =================================================================
  // NÍVEL: INICIANTE (O Básico do Básico)
  // =================================================================
  
  // --- Indicadores ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias. Ela serve de referência para todas as outras taxas de juros do mercado.",
    explicacaoSimplificada: "É a 'Taxa Mãe'. Ela manda no dinheiro do país. Se ela sobe, os investimentos de Renda Fixa rendem mais, mas pegar empréstimo fica mais caro.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe (Selic alta), quem tem imóvel (dinheiro) ganha mais, e quem precisa alugar (pegar empréstimo) paga mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si por um prazo de um dia. É o principal benchmark (meta) da Renda Fixa.",
    explicacaoSimplificada: "É a meta que seu dinheiro tem que bater. Se um investimento paga '100% do CDI', ele está pagando o justo. Menos que isso, desconfie, é pouco.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se o seu carro (investimento) está a 50% do CDI, você está andando na metade da velocidade dos outros. Você quer estar sempre a 100% ou mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos e serviços consumidos pelas famílias.",
    explicacaoSimplificada: "É o vilão invisível que faz o seu dinheiro valer menos. Se seu investimento render MENOS que o IPCA, você, na prática, perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho do mercado com R$ 100, e a inflação for 10%, ano que vem você vai precisar de R$ 110 para comprar as MESMAS coisas. Se você guardou os R$ 100 no colchão, saiu no prejuízo.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },

  // --- Renda Fixa ---
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos. Em troca, o banco devolve o valor corrigido por uma taxa de juros.",
    explicacaoSimplificada: "Você vira o banqueiro. Em vez de pedir dinheiro emprestado para o banco, VOCÊ empresta para o banco. Ele usa seu dinheiro e te devolve com juros.",
    exemplo: "Igual quando você empresta dinheiro para um amigo e combina: 'Me devolve mês que vem com 10 reais a mais?'. Só que o amigo é o Banco e é garantido.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic. Possui liquidez diária e o menor risco de crédito do mercado.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo. Ideal para sua Reserva de Emergência pois não tem risco de perder valor se sacar antes.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil e você pode sacar quando quiser sem medo de perder dinheiro.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei. Rende 70% da Selic + TR quando a Selic está baixa.",
    explicacaoSimplificada: "O investimento mais famoso e, infelizmente, um dos piores. Perde para a inflação com frequência e só rende no dia do 'aniversário'.",
    exemplo: "Se você colocar dinheiro na poupança dia 5, e sacar dia 4 do mês seguinte, você ganha ZERO de juros. No Tesouro Selic, você ganharia proporcional a todos esses dias.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },

  // --- Taxas ---
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que incide sobre operações de crédito, câmbio e seguros. Nos investimentos, incide sobre resgates inferiores a 30 dias.",
    explicacaoSimplificada: "O imposto dos apressadinhos. Ele só existe se você colocar o dinheiro hoje e tirar daqui a menos de um mês. Depois de 30 dias, ele some.",
    exemplo: "Colocou R$ 1.000 hoje e tirou amanhã? O governo morde quase todo o seu lucro. Deixou 30 dias? O governo não morde nada de IOF.",
    nivelId: "iniciante",
    categoria: "taxas"
  },

  // --- Conceitos ---
  {
    id: 8,
    sigla: "RE",
    nome: "Reserva de Emergência",
    explicacaoCompleta: "Montante financeiro acumulado para cobrir despesas imprevistas, equivalente a 6 a 12 meses do custo de vida mensal.",
    explicacaoSimplificada: "O 'colchão de segurança'. Dinheiro para quando o carro quebra, o dente dói ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    exemplo: "Se você gasta R$ 2.000 por mês, sua reserva deve ser de pelo menos R$ 12.000 guardados num lugar seguro que você saca na hora.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacaoCompleta: "Capacidade de converter um ativo em dinheiro corrente sem perda significativa de valor.",
    explicacaoSimplificada: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    exemplo: "Dinheiro na conta corrente é como água (líquido, flui na hora). Uma casa é como gelo (é água/dinheiro, mas demora para derreter/vender e virar dinheiro na mão).",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacaoCompleta: "Regime de juros onde os juros de cada período são somados ao capital para o cálculo de novos juros nos períodos seguintes.",
    explicacaoSimplificada: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro que investiu E sobre o dinheiro que o investimento já rendeu.",
    exemplo: "Mês 1: Ganhou R$ 10. Mês 2: Você ganha juros sobre o seu dinheiro original + juros sobre os R$ 10 que ganhou. No longo prazo, vira uma explosão.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },

  // =================================================================
  // NÍVEL: INTERMEDIÁRIO
  // =================================================================

  // --- Renda Fixa ---
  {
    id: 11,
    sigla: "LCI / LCA",
    nome: "Letras de Crédito (Imob./Agro)",
    explicacaoCompleta: "Títulos emitidos por bancos para financiar os setores imobiliário e agrícola. São isentos de Imposto de Renda para pessoa física.",
    explicacaoSimplificada: "As primas ricas do CDB. O dinheiro vai para financiar casas ou plantações. O melhor: o governo não cobra Imposto de Renda sobre o seu lucro.",
    exemplo: "Um CDB que paga 12% ao ano pode render menos dinheiro no seu bolso que uma LCI que paga 10% ao ano, porque no CDB o Leão morde uma parte, na LCI é tudo seu.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacaoCompleta: "Títulos de dívida emitidos por empresas (S.A.) para financiar projetos ou pagar dívidas. Não contam com a garantia do FGC.",
    explicacaoSimplificada: "Você empresta dinheiro para empresas (como a Vale, Petrobras ou a concessionária da rodovia) fazerem obras. Paga mais que o banco, mas se a empresa quebrar, o risco é seu.",
    exemplo: "É como emprestar dinheiro para o dono da padaria reformar a loja. Ele promete te pagar bem, mas se a padaria falir, não tem o banco para garantir.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacaoCompleta: "Título público que paga uma taxa fixa mais a variação da inflação (IPCA). Garante a manutenção do poder de compra no longo prazo.",
    explicacaoSimplificada: "Garante que você sempre vai ganhar acima da inflação. Ótimo para aposentadoria. Mas cuidado: se vender antes da data final, pode perder dinheiro.",
    exemplo: "É o investimento 'blidadado'. Não importa se o preço do arroz triplicar daqui a 10 anos, esse título vai render o aumento do arroz + um lucro extra.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },

  // --- Renda Variável ---
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacaoCompleta: "Fundos de investimento destinados à aplicação em empreendimentos imobiliários. Distribuem rendimentos mensais isentos de IR.",
    explicacaoSimplificada: "Como ser dono de shopping sem ter dor de cabeça com inquilino. Você compra 'pedacinhos' (cotas) e recebe aluguel na sua conta todo mês.",
    exemplo: "Com R$ 10,00 você compra uma cota de um fundo que é dono de 10 prédios comerciais em SP. Todo mês, uma parte do aluguel desses prédios cai na sua conta.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacaoCompleta: "Fundos de investimento que têm como referência um índice de mercado e cujas cotas são negociadas na bolsa de valores.",
    explicacaoSimplificada: "Uma 'cesta básica' de ações. Em vez de escolher qual fruta comprar, você compra a cesta inteira. É o jeito mais fácil de investir na bolsa.",
    exemplo: "Ao comprar 1 cota do ETF 'BOVA11', você está comprando automaticamente um pedacinho da Petrobras, Vale, Itaú, Bradesco e Ambev de uma vez só.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },

  // --- Taxas ---
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de Imposto de Renda",
    explicacaoCompleta: "Recolhimento semestral automático de IR que incide sobre fundos de investimento (Renda Fixa, Cambial e Multimercado).",
    explicacaoSimplificada: "O governo não espera você sacar o dinheiro. Duas vezes por ano (maio e novembro), ele vai lá no seu fundo e pega a parte dele do lucro.",
    exemplo: "É como se você tivesse uma plantação e o governo viesse pegar algumas sacas de milho a cada 6 meses, em vez de esperar você colher tudo no final.",
    nivelId: "intermediario",
    categoria: "taxas"
  },
  {
    id: 17,
    sigla: "Taxa de Adm",
    nome: "Taxa de Administração",
    explicacaoCompleta: "Percentual cobrado anualmente pelos gestores de fundos para remunerar a prestação de serviço de gestão e administração.",
    explicacaoSimplificada: "O salário do gestor do fundo. É cobrado todo ano sobre o valor TOTAL que você tem lá, ganhando ou perdendo dinheiro.",
    exemplo: "Se a taxa é 2% e você tem R$ 100,00 investidos, R$ 2,00 vão para o banco todo ano, mesmo se o fundo render zero.",
    nivelId: "intermediario",
    categoria: "taxas"
  },

  // --- Indicadores ---
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacaoCompleta: "Índice de inflação calculado pela FGV, muito sensível ao dólar e preços no atacado. Usado para reajuste de aluguéis.",
    explicacaoSimplificada: "A 'Inflação do Aluguel'. É outro termômetro de preços, mas que costuma subir muito mais rápido que o IPCA quando o Dólar sobe.",
    exemplo: "Se o IGP-M dispara, prepare o bolso: a conta de luz e o boleto do aluguel da casa provavelmente vão aumentar bastante no aniversário do contrato.",
    nivelId: "intermediario",
    categoria: "indicadores"
  },

  // =================================================================
  // NÍVEL: EXPERIENTE
  // =================================================================

  // --- Renda Variável ---
  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias e Preferenciais",
    explicacaoCompleta: "Valores mobiliários representativos de unidade do capital social de uma sociedade anônima.",
    explicacaoSimplificada: "Você vira sócio da empresa. Se ela lucrar, você recebe parte do lucro (dividendos). Se ela valorizar, você ganha vendendo mais caro. Se ela falir, você perde.",
    exemplo: "Ter uma ação da Apple é ser dono de um pedacinho microscópico da empresa. Você não apita na reunião, mas tem direito aos lucros dela.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacaoCompleta: "Certificados de depósito emitidos no Brasil que representam valores mobiliários de emissão de companhias abertas sediadas no exterior.",
    explicacaoSimplificada: "O jeito de investir no exterior sem tirar o dinheiro do Brasil. Você compra um recibo aqui que vale por uma ação lá fora.",
    exemplo: "Você usa seus Reais na bolsa brasileira para comprar BDRs da Disney ou Coca-Cola. Se o dólar subir ou a empresa crescer, você ganha.",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Mercado de Opções e Futuros",
    explicacaoCompleta: "Instrumentos financeiros cujo valor deriva do preço de outro ativo (o ativo-objeto). Usados para hedge (proteção) ou especulação.",
    explicacaoSimplificada: "Apostas sobre o futuro. Você não compra a coisa em si, mas faz um contrato sobre o preço dela numa data futura.",
    exemplo: "Um fazendeiro vende 'Milho Futuro' para garantir o preço da saca daqui a 6 meses (proteção). Um especulador compra achando que o preço vai explodir (aposta).",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacaoCompleta: "Ações de empresas com menor valor de mercado, geralmente com maior potencial de crescimento e maior volatilidade.",
    explicacaoSimplificada: "As empresas 'adolescentes'. Elas são menores e têm chance de crescer muito (e te deixar rico), mas também têm mais chance de dar errado.",
    exemplo: "Enquanto a Petrobras é um navio transatlântico (seguro, mas lento), uma Small Cap é uma lancha (rápida, mas balança muito com qualquer onda).",
    nivelId: "experiente",
    categoria: "renda_variavel"
  },

  // --- Conceitos Avançados ---
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacaoCompleta: "Medida estatística da dispersão dos retornos de um título ou índice de mercado. Representa o risco de oscilação.",
    explicacaoSimplificada: "A intensidade do sobe-e-desce. Alta volatilidade assusta o iniciante (risco), mas gera oportunidade de lucro rápido para o profissional.",
    exemplo: "A Poupança é uma estrada reta e plana (baixa volatilidade). O Bitcoin é uma montanha-russa insana (altíssima volatilidade).",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacaoCompleta: "Estratégia de usar capital de terceiros (empréstimo da corretora) para tentar aumentar o retorno de um investimento.",
    explicacaoSimplificada: "Investir 'fiado'. Você usa mais dinheiro do que tem na conta para tentar ganhar mais. Se der certo, lucro turbinado. Se der errado, você pode ficar devendo.",
    exemplo: "Você tem R$ 1.000, mas opera como se tivesse R$ 10.000. Se a ação subir 1%, você ganha 10%. Se cair 1%, você perde 10%. Perigoso.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Cambial/Financeira",
    explicacaoCompleta: "Operação financeira que visa reduzir ou eliminar o risco de variações indesejadas de preços.",
    explicacaoSimplificada: "O seguro do investidor. É uma aposta contrária ao seu investimento principal para que, se tudo der errado, você não perca tudo.",
    exemplo: "Você tem ações brasileiras (que caem se o dólar subir). Para se proteger, você compra um pouco de Dólar. Se a bolsa cair, o Dólar sobe e compensa sua perda.",
    nivelId: "experiente",
    categoria: "conceitos"
  },
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacaoCompleta: "Estratégia de compra e venda do mesmo ativo no mesmo dia, buscando lucrar com as oscilações de curto prazo.",
    explicacaoSimplificada: "Comprar de manhã e vender à tarde. É a modalidade mais difícil e arriscada da bolsa. Exige tela ligada o dia todo e sangue frio.",
    exemplo: "É como comprar um carro de manhã por R$ 20.000 achando que vai conseguir vender ele por R$ 20.200 antes do almoço. O lucro é pequeno, mas feito várias vezes.",
    nivelId: "experiente",
    categoria: "conceitos"
  },

  // --- Taxas ---
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacaoCompleta: "Taxa cobrada pelo gestor do fundo sobre a parcela da rentabilidade que exceder o índice de referência (benchmark).",
    explicacaoSimplificada: "Um prêmio pela competência. Se o gestor fizer seu dinheiro render MUITO mais que o combinado, ele fica com um pedacinho desse lucro extra.",
    exemplo: "O combinado era render 10%. O gestor fez render 15%. Sobre esses 5% 'extras', ele cobra uma taxa de sucesso.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacaoCompleta: "Taxas cobradas pela B3 (Bolsa) e pela CBLC (Companhia Brasileira de Liquidação e Custódia) sobre operações de compra e venda.",
    explicacaoSimplificada: "A taxa de uso da Bolsa. Toda vez que você compra ou vende uma ação, a Bolsa cobra uns centavos ou reais pelo serviço de registrar aquilo.",
    exemplo: "É como o pedágio. Para usar a estrada da Bolsa de Valores e negociar suas ações, você paga uma taxinha a cada passagem (operação).",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacaoCompleta: "A diferença entre o preço que o mercado está pedindo para vender (Ask) e o preço que está oferecendo para comprar (Bid) um ativo.",
    explicacaoSimplificada: "A diferença entre o preço de compra e venda. Se o spread é alto, você já começa perdendo dinheiro assim que compra.",
    exemplo: "No câmbio turismo: Você compra Dólar a R$ 5,50, mas se quiser vender no mesmo segundo, a casa de câmbio só paga R$ 5,00. Esses R$ 0,50 são o spread.",
    nivelId: "experiente",
    categoria: "taxas"
  },
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacaoCompleta: "Mecanismo de segurança que interrompe o pregão da bolsa quando há quedas bruscas nos preços (10%, 15% e 20%).",
    explicacaoSimplificada: "O freio de mão de emergência. Quando o mercado entra em pânico e cai demais (10%), a bolsa 'puxa a tomada' por 30 minutos para todos beberem água e se acalmarem.",
    exemplo: "Imagine um estádio pegando fogo e todo mundo correndo para a porta. O Circuit Breaker fecha a porta por 30min para organizar a saída e evitar pisoteamento.",
    nivelId: "experiente",
    categoria: "conceitos"
  }
];
