import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

// --- TIPAGEM DA AULA ---
export interface Aula {
  id: number;
  titulo: string;
  nivel: Level;
  duracao: string;
  descricao: string;
  transcricaoCompleta: string;
}

// --- TIPAGEM DO TERMO ---
export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string;
  explicacaoSimplificada: string;
  exemplo: string;
  dicaComoComecar?: string;
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
  aulaAssociadaId?: number; // Vincula o card a uma aula específica
}

// =================================================================
// BANCO DE DADOS DAS AULAS (PODCASTS)
// =================================================================
export const aulas: Aula[] = [
  // --- NÍVEL: INTRODUTÓRIO (A BASE) ---
  {
    id: 1,
    titulo: "Quando e como começar?",
    nivel: "iniciante",
    duracao: "5 min",
    descricao: "Organização financeira possível com a regra 50-30-20. Não é sobre sobrar dinheiro, é sobre entender a realidade.",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>A construção da casa. Não dá para colocar o telhado (investir) sem ter o chão (organização).</p>

      <h2>Abertura</h2>
      <p>Muita gente quer começar a investir comprando ações ou criptomoedas. Isso é como querer colocar o telhado de uma casa antes de fazer o alicerce. Vai cair. O começo não é sobre rentabilidade, é sobre Organização.</p>
      
      <h2>Desenvolvimento</h2>
      <p>A maioria de nós não aprendeu a lidar com dinheiro. A gente recebe, paga boleto e reza para sobrar. Para quebrar esse ciclo, precisamos de um mapa.</p>
      <p>Uma ferramenta simples é a <strong>Regra 50-30-20</strong>. Imagine seu salário como uma pizza fatiada em três partes:</p>
      <ul>
        <li><strong>A metade da pizza (50%) é para sobrevivência:</strong> aluguel, comida, luz.</li>
        <li><strong>Uma fatia menor (30%) é para viver:</strong> lazer, um presente, um jantar. Cortar isso é insustentável.</li>
        <li><strong>A última fatia (20%) é para o seu "Eu do Futuro".</strong></li>
      </ul>
      <p>"Mas não sobra nada!". A realidade do brasileiro é dura. Se não der para guardar 20%, guarde 5%. O objetivo inicial não é ficar rico, é criar o hábito.</p>
      <p>Esse dinheiro guardado vai formar sua <strong>Reserva de Emergência</strong>. Pense nela como um "colete salva-vidas". Você não usa o colete para nadar mais rápido, você usa para não se afogar se o barco virar (desemprego, doença). Esse dinheiro precisa ter <strong>liquidez</strong>: tem que estar na mão na hora que o problema acontece.</p>
      
      <h2>Fechamento</h2>
      <p>Primeiro você organiza a casa e veste o colete salva-vidas. Só depois você pensa em navegar em alto mar. Um passo de cada vez.</p>
    `
  },
  {
    id: 2,
    titulo: "Guardar ou Investir?",
    nivel: "iniciante",
    duracao: "5 min",
    descricao: "A despensa vs. A horta. Entenda a diferença entre segurança (poupança) e multiplicação (juros compostos).",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>A despensa vs. A horta. (Segurança vs. Multiplicação).</p>

      <h2>Abertura</h2>
      <p>Você tem dinheiro parado na conta corrente ou na Poupança? Parabéns, você é um poupador. Mas você ainda não é um investidor. E existe uma traça invisível comendo esse dinheiro guardado: a Inflação.</p>
      
      <h2>Desenvolvimento</h2>
      <p>Guardar dinheiro é como estocar comida na despensa. É seguro, está ali quando você precisa. Mas se ficar muito tempo, estraga. No mundo financeiro, quem estraga seu dinheiro é o <strong>IPCA (a inflação)</strong>. R$ 100 hoje compram muito menos do que compravam há 10 anos.</p>
      <p>A Poupança hoje funciona como essa despensa antiga. O rendimento dela é tão baixo que, muitas vezes, apenas empata com a inflação. Você acha que tem o mesmo dinheiro, mas ele vale menos.</p>
      <p>Investir é diferente. É pegar a semente e plantar. Você corre riscos? Sim, pode não chover (risco de mercado). Mas é a única forma de a semente virar árvore.</p>
      <p>É aqui que entra a mágica dos <strong>Juros Compostos</strong>. Eles são o "super adubo" da sua horta. Funciona assim: sua árvore dá frutos. Em vez de comer tudo, você planta esses frutos. Agora você tem duas árvores. Depois quatro, depois oito. É o famoso "juros sobre juros". É a única força capaz de transformar pouco dinheiro em muito patrimônio no longo prazo.</p>
      
      <h2>Fechamento</h2>
      <p>Não jogue todo seu dinheiro na horta (risco), nem deixe tudo na despensa (perda de valor). Dinheiro de curto prazo a gente guarda. Dinheiro de longo prazo a gente investe.</p>
    `
  },
  {
    id: 3,
    titulo: "Tesouro e Renda Fixa",
    nivel: "iniciante",
    duracao: "6 min",
    descricao: "O contrato de empréstimo e as letras miúdas. Tesouro, CDB e os riscos invisíveis.",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>O contrato de empréstimo e as letras miúdas.</p>

      <h2>Abertura</h2>
      <p>Quando você investe em Renda Fixa, você muda de lado no balcão. Você deixa de ser quem pede dinheiro emprestado e passa a ser o banqueiro: você é quem empresta. Mas para quem você está emprestando?</p>
      
      <h2>Desenvolvimento</h2>
      <p>Se você empresta para o governo brasileiro, isso se chama <strong>Tesouro Direto</strong>. Se empresta para um banco, chama-se <strong>CDB</strong>. O quanto eles te pagam de juros depende da <strong>Selic</strong> (a taxa mãe da economia) ou do <strong>CDI</strong>. Se a economia vai mal e os juros sobem, você ganha mais.</p>
      <p>"Então é risco zero?" Não. Existem pegadinhas:</p>
      <ul>
        <li><strong>A Impaciência:</strong> Existe um imposto chamado <strong>IOF</strong>. Ele é uma multa para quem investe e saca em menos de 30 dias. Se você for ansioso, o governo fica com seu lucro.</li>
        <li><strong>O Tempo:</strong> Alguns títulos (como LCI e LCA) são "trancados". Você empresta o dinheiro e o banco só devolve daqui a 2 anos. Se você precisar do dinheiro para uma emergência amanhã, você não consegue sacar.</li>
      </ul>
      
      <h2>Fechamento</h2>
      <p>Renda Fixa é segura, mas exige planejamento. Dinheiro que você pode precisar a qualquer momento tem que ficar no Tesouro Selic ou CDB com Liquidez Diária. Para o resto, você pode travar o dinheiro para ganhar mais.</p>
    `
  },

  // --- NÍVEL: INTERMEDIÁRIO (O MERCADO) ---
  {
    id: 4,
    titulo: "O que é a Bolsa?",
    nivel: "intermediario",
    duracao: "5 min",
    descricao: "O Supermercado de Empresas. Preço vs Valor e como funciona o mercado.",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>O Supermercado de Empresas (Preço vs. Valor).</p>

      <h2>Abertura</h2>
      <p>Esqueça a imagem de homens gritando com telefones na mão. A Bolsa de Valores hoje é silenciosa, digital e funciona exatamente como um supermercado ou uma feira livre.</p>
      
      <h2>Desenvolvimento</h2>
      <p>A Bolsa (B3) é o lugar onde as empresas vão para vender pedacinhos delas mesmas. Elas fazem isso para captar dinheiro e construir fábricas ou lojas. Nós, investidores, compramos esses pedacinhos esperando que a empresa cresça.</p>
      <p>A diferença para um supermercado comum é que, na Bolsa, os preços das etiquetas mudam a cada segundo. Se sai uma notícia ruim, o preço cai. Se sai uma notícia boa, o preço sobe.</p>
      <p>Às vezes, o mercado entra em pânico coletivo. Todo mundo quer vender ao mesmo tempo. Para evitar um desastre, existe o <strong>Circuit Breaker</strong>. É como um disjuntor de segurança: se a bolsa cair 10%, ela "desliga" por 30 minutos para todo mundo beber uma água e acalmar os ânimos.</p>
      
      <h2>Fechamento</h2>
      <p>A Bolsa é volátil. Ela chacoalha. Mas no longo prazo, ela segue o lucro das empresas. Se as empresas lucram, a bolsa sobe. Não se assuste com o barulho do curto prazo.</p>
    `
  },
  {
    id: 5,
    titulo: "Sócio ou Apostador?",
    nivel: "intermediario",
    duracao: "5 min",
    descricao: "Ações, ETFs e Fundos. Como virar dono de grandes negócios.",
    transcricaoCompleta: `
      <h2>Abertura</h2>
      <p>Imagine que seu amigo te convida para ser sócio de uma padaria. Você colocaria seu dinheiro lá sem saber se o pão é bom, se a padaria dá lucro ou se tem dívidas? Provavelmente não. Então por que você faz isso na Bolsa?</p>
      
      <h2>Desenvolvimento</h2>
      <p>Comprar uma <strong>Ação</strong> é virar sócio. É ter um CNPJ na carteira. Existem várias formas de fazer isso:</p>
      <ul>
        <li>Você pode escolher a dedo as melhores empresas (Stock Picking).</li>
        <li>Você pode comprar um pacote fechado com as maiores empresas do Brasil através de um <strong>ETF</strong> (como o BOVA11). É como comprar uma cesta de frutas pronta em vez de escolher uva por uva.</li>
        <li>Ou você pode ser sócio de grandes imóveis, como shoppings e escritórios, através dos <strong>FIIs (Fundos Imobiliários)</strong>, recebendo aluguel todo mês.</li>
      </ul>
      <p>O grande erro é tratar a ação como um bilhete de loteria. Quem compra achando que vai "estourar" amanhã, geralmente quebra. Quem compra pensando "quero ser dono dessa empresa pelos próximos 10 anos", geralmente enriquece.</p>
      
      <h2>Fechamento</h2>
      <p>Antes de comprar uma ação, pergunte-se: "Se a Bolsa fechasse hoje e só reabrisse daqui a 5 anos, eu ficaria feliz em continuar dono dessa empresa?". Se a resposta for sim, você é um investidor.</p>
    `
  },

  // --- NÍVEL: AVANÇADO (O JOGO AVANÇADO) ---
  {
    id: 6,
    titulo: "O Preço da Rapidez",
    nivel: "avancado",
    duracao: "7 min",
    descricao: "Trader vs Investidor. Volatilidade, Alavancagem e os perigos do curto prazo.",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>A diferença entre dirigir seguro na estrada (Investidor) e correr na Fórmula 1 (Trader).</p>

      <h2>Abertura</h2>
      <p>O mercado financeiro tem dois modos de operar: o modo "Maratona", onde você constrói patrimônio devagar por anos, e o modo "Corrida de 100 metros", onde a promessa é ganhar o salário do mês em um único dia. Hoje vamos falar sobre esse segundo modo, e por que a maioria das pessoas derrapa na primeira curva.</p>
      
      <h2>Desenvolvimento</h2>
      <p>A modalidade mais famosa de curto prazo é o <strong>Day Trade</strong>. É comprar e vender a mesma coisa no mesmo dia. O Day Trader não quer ser sócio da empresa; ele não se importa se a empresa é boa ou ruim. Ele só quer aproveitar o movimento do preço.</p>
      <p>E para ganhar dinheiro rápido, o trader precisa que o preço se mexa muito. O nome disso é <strong>Volatilidade</strong>. Para o investidor comum, volatilidade dá medo. Para o trader, é o oxigênio. Se o gráfico fica parado, ele não lucra.</p>
      <p>O problema é: oscilações de centavos não deixam ninguém rico. É aí que entra a ferramenta mais perigosa do mercado: a <strong>Alavancagem</strong>. A corretora permite que você opere com dinheiro que não tem. É como se você tivesse 100 reais, mas a corretora deixasse você apostar como se tivesse 10 mil. Se o preço subir 1%, você ganha muito. Mas se cair 1%, você perde tudo o que tinha e ainda fica devendo. A alavancagem multiplica o lucro, mas também multiplica o tombo.</p>
      <p>Enquanto a pessoa física usa essas ferramentas para apostar, os grandes bancos usam ferramentas parecidas, chamadas <strong>Derivativos</strong>, para fazer o oposto: proteção. Eles usam uma estratégia chamada <strong>Hedge</strong>. É como fazer um seguro do carro. Você não faz o seguro torcendo para bater o carro. Você faz para que, se bater, o prejuízo seja controlado.</p>
      
      <h2>Fechamento</h2>
      <p>O erro do iniciante é usar ferramentas de profissionais (derivativos e alavancagem) com mentalidade de amador. Se você busca emoção, vá a um parque de diversões. Investimento sério costuma ser entediante, mas é o que funciona.</p>
    `
  },
  {
    id: 7,
    titulo: "As Letras Miúdas",
    nivel: "avancado",
    duracao: "6 min",
    descricao: "Taxas e Custos. Taxa de Adm, Performance e Spread. Onde seu lucro desaparece.",
    transcricaoCompleta: `
      <h2>Conceito</h2>
      <p>A jornada do seu dinheiro e os "pedágios" que ele paga no caminho.</p>

      <h2>Abertura</h2>
      <p>Imagine que você fez um investimento e ele rendeu 10%. Você comemora. Mas quando o dinheiro cai na conta, só chegaram 7%. Onde foi parar o resto? O mercado financeiro é cheio de "sócios invisíveis" que mordem seu lucro sem você ver.</p>
      
      <h2>Desenvolvimento</h2>
      <p>Vamos acompanhar a jornada do seu dinheiro para encontrar esses furos no balde.</p>
      <p>O primeiro custo aparece na hora que você clica em "Comprar". Se você compra ações, paga os <strong>Emolumentos</strong>. É como um pedágio da Bolsa (B3). É barato, centavos, mas se você opera muito (como no Day Trade), vira uma fortuna. Além disso, existe o <strong>Spread</strong>. Já notou que na casa de câmbio o dólar para comprar é R$ 5,50 e para vender é R$ 5,00? Essa diferença é o Spread. Em investimentos com pouca liquidez, você já entra perdendo essa diferença logo na largada.</p>
      <p>Depois que o dinheiro está investido, vem o custo de manutenção. Se você investe via Fundos, existe um gestor trabalhando lá. O salário dele sai da <strong>Taxa de Administração</strong>. Ela é cobrada todo ano, sobre todo o seu dinheiro, ganhando ou perdendo. É um aluguel que você paga para alguém cuidar do seu dinheiro. Se esse gestor for muito bom e superar a meta combinada, ele cobra um prêmio extra: a <strong>Taxa de Performance</strong>. Essa é a única taxa que a gente paga "feliz", porque significa que o fundo rendeu muito bem.</p>
      <p>E por último, o governo. Em alguns fundos, o governo não espera você sacar para cobrar imposto. A cada 6 meses, ele vai lá e pega um pedacinho das suas cotas. O nome desse mecanismo é <strong>Come-Cotas</strong>. É uma antecipação do Imposto de Renda que freia o efeito dos juros compostos.</p>
      
      <h2>Fechamento</h2>
      <p>Investir não é só escolher o que rende mais. É escolher o que custa menos. Um fundo com taxas altas precisa ser excepcionalmente bom só para empatar com um investimento simples e barato. Fique de olho nas letras miúdas.</p>
    `
  }
];

// =================================================================
// LISTA DE TERMOS (Vinculada às Aulas)
// =================================================================
export const listaCompletaTermos: Termo[] = [
  // --- AULA 01: Quando e como começar? ---
  {
    id: 8,
    sigla: "Reserva de Emergência",
    nome: "Reserva Emergencial",
    explicacaoCompleta: "Montante financeiro acumulado para cobrir despesas imprevistas, equivalente a 6 a 12 meses do custo de vida.",
    explicacaoSimplificada: "O colchão de segurança. Dinheiro para quando o carro quebra ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    exemplo: "Se você gasta R$ 2.000,00 por mês, sua reserva deve ser de pelo menos R$ 12.000,00 em um lugar seguro.",
    dicaComoComecar: "Comece guardando qualquer valor (ex: R$ 50,00) todo mês em um Tesouro Selic ou CDB Liquidez Diária.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 1
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacaoCompleta: "Capacidade de converter um ativo em dinheiro corrente sem perda significativa de valor.",
    explicacaoSimplificada: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    exemplo: "Dinheiro na conta é líquido (água). Uma casa é pouco líquida (gelo), pois demora para vender e virar dinheiro na mão.",
    dicaComoComecar: "Para sua reserva de emergência, exija 'Liquidez Diária' ou 'D+0'.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 1
  },

  // --- AULA 02: Guardar ou Investir? ---
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei (70% da Selic + TR).",
    explicacaoSimplificada: "O investimento mais famoso e um dos piores. Perde para a inflação com frequência.",
    exemplo: "Se você sacar o dinheiro um dia antes do aniversário da conta, perdeu o rendimento do mês inteiro.",
    dicaComoComecar: "A dica aqui é: Saia dela! O primeiro passo é testar o Tesouro Selic.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 2
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos.",
    explicacaoSimplificada: "O vilão invisível que faz o seu dinheiro valer menos. Se render MENOS que o IPCA, você perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho com R$ 100,00 e a inflação for 10%, ano que vem precisará de R$ 110,00.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 2
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacaoCompleta: "Regime de juros onde os juros de cada período são somados ao capital para o cálculo de novos juros nos períodos seguintes.",
    explicacaoSimplificada: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro investido E sobre o lucro que já teve.",
    exemplo: "Mês 1: Ganhou R$ 10,00. Mês 2: Você ganha juros sobre o seu dinheiro original + juros sobre os R$ 10,00 que ganhou.",
    dicaComoComecar: "O maior aliado dos juros compostos é o tempo. Comece cedo.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 2
  },

  // --- AULA 03: Tesouro e Renda Fixa ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias.",
    explicacaoSimplificada: "A 'Taxa Mãe'. Ela comanda o dinheiro do país. Se ela sobe, a Renda Fixa rende mais.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe, quem tem dinheiro ganha mais.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 3
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si.",
    explicacaoSimplificada: "A meta que seu dinheiro tem que bater. Se paga '100% do CDI', é justo. Menos que isso, desconfie.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se seu investimento está a 50% do CDI, você está lento.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 3
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil.",
    dicaComoComecar: "Busque por 'Tesouro Direto' na sua corretora.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos.",
    explicacaoSimplificada: "Você vira o banqueiro. VOCÊ empresta para o banco e ele te devolve com juros.",
    exemplo: "Igual emprestar dinheiro para um amigo (o banco) e combinar de receber com juros depois.",
    dicaComoComecar: "Procure CDBs que paguem pelo menos 100% do CDI.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que incide sobre resgates inferiores a 30 dias.",
    explicacaoSimplificada: "O imposto dos apressadinhos. Ele só existe se você tirar o dinheiro em menos de um mês.",
    exemplo: "Colocou R$ 1.000 hoje e tirou amanhã? O governo morde quase todo o lucro.",
    dicaComoComecar: "Planeje seus investimentos para ficarem aplicados por pelo menos 30 dias.",
    nivelId: "iniciante",
    categoria: "taxas",
    aulaAssociadaId: 3
  },
  {
    id: 11,
    sigla: "LCI / LCA",
    nome: "Letras de Crédito (Imob./Agro)",
    explicacaoCompleta: "Títulos isentos de Imposto de Renda para pessoa física, usados para financiar imóveis e agro.",
    explicacaoSimplificada: "As primas ricas do CDB. O dinheiro financia casas ou plantações. Isento de IR.",
    exemplo: "Rende mais no seu bolso que um CDB de mesma taxa, porque o Leão não morde.",
    dicaComoComecar: "Procure na corretora. Geralmente exigem valor inicial maior (ex: R$ 1.000).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },

  // --- AULA 04: O que é a Bolsa? ---
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacaoCompleta: "Mecanismo que interrompe o pregão da bolsa quando há quedas bruscas (10%, 15%).",
    explicacaoSimplificada: "O freio de mão. Quando o mercado entra em pânico, a bolsa 'puxa a tomada' por 30min.",
    exemplo: "Imagine um estádio pegando fogo. O Circuit Breaker fecha as portas para organizar a saída.",
    dicaComoComecar: "Se acontecer, não venda no desespero. Desligue o computador.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 4
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacaoCompleta: "Título público que paga uma taxa fixa mais a variação da inflação (IPCA).",
    explicacaoSimplificada: "Garante ganho acima da inflação. Ótimo para aposentadoria. Cuidado se vender antes.",
    exemplo: "Não importa se o arroz triplicar de preço, esse título rende a inflação + lucro extra.",
    dicaComoComecar: "Escolha um vencimento próximo de quando quer usar o dinheiro (ex: 2035).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 4
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacaoCompleta: "Títulos de dívida emitidos por empresas para financiar projetos.",
    explicacaoSimplificada: "Emprestar dinheiro para empresas (como a Vale) fazerem obras. Risco maior que banco.",
    exemplo: "Emprestar pro dono da padaria reformar a loja. Se a padaria falir, não tem garantia.",
    dicaComoComecar: "Prefira 'Debêntures Incentivadas' (isentas de IR).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 4
  },

  // --- AULA 05: Sócio ou Apostador? ---
  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias/Preferenciais",
    explicacaoCompleta: "Valores mobiliários representativos de unidade do capital social de uma empresa.",
    explicacaoSimplificada: "Você vira sócio. Se ela lucrar, recebe parte. Se falir, perde.",
    exemplo: "Ter uma ação da Apple é ser dono de um pedacinho da empresa.",
    dicaComoComecar: "Comece estudando empresas sólidas (Blue Chips) que dão lucro há anos.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacaoCompleta: "Fundos de índice negociados em bolsa.",
    explicacaoSimplificada: "Uma 'cesta básica' de ações. Compra a cesta inteira de uma vez.",
    exemplo: "Comprar 'BOVA11' é comprar pedacinhos das maiores empresas do Brasil de uma vez.",
    dicaComoComecar: "Busque por 'IVVB11' (EUA) ou 'BOVA11' (Brasil).",
    nivelId: "intermediario",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacaoCompleta: "Fundos para aplicação em empreendimentos imobiliários. Pagam aluguel mensal.",
    explicacaoSimplificada: "Como ser dono de shopping sem dor de cabeça. Recebe aluguel isento de IR.",
    exemplo: "Com R$ 10 você compra uma cota e recebe centavos de aluguel todo mês.",
    dicaComoComecar: "Compre 1 cota (ex: MXRF11) para ver o aluguel cair.",
    nivelId: "intermediario",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacaoCompleta: "Ações de empresas menores com maior potencial de crescimento.",
    explicacaoSimplificada: "As empresas 'adolescentes'. Podem crescer muito, mas têm mais risco.",
    exemplo: "Petrobras é um transatlântico (seguro). Small Cap é uma lancha (rápida e balança).",
    dicaComoComecar: "Invista via ETF 'SMAL11' para diluir o risco.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacaoCompleta: "Certificados no Brasil que representam ações do exterior.",
    explicacaoSimplificada: "Investir no exterior sem tirar dinheiro do Brasil.",
    exemplo: "Usar Reais para comprar recibos da Disney ou Apple.",
    dicaComoComecar: "Busque códigos com final 34 (ex: AAPL34).",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },

  // --- AULA 06: O Preço da Rapidez ---
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacaoCompleta: "Compra e venda do mesmo ativo no mesmo dia.",
    explicacaoSimplificada: "Comprar de manhã e vender à tarde. Arriscado.",
    exemplo: "Comprar por 20 e vender por 20,20 minutos depois.",
    dicaComoComecar: "95% perdem dinheiro. Use apenas dinheiro que aceita perder.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacaoCompleta: "Medida do risco de oscilação do preço.",
    explicacaoSimplificada: "A intensidade do sobe-e-desce.",
    exemplo: "Poupança é reta. Bitcoin é montanha-russa.",
    dicaComoComecar: "Equilibre ativos voláteis com Renda Fixa segura.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacaoCompleta: "Usar capital de terceiros para aumentar o retorno (e o risco).",
    explicacaoSimplificada: "Investir 'fiado'. Potencializa lucro e prejuízo.",
    exemplo: "Operar como se tivesse 10x mais dinheiro do que tem na conta.",
    dicaComoComecar: "Evite no início. Risco de quebrar a conta.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Financeira",
    explicacaoCompleta: "Operação para reduzir riscos de preço.",
    explicacaoSimplificada: "O seguro do investidor. Aposta contrária para proteger.",
    exemplo: "Comprar Dólar para proteger ações brasileiras de uma crise.",
    dicaComoComecar: "Tenha parte em Dólar ou Ouro.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Opções e Futuros",
    explicacaoCompleta: "Instrumentos cujo valor deriva de outro ativo.",
    explicacaoSimplificada: "Apostas sobre o preço futuro de algo.",
    exemplo: "Combinar o preço da saca de milho para o mês que vem.",
    dicaComoComecar: "Estude para proteção, não especulação.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 6
  },

  // --- AULA 07: As Letras Miúdas ---
  {
    id: 17,
    sigla: "Taxa de Adm",
    nome: "Taxa de Administração",
    explicacaoCompleta: "Percentual cobrado anualmente pelos gestores de fundos.",
    explicacaoSimplificada: "O salário do gestor. Cobrado sobre todo o seu dinheiro.",
    exemplo: "2% ao ano vai para o banco, ganhando ou perdendo.",
    dicaComoComecar: "Evite taxas acima de 2% para ações e 0,5% para renda fixa.",
    nivelId: "intermediario",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacaoCompleta: "Taxa sobre o lucro que excede o benchmark.",
    explicacaoSimplificada: "Prêmio se o gestor for muito bem.",
    exemplo: "Se render mais que o combinado, o gestor fica com um pedaço do extra.",
    dicaComoComecar: "Não é ruim, indica que o fundo superou a meta.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacaoCompleta: "Taxas cobradas pela Bolsa sobre operações.",
    explicacaoSimplificada: "O pedágio da Bolsa para comprar e vender.",
    exemplo: "Centavos cobrados a cada operação.",
    dicaComoComecar: "Confira sempre na Nota de Corretagem.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacaoCompleta: "Diferença entre preço de compra e venda.",
    explicacaoSimplificada: "O ágio. A diferença entre o preço que pagam e o que vendem.",
    exemplo: "Casa de câmbio compra dólar a 5,00 e vende a 5,50.",
    dicaComoComecar: "Evite ativos com pouca liquidez, o spread costuma ser alto.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de IR",
    explicacaoCompleta: "Recolhimento semestral automático de IR em fundos.",
    explicacaoSimplificada: "O governo pega a parte dele do lucro a cada 6 meses.",
    exemplo: "O leão morde um pedaço do fundo em maio e novembro.",
    dicaComoComecar: "Prefira fundos de ações ou títulos diretos para evitar.",
    nivelId: "intermediario",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacaoCompleta: "Índice de inflação sensível ao dólar (aluguéis).",
    explicacaoSimplificada: "A 'Inflação do Aluguel'.",
    exemplo: "Se dispara, o aluguel sobe.",
    nivelId: "intermediario",
    categoria: "indicadores",
    aulaAssociadaId: 7
  }
];
