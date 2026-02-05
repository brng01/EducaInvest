import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string;
  explicacaoSimplificada: string;
  exemplo: string;
  dicaComoComecar?: string; // Campo opcional, mas agora muito usado
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
}

export const listaCompletaTermos: Termo[] = [
  // =================================================================
  // NÍVEL: INICIANTE
  // =================================================================
  
  // --- Indicadores (Não tem 'como começar', são informativos) ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias. Ela serve de referência para todas as outras taxas de juros do mercado.",
    explicacaoSimplificada: "É a 'Taxa Mãe'. Ela comanda o dinheiro do país. Se ela sobe, os investimentos de Renda Fixa rendem mais, mas pegar empréstimo fica mais caro.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe, quem tem imóvel (dinheiro) ganha mais, e quem precisa alugar (pegar empréstimo) paga mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si por um prazo de um dia. É o principal benchmark da Renda Fixa.",
    explicacaoSimplificada: "É a meta que seu dinheiro tem que bater. Se um investimento paga '100% do CDI', ele está pagando o justo. Menos que isso, desconfie.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se o seu carro (investimento) está a 50% do CDI, você está andando na metade da velocidade dos outros.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos e serviços consumidos pelas famílias.",
    explicacaoSimplificada: "É o vilão invisível que faz o seu dinheiro valer menos. Se seu investimento render MENOS que o IPCA, você perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho com R$ 100,00 e a inflação for 10%, ano que vem precisará de R$ 110,00 para as mesmas coisas. Dinheiro parado perde valor.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },

  // --- Renda Fixa (Com dicas práticas) ---
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos. Em troca, o banco devolve o valor corrigido por uma taxa de juros.",
    explicacaoSimplificada: "Você vira o banqueiro. Em vez de pedir dinheiro emprestado, VOCÊ empresta para o banco. Ele usa seu dinheiro e te devolve com juros.",
    exemplo: "Igual quando você empresta dinheiro para um amigo e combina: 'Me devolve mês que vem com 10 reais a mais?'. Só que o amigo é o Banco.",
    dicaComoComecar: "Abra o app do seu banco > Investimentos > Renda Fixa. Procure CDBs que paguem pelo menos 100% do CDI e tenham Liquidez Diária.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic. Possui liquidez diária e o menor risco de crédito.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo. Ideal para Reserva de Emergência.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil e você pode sacar quando quiser.",
    dicaComoComecar: "Você precisa de uma conta em corretora ou banco digital. Busque por 'Tesouro Direto' e invista a partir de aprox. R$ 150,00.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei (70% da Selic + TR).",
    explicacaoSimplificada: "O investimento mais famoso e um dos piores. Perde para a inflação com frequência e só rende no dia do aniversário mensal.",
    exemplo: "Se você sacar o dinheiro um dia antes do aniversário da conta, perdeu o rendimento do mês inteiro. No Tesouro, você ganharia proporcional.",
    dicaComoComecar: "A dica aqui é: Saia dela! O primeiro passo é testar o Tesouro Selic ou um CDB de banco digital que renda mais.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },

  // --- Taxas ---
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que incide sobre operações de crédito e seguros. Nos investimentos, incide sobre resgates inferiores a 30 dias.",
    explicacaoSimplificada: "O imposto dos apressadinhos. Ele só existe se você colocar o dinheiro hoje e tirar em menos de um mês.",
    exemplo: "Colocou R$ 1.000,00 hoje e tirou amanhã? O governo morde quase todo o seu lucro. Deixou 30 dias? O imposto zera.",
    dicaComoComecar: "Para evitar o IOF, planeje seus investimentos para ficarem aplicados por pelo menos 30 dias.",
    nivelId: "iniciante",
    categoria: "taxas"
  },

  // --- Conceitos ---
  {
    id: 8,
    sigla: "RE",
    nome: "Reserva de Emergência",
    explicacaoCompleta: "Montante financeiro acumulado para cobrir despesas imprevistas, equivalente a 6 a 12 meses do custo de vida.",
    explicacaoSimplificada: "O colchão de segurança. Dinheiro para quando o carro quebra ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    exemplo: "Se você gasta R$ 2.000,00 por mês, sua reserva deve ser de pelo menos R$ 12.000,00 em um lugar seguro, que é possível sacar a qualquer momento.",
    dicaComoComecar: "Comece guardando qualquer valor (ex: R$ 50,00) todo mês em um Tesouro Selic ou CDB Liquidez Diária. O segredo é a constância.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacaoCompleta: "Capacidade de converter um ativo em dinheiro corrente sem perda significativa de valor.",
    explicacaoSimplificada: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    exemplo: "Dinheiro na conta é líquido (água). Uma casa é pouco líquida (gelo), pois demora para vender e virar dinheiro na mão.",
    dicaComoComecar: "Antes de investir, sempre olhe o prazo de resgate. Para sua reserva de emergência, exija 'Liquidez Diária' ou 'D+0'.",
    nivelId: "iniciante",
    categoria: "conceitos"
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacaoCompleta: "Regime de juros onde os juros de cada período são somados ao capital para o cálculo de novos juros nos períodos seguintes.",
    explicacaoSimplificada: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro investido E sobre o lucro que já teve.",
    exemplo: "Mês 1: Ganhou R$ 10,00. Mês 2: Você ganha juros sobre o seu dinheiro original + juros sobre os R$ 10,00 que ganhou. No longo prazo, explode.",
    dicaComoComecar: "O maior aliado dos juros compostos é o tempo. Comece cedo, mesmo com pouco dinheiro, e deixe ele trabalhar por anos.",
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
    explicacaoCompleta: "Títulos emitidos por bancos para financiar os setores imobiliário e agrícola. São isentos de Imposto de Renda para pessoa física.",
    explicacaoSimplificada: "As primas ricas do CDB. O dinheiro vai para financiar casas ou plantações. O melhor: o governo não cobra Imposto de Renda sobre o lucro.",
    exemplo: "Um CDB que paga 12% ao ano pode render menos no seu bolso que uma LCI que paga 10%, porque no CDB o Leão morde uma parte.",
    dicaComoComecar: "Procure na sua corretora. Elas costumam exigir um valor inicial um pouco maior (ex: R$ 1.000) e o dinheiro fica preso por alguns meses (ex: 90 dias).",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacaoCompleta: "Títulos de dívida emitidos por empresas (S.A.) para financiar projetos ou pagar dívidas. Não contam com a garantia do FGC.",
    explicacaoSimplificada: "Você empresta dinheiro para empresas (como a Vale ou Petrobras) fazerem obras. Paga mais que o banco, mas o risco é maior.",
    exemplo: "É como emprestar dinheiro para o dono da padaria reformar a loja. Ele promete pagar bem, mas se a padaria falir, não tem banco para garantir.",
    dicaComoComecar: "Prefira 'Debêntures Incentivadas' (isentas de IR). Pesquise bem a saúde financeira da empresa antes de emprestar seu dinheiro.",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacaoCompleta: "Título público que paga uma taxa fixa mais a variação da inflação (IPCA). Garante a manutenção do poder de compra no longo prazo.",
    explicacaoSimplificada: "Garante que você sempre vai ganhar acima da inflação. Ótimo para aposentadoria. Cuidado: se vender antes, pode perder dinheiro.",
    exemplo: "É o investimento blindado. Não importa se o arroz triplicar de preço, esse título vai render o aumento do arroz + um lucro extra.",
    dicaComoComecar: "No site do Tesouro, escolha um título com vencimento próximo de quando você quer usar o dinheiro (ex: IPCA+ 2035 para a faculdade do filho).",
    nivelId: "intermediario",
    categoria: "renda_fixa"
  },
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacaoCompleta: "Fundos de investimento destinados à aplicação em empreendimentos imobiliários. Distribuem rendimentos mensais isentos de IR.",
    explicacaoSimplificada: "Como ser dono de shopping sem ter dor de cabeça. Você compra 'pedacinhos' (cotas) e recebe aluguel na conta todo mês.",
    exemplo: "Com R$ 10,00 você compra uma cota de um fundo dono de 10 prédios. Todo mês, uma parte do aluguel desses prédios cai na sua conta.",
    dicaComoComecar: "Abra o Home Broker da sua corretora e digite o código do fundo (ex: MXRF11). Compre 1 cota para testar e ver o aluguel cair no mês seguinte.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacaoCompleta: "Fundos de investimento que têm como referência um índice de mercado e cujas cotas são negociadas na bolsa de valores.",
    explicacaoSimplificada: "Uma 'cesta básica' de ações. Em vez de escolher qual empresa comprar, você compra a cesta inteira. É o jeito mais fácil de entrar na bolsa.",
    exemplo: "Ao comprar 1 cota do ETF 'BOVA11', você compra automaticamente um pedacinho da Petrobras, Vale, Itaú e Ambev de uma vez só.",
    dicaComoComecar: "Busque pelo código 'IVVB11' (para investir nas empresas dos EUA) ou 'BOVA11' (Brasil) no seu Home Broker. É ideal para longo prazo.",
    nivelId: "intermediario",
    categoria: "renda_variavel"
  },
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de Imposto de Renda",
    explicacaoCompleta: "Recolhimento semestral automático de IR que incide sobre fundos de investimento (Renda Fixa, Cambial e Multimercado).",
    explicacaoSimplificada: "O governo não espera você sacar. Duas vezes por ano (maio e novembro), ele vai lá no seu fundo e pega a parte dele do lucro.",
    exemplo: "É como se você tivesse uma plantação e o governo viesse pegar algumas sacas de milho a cada 6 meses, em vez de esperar você colher tudo.",
    dicaComoComecar: "Para evitar o Come-Cotas, dê preferência a investimentos diretos (LCI, LCA, Tesouro) ou fundos de ações (que não têm essa cobrança).",
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
    dicaComoComecar: "Sempre compare taxas. Em fundos de Renda Fixa, evite taxas acima de 0,5%. Em fundos de ações, o padrão aceitável é 2%.",
    nivelId: "intermediario",
    categoria: "taxas"
  },
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacaoCompleta: "Índice de inflação calculado pela FGV, sensível ao dólar. Usado historicamente para reajuste de aluguéis.",
    explicacaoSimplificada: "A 'Inflação do Aluguel'. É outro termômetro de preços, mas costuma subir muito mais rápido que o IPCA quando o Dólar sobe.",
    exemplo: "Se o IGP-M dispara, prepare o bolso: a conta de luz e o boleto do aluguel da casa provavelmente vão aumentar bastante.",
    nivelId: "intermediario",
    categoria: "indicadores"
  },

  // =================================================================
  // NÍVEL: EXPERIENTE
  // =================================================================

  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias/Preferenciais",
    explicacaoCompleta: "Valores mobiliários representativos de unidade do capital social de uma sociedade anônima.",
    explicacaoSimplificada: "Você vira sócio da empresa. Se ela lucrar, você recebe parte (dividendos). Se ela valorizar, ganha na venda. Se falir, você perde.",
    exemplo: "Ter uma ação da Apple é ser dono de um pedacinho microscópico da empresa. Você não apita na reunião, mas tem direito aos lucros.",
    dicaComoComecar: "Não compre dica de youtuber. Comece estudando empresas sólidas (Blue Chips) que dão lucro há anos e pague um preço justo.",
    nivelId: "avancado",
    categoria: "renda_variavel"
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacaoCompleta: "Certificados emitidos no Brasil que representam valores mobiliários de emissão de companhias abertas sediadas no exterior.",
    explicacaoSimplificada: "O jeito de investir no exterior sem tirar o dinheiro do Brasil. Um recibo aqui que vale por uma ação lá fora.",
    exemplo: "Você usa seus Reais na bolsa brasileira para comprar BDRs da Disney. Se o dólar subir ou a empresa crescer, você ganha.",
    dicaComoComecar: "Busque pelos códigos que terminam em 34 (ex: AAPL34 para Apple). É uma ótima forma de dolarizar parte da carteira.",
    nivelId: "avancado",
    categoria: "renda_variavel"
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Opções e Futuros",
    explicacaoCompleta: "Instrumentos financeiros cujo valor deriva do preço de outro ativo. Usados para hedge (proteção) ou especulação.",
    explicacaoSimplificada: "Apostas sobre o futuro. Você não compra a coisa em si, mas faz um contrato sobre o preço dela numa data futura.",
    exemplo: "Um fazendeiro vende 'Milho Futuro' para garantir o preço da saca (proteção). Um especulador compra achando que o preço vai explodir (aposta).",
    dicaComoComecar: "Cuidado! Esse mercado é complexo. Comece estudando 'Hedge' para proteção de carteira, não especulação pura.",
    nivelId: "avancado",
    categoria: "renda_variavel"
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacaoCompleta: "Ações de empresas com menor valor de mercado, geralmente com maior potencial de crescimento e maior volatilidade.",
    explicacaoSimplificada: "As empresas 'adolescentes'. Elas são menores e têm chance de crescer muito (te deixar rico), mas têm mais chance de quebrar.",
    exemplo: "Enquanto a Petrobras é um transatlântico (lento e seguro), uma Small Cap é uma lancha (rápida, mas balança muito).",
    dicaComoComecar: "Existe um índice chamado SMLL que reúne essas empresas. Você pode investir nelas via ETF 'SMAL11' para não arriscar escolher uma só.",
    nivelId: "avancado",
    categoria: "renda_variavel"
  },
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacaoCompleta: "Medida estatística da dispersão dos retornos de um título. Representa o risco de oscilação do preço.",
    explicacaoSimplificada: "A intensidade do sobe-e-desce. Alta volatilidade assusta o iniciante, mas gera oportunidade de lucro rápido para o profissional.",
    exemplo: "A Poupança é uma estrada reta (baixa volatilidade). O Bitcoin é uma montanha-russa insana (altíssima volatilidade).",
    dicaComoComecar: "Para dormir tranquilo, sua carteira deve ter um equilíbrio. Se tiver muita volatilidade, compense com Renda Fixa segura.",
    nivelId: "avancado",
    categoria: "conceitos"
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacaoCompleta: "Estratégia de usar capital de terceiros (corretora) para tentar aumentar o retorno de um investimento.",
    explicacaoSimplificada: "Investir 'fiado'. Você usa mais dinheiro do que tem para tentar ganhar mais. Se der certo, lucro turbinado. Se der errado, dívida.",
    exemplo: "Você tem R$ 1.000,00, mas opera como se tivesse R$ 10.000,00. Se a ação subir 1%, você ganha 10%. Se cair 1%, você perde 10%.",
    dicaComoComecar: "Evite alavancagem no início. O risco de ruína é real. Use apenas seu próprio dinheiro até ter muita experiência.",
    nivelId: "avancado",
    categoria: "conceitos"
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Financeira",
    explicacaoCompleta: "Operação financeira que visa reduzir ou eliminar o risco de variações indesejadas de preços.",
    explicacaoSimplificada: "O seguro do investidor. Uma aposta contrária ao seu investimento principal para que, se tudo der errado, você não perca tudo.",
    exemplo: "Você tem ações brasileiras. Para se proteger, compra Dólar. Se a bolsa cair (crise), o Dólar sobe e compensa sua perda.",
    dicaComoComecar: "A forma mais simples de hedge é ter parte do patrimônio em moeda forte (Dólar) ou Ouro.",
    nivelId: "avancado",
    categoria: "conceitos"
  },
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacaoCompleta: "Estratégia de compra e venda do mesmo ativo no mesmo dia, buscando lucrar com oscilações de curto prazo.",
    explicacaoSimplificada: "Comprar de manhã e vender à tarde. É a modalidade mais arriscada. Exige tela ligada o dia todo e sangue frio.",
    exemplo: "É comprar um carro de manhã por R$ 20.000,00 achando que vai vender por R$ 20.200,00 antes do almoço. Lucro pequeno, repetido várias vezes.",
    dicaComoComecar: "Estatisticamente, 95% das pessoas perdem dinheiro com isso. Se quiser tentar, separe um dinheiro que você aceita perder (dinheiro da 'pinga').",
    nivelId: "avancado",
    categoria: "conceitos"
  },
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacaoCompleta: "Taxa cobrada pelo gestor do fundo sobre a parcela da rentabilidade que exceder o índice de referência (benchmark).",
    explicacaoSimplificada: "Um prêmio pela competência. Se o gestor fizer seu dinheiro render MUITO mais que o combinado, ele fica com um pedacinho desse lucro extra.",
    exemplo: "O combinado era render 10%. O gestor fez render 15%. Sobre esses 5% 'extras', ele cobra uma taxa de sucesso.",
    dicaComoComecar: "Não ache ruim pagar taxa de performance. Geralmente, significa que o fundo entregou muito resultado para você.",
    nivelId: "avancado",
    categoria: "taxas"
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacaoCompleta: "Taxas cobradas pela B3 (Bolsa) e pela CBLC sobre operações de compra e venda de ativos.",
    explicacaoSimplificada: "O pedágio da Bolsa. Toda vez que você compra ou vende uma ação, a Bolsa cobra uns centavos pelo serviço.",
    exemplo: "Para usar a 'estrada' da Bolsa de Valores e negociar suas ações, você paga uma taxinha a cada passagem (operação).",
    dicaComoComecar: "Essas taxas já vêm descontadas na 'Nota de Corretagem'. Sempre confira esse documento no fim do dia.",
    nivelId: "avancado",
    categoria: "taxas"
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacaoCompleta: "A diferença entre o preço de venda (Ask) e o preço de compra (Bid) de um ativo no mercado.",
    explicacaoSimplificada: "A diferença entre o preço que compram e o preço que vendem. Se o spread é alto, você já começa perdendo dinheiro.",
    exemplo: "No câmbio: Você compra Dólar a R$ 5,50, mas se vender no mesmo segundo, a casa só paga R$ 5,00. Esses R$ 0,50 são o spread.",
    dicaComoComecar: "Em ativos com pouca negociação (pouca liquidez), o spread é alto. Evite comprar ações que quase ninguém negocia.",
    nivelId: "avancado",
    categoria: "taxas"
  },
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacaoCompleta: "Mecanismo de segurança que interrompe o pregão da bolsa quando há quedas bruscas (10%, 15%, 20%).",
    explicacaoSimplificada: "O freio de mão. Quando o mercado entra em pânico e cai 10%, a bolsa 'puxa a tomada' por 30 minutos para todos se acalmarem.",
    exemplo: "Imagine um estádio pegando fogo. O Circuit Breaker fecha as portas por 30min para organizar a saída e evitar que todos se pisoteiem.",
    dicaComoComecar: "Se isso acontecer, não venda nada no desespero. Desligue o computador e vá fazer outra coisa. O pânico é o pior conselheiro.",
    nivelId: "avancado",
    categoria: "conceitos"
  }
];
