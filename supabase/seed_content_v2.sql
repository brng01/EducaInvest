-- Limpa dados existentes para evitar duplicidade e garantir a ordem correta
TRUNCATE TABLE lessons CASCADE;
TRUNCATE TABLE terms CASCADE;

-- Reinicia as sequências de ID para garantir consistência
ALTER SEQUENCE lessons_id_seq RESTART WITH 1;
ALTER SEQUENCE terms_id_seq RESTART WITH 1;

-- =================================================================================
-- MÓDULO 1: O DESPERTAR (FUNDAMENTOS)
-- Foco: Sair da inércia e proteger o que tem.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'A "Matrix" do Dinheiro', 
    'A "Matrix" do Dinheiro: Ativos vs Passivos', 
    'fundamentos', 
    '10 min', 
    'Entenda a diferença fundamental entre o que coloca e o que tira dinheiro do seu bolso.',
    '<p>Você já se sentiu preso em um ciclo onde, não importa o quanto ganhe, o dinheiro nunca parece suficiente? Bem-vindo à "Matrix" financeira. A maioria das pessoas vive trabalhando pelo dinheiro, sem entender como fazê-lo trabalhar para elas.</p>
    
    <h2>A Diferença Vital</h2>
    <p>O conceito mais importante que você aprenderá hoje vem de Robert Kiyosaki, autor de "Pai Rico, Pai Pobre". A diferença entre ricos e pobres não é o salário, é o destino do dinheiro.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
            <h3 class="text-emerald-400 font-bold mb-2 flex items-center gap-2">✅ Ativos (Colocam dinheiro no bolso)</h3>
            <ul class="list-disc list-inside text-sm space-y-1 text-slate-300">
                <li>Ações (pagam dividendos)</li>
                <li>Fundos Imobiliários (aluguéis mensais)</li>
                <li>Títulos do Tesouro (juros semestrais/finais)</li>
                <li>Negócios automatizados</li>
                <li>Propriedade Intelectual (royalties)</li>
            </ul>
        </div>
        <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
            <h3 class="text-rose-400 font-bold mb-2 flex items-center gap-2">❌ Passivos (Tiram dinheiro do bolso)</h3>
            <ul class="list-disc list-inside text-sm space-y-1 text-slate-300">
                <li>Carro (combustível, seguro, IPVA)</li>
                <li>Casa própria cara (IPTU, manutenção)</li>
                <li>Assinaturas não utilizadas</li>
                <li>Empréstimos e financiamentos</li>
                <li>Cartão de crédito com juros</li>
            </ul>
        </div>
    </div>

    <h2>O Erro da Classe Média</h2>
    <p>A classe média tende a comprar passivos achando que são ativos. "Comprei um carro novo, é um investimento!" — Errado. É um passivo que gera IPVA, gasolina, seguro e depreciação. Não é proibido ter passivos, mas você precisa de ativos para pagá-los.</p>
    
    <h3>Exemplo Prático: O Carro de R$ 80.000</h3>
    <ul class="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Cenário A (Passivo):</strong> Você financia o carro. Paga juros ao banco, seguro, gasolina e manutenção. Sai dinheiro todo mês.</li>
        <li><strong>Cenário B (Ativo):</strong> Você compra o mesmo carro e o aluga para um motorista de aplicativo. O aluguel paga as despesas e sobra R$ 500 no seu bolso. O carro virou um ativo!</li>
    </ul>

    <blockquote>"Os ricos compram ativos. Os pobres têm apenas despesas. A classe média compra passivos pensando que são ativos."</blockquote>
    
    <h2>Exercício de Fixação</h2>
    <p>Pegue seu extrato bancário do último mês. Circule tudo o que foi gasto com passivos. Agora, pergunte-se: "Quantos ativos eu comprei este mês?". Se a resposta for zero, você está jogando o jogo errado.</p>',
    1
),
(
    'O Vilão Invisível', 
    'O Vilão Invisível: Inflação e Perda de Poder', 
    'fundamentos', 
    '8 min', 
    'Descubra como o dinheiro parado perde valor todos os dias e como se proteger.',
    '<p>Imagine que você guardou R$ 100,00 embaixo do colchão em 1994, no início do Plano Real. Hoje, esse mesmo dinheiro compraria menos de R$ 13,00 em mercadorias daquela época. Onde foi parar o resto? Foi devorado pelo "vilão invisível": a <strong>Inflação</strong>.</p>

    <h2>O que é Inflação?</h2>
    <p>Inflação é o aumento generalizado dos preços. Ela corrói o seu poder de compra. Se o seu dinheiro não está rendendo acima da inflação, você está, literalmente, ficando mais pobre a cada dia, mesmo que o saldo no banco não mude.</p>

    <h2>IPCA: O Termômetro</h2>
    <p>No Brasil, medimos a inflação oficial pelo <strong>IPCA</strong>. Isso é crucial para entender a Rentabilidade Real.</p>
    
    <div class="bg-slate-800/50 p-6 rounded-xl border border-white/10 my-6">
        <h3 class="font-bold text-lg mb-4 text-center">Simulação: A Ilusão do Lucro</h3>
        <div class="space-y-4">
            <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Rendimento da Poupança (exemplo):</span>
                <span class="text-emerald-400 font-mono">+6% a.a.</span>
            </div>
            <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Inflação no período (IPCA):</span>
                <span class="text-rose-400 font-mono">-5% a.a.</span>
            </div>
            <div class="flex justify-between font-bold pt-2">
                <span>Ganho Real (O que sobrou):</span>
                <span class="text-blue-400 font-mono text-lg">+1% a.a.</span>
            </div>
        </div>
        <p class="text-xs text-muted-foreground mt-4 text-center">Se a inflação fosse 7%, seu ganho real seria NEGATIVO (-1%), mesmo com o banco mostrando números verdes.</p>
    </div>
    
    <p><strong>Regra de Ouro:</strong> Seu primeiro objetivo como investidor não é ficar rico, é não ficar pobre. Você precisa bater a inflação. Para isso, existem títulos como o <strong>Tesouro IPCA+</strong>, que garantem pagar a inflação mais uma taxa fixa.</p>',
    2
),
(
    'O Escudo', 
    'O Escudo: Reserva de Emergência & Liquidez', 
    'fundamentos', 
    '12 min', 
    'Antes de atacar, é preciso saber se defender. Monte sua segurança financeira passo a passo.',
    '<p>Nenhum general vai para a guerra sem um escudo. No mundo dos investimentos, seu escudo é a <strong>Reserva de Emergência</strong>.</p>

    <h2>Para que serve?</h2>
    <p>O carro quebrou? Perdeu o emprego? Problema de saúde? A Reserva serve para que você não precise se endividar (pegando empréstimos caros) ou vender seus investimentos na hora errada para cobrir imprevistos.</p>

    <h2>Quanto preciso ter? (Cálculo Prático)</h2>
    <p>O cálculo é baseado no seu <strong>Custo de Vida Mensal</strong> (o mínimo para sobreviver: aluguel, comida, contas), não no seu salário.</p>
    
    <div class="overflow-x-auto my-6">
        <table class="w-full text-sm text-left border-collapse">
            <thead>
                <tr class="text-muted-foreground border-b border-white/10">
                    <th class="py-2">Perfil Profissional</th>
                    <th class="py-2">Meses Recomendados</th>
                    <th class="py-2">Exemplo (Custo R$ 3k)</th>
                </tr>
            </thead>
            <tbody class="text-slate-300">
                <tr class="border-b border-white/5">
                    <td class="py-3 font-medium">Funcionário Público / Estável</td>
                    <td class="py-3">3 a 6 meses</td>
                    <td class="py-3 text-emerald-400">R$ 9.000 - R$ 18.000</td>
                </tr>
                <tr class="border-b border-white/5">
                    <td class="py-3 font-medium">CLT (Privado)</td>
                    <td class="py-3">6 a 9 meses</td>
                    <td class="py-3 text-emerald-400">R$ 18.000 - R$ 27.000</td>
                </tr>
                <tr>
                    <td class="py-3 font-medium">Autônomo / Empreendedor</td>
                    <td class="py-3">12 meses</td>
                    <td class="py-3 text-emerald-400">R$ 36.000</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>Onde investir a Reserva?</h2>
    <p>Aqui a regra é clara: <strong>Segurança e Liquidez</strong> (facilidade de sacar). Rentabilidade NÃO importa aqui. Nunca coloque sua reserva em ações ou imóveis.</p>
    
    <div class="space-y-4 mt-4">
        <div class="bg-slate-900 p-4 rounded-lg border border-white/10">
            <h4 class="font-bold text-blue-400 mb-1">1. Tesouro Selic</h4>
            <p class="text-sm">O investimento mais seguro do país. Você empresta para o governo. Pode sacar qualquer dia útil e rende cerca de 100% da Selic.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-lg border border-white/10">
            <h4 class="font-bold text-purple-400 mb-1">2. CDB com Liquidez Diária</h4>
            <p class="text-sm">Oferecido por bancos (Nubank, Inter, Itaú, etc). Procure por "Liquidez Diária" e que pague "100% do CDI". Tem garantia do FGC até 250 mil.</p>
        </div>
    </div>
    
    <p class="mt-4 text-rose-400 text-sm font-bold">⚠️ Atenção: Evite a Poupança. Ela rende atualmente apenas 70% da Selic + TR. No Tesouro Selic ou CDB, você ganha 30% a mais com a mesma segurança.</p>',
    3
);

-- =================================================================================
-- MÓDULO 2: A CONSTRUÇÃO (FERRAMENTAS)
-- Foco: Conhecer as opções de investimento.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'A Regra do Jogo', 
    'A Regra do Jogo: Selic & Renda Fixa', 
    'pratica', 
    '12 min', 
    'Entenda a taxa mãe da economia e como emprestar dinheiro para o governo e bancos com segurança.',
    '<p>Bem-vindo ao mundo da Renda Fixa. Aqui, você é o banco. Na Renda Fixa, você empresta seu dinheiro para alguém (Governo, Bancos ou Empresas) em troca de uma taxa de juros acordada. O risco é baixo e a previsibilidade é alta.</p>

    <h2>A Taxa Selic: O Coração do Mercado</h2>
    <p>A Selic é a taxa básica de juros da economia, definida pelo Banco Central a cada 45 dias. Ela baliza todos os outros empréstimos.</p>
    <ul>
        <li><strong>Selic Alta (>10%):</strong> Ótimo para investir em Renda Fixa (ganhos fáceis e seguros). Ruim para a economia real (crédito caro).</li>
        <li><strong>Selic Baixa (<5%):</strong> Renda Fixa rende pouco. Investidores migram para a Bolsa e Imóveis em busca de retorno.</li>
    </ul>

    <h2>O Menu de Opções: Quem você quer financiar?</h2>
    
    <div class="overflow-x-auto my-6">
        <table class="w-full text-sm text-left border-collapse">
            <thead>
                <tr class="text-muted-foreground border-b border-white/10">
                    <th class="py-2 pl-2">Título</th>
                    <th class="py-2">Para quem empresta?</th>
                    <th class="py-2">Garantia</th>
                    <th class="py-2">Imposto de Renda</th>
                </tr>
            </thead>
            <tbody class="text-slate-300">
                <tr class="border-b border-white/5 bg-slate-900/50">
                    <td class="py-3 pl-2 font-bold text-emerald-400">Tesouro Direto</td>
                    <td class="py-3">Governo Federal</td>
                    <td class="py-3">Tesouro Nacional (Risco Soberano - Máxima)</td>
                    <td class="py-3 text-rose-400">Sim (Tabela Regressiva)</td>
                </tr>
                <tr class="border-b border-white/5">
                    <td class="py-3 pl-2 font-bold text-blue-400">CDB</td>
                    <td class="py-3">Bancos</td>
                    <td class="py-3">FGC (Até R$ 250k)</td>
                    <td class="py-3 text-rose-400">Sim</td>
                </tr>
                <tr class="border-b border-white/5 bg-slate-900/50">
                    <td class="py-3 pl-2 font-bold text-purple-400">LCI / LCA</td>
                    <td class="py-3">Setor Imob./Agro</td>
                    <td class="py-3">FGC (Até R$ 250k)</td>
                    <td class="py-3 text-emerald-400 font-bold">ISENTO (Pessoa Física)</td>
                </tr>
                 <tr>
                    <td class="py-3 pl-2 font-bold text-amber-400">LC (Financeira)</td>
                    <td class="py-3">Financeiras</td>
                    <td class="py-3">FGC (Até R$ 250k)</td>
                    <td class="py-3 text-rose-400">Sim</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <h3>Dica Prática: CDB vs LCI</h3>
    <p>Um CDB que paga 100% do CDI equivale, aproximadamente, a uma LCI que paga 85% do CDI (por causa do Imposto de Renda). Sempre faça essa conta antes de investir.</p>',
    4
),
(
    'Risco e Retorno', 
    'Risco e Retorno: Renda Variável & Volatilidade', 
    'pratica', 
    '15 min', 
    'Como se tornar sócio de grandes empresas e buscar retornos maiores aceitando a oscilação.',
    '<p>Se na Renda Fixa você empresta dinheiro, na Renda Variável você se torna <strong>sócio</strong>. Você compra um pedaço do negócio. Se o negócio vai bem, você lucra. Se vai mal, você perde. Não há garantia de retorno, mas o potencial é ilimitado.</p>

    <h2>O "Preço" do Ingresso: Volatilidade</h2>
    <p>Volatilidade é o quanto o preço sobe e desce todos os dias. Muitos iniciantes vendem tudo no primeiro dia de queda. Isso é um erro fatal.</p>
    
    <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 my-4">
        <h3 class="font-bold text-rose-400 mb-2">🛑 O Ciclo do Perdedor</h3>
        <ol class="list-decimal list-inside text-sm text-slate-300 space-y-2">
            <li>A Bolsa sobe muito e sai no Jornal Nacional.</li>
            <li>O investidor fica eufórico e compra na ALTA.</li>
            <li>A Bolsa corrige (cai) naturalmente.</li>
            <li>O investidor entra em pânico com o saldo vermelho.</li>
            <li>Ele VENDE na BAIXA e assume o prejuízo.</li>
        </ol>
    </div>

    <h2>Como ganhar dinheiro com Ações?</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-slate-900 p-4 rounded-lg border border-white/10">
            <h4 class="font-bold text-blue-400">1. Valorização (Cota)</h4>
            <p class="text-xs mt-1 text-slate-400">A empresa cresce, lucra mais, e o mercado paga mais por ela. Ex: Quem comprou Magazine Luiza em 2016 e segurou até 2020 multiplicou o capital por 100x.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-lg border border-white/10">
            <h4 class="font-bold text-emerald-400">2. Dividendos (Renda)</h4>
            <p class="text-xs mt-1 text-slate-400">A empresa reparte parte do lucro com você. Cai direto na conta e é ISENTO de IR. É o foco de quem quer viver de renda (Ex: Banco do Brasil, Taesa).</p>
        </div>
    </div>',
    5
),
(
    'Ovos na Cesta', 
    'Não coloque todos os ovos na mesma cesta: Diversificação', 
    'pratica', 
    '8 min', 
    'A técnica anti-quebra. Como proteger seu patrimônio de crises setorizadas.',
    '<p>Imagine que você investiu tudo em uma empresa de turismo. Veio a pandemia e a empresa caiu 90%. Seu patrimônio foi destruído. Agora, se você tivesse 20% em Turismo, 20% em Dólar, 20% em Farmácias e 40% em Renda Fixa, o impacto seria mínimo.</p>
    
    <h2>O Santo Graal: Correlação Negativa</h2>
    <p>Você busca ativos que se comportam de maneira diferente. Quando um cai, o outro sobe (ou segura as pontas).</p>

    <div class="bg-slate-800 p-6 rounded-xl border border-white/10 my-6">
        <h3 class="font-bold text-center mb-4">Exemplo de Carteira Equilibrada (Perfil Moderado)</h3>
        <div class="w-full h-4 bg-white/10 rounded-full overflow-hidden flex">
            <div class="h-full bg-emerald-500 w-[50%]" title="Renda Fixa"></div>
            <div class="h-full bg-blue-500 w-[25%]" title="Ações BR"></div>
            <div class="h-full bg-purple-500 w-[25%]" title="Investimento Internacional"></div>
        </div>
        <div class="flex justify-between text-xs mt-2 px-1 text-muted-foreground">
            <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-emerald-500"></div> 50% Segurança (RF)</div>
            <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-blue-500"></div> 25% Crescimento (Ações)</div>
            <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-purple-500"></div> 25% Proteção (Dólar/Ouro)</div>
        </div>
    </div>
    
    <p><strong>Rebalanceamento:</strong> Uma vez por ano, você vende o que subiu demais e compra o que ficou para trás, voltando às porcentagens originais. Isso te força a comprar na baixa e vender na alta automaticamente.</p>',
    6
);

-- =================================================================================
-- MÓDULO 3: A ESTRATÉGIA (EFICIÊNCIA)
-- Nota: Mudança de "Avançado" para "Estratégia".
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'O Tempo é Aliado', 
    'O Tempo é seu aliado: Juros Compostos no Longo Prazo', 
    'alta_performance', 
    '10 min', 
    'A oitava maravilha do mundo segundo Einstein. Veja o efeito bola de neve em números reais.',
    '<p>Albert Einstein teria dito: "Os juros compostos são a força mais poderosa do universo". Exagero ou não, matematicamente é verdade no mundo das finanças.</p>

    <h2>A Curva Exponencial: O "Hockey Stick"</h2>
    <p>Nos primeiros anos, o ganho parece pequeno. É a fase de acumulação. Mas existe um "ponto de virada" onde os juros que seu dinheiro gera começam a ser maiores que seus próprios aportes mensais. A partir daí, o crescimento é explosivo.</p>

    <h2>A Mágica em Números</h2>
    <p>Vamos simular um investimento de <strong>R$ 500,00 por mês</strong> a uma taxa média de <strong>10% ao ano</strong> (Renda Fixa ou Bolsa conservadora).</p>
    
    <div class="overflow-x-auto my-6">
        <table class="w-full text-sm text-center border-collapse">
            <thead>
                <tr class="text-muted-foreground border-b border-white/10">
                    <th class="py-2">Tempo</th>
                    <th class="py-2">Você Investiu</th>
                    <th class="py-2">Juros Gerados</th>
                    <th class="py-2 text-emerald-400 font-bold">Total Acumulado</th>
                </tr>
            </thead>
            <tbody class="text-slate-300">
                <tr class="border-b border-white/5">
                    <td class="py-3">5 anos</td>
                    <td class="py-3">R$ 30.000</td>
                    <td class="py-3">R$ 8.000</td>
                    <td class="py-3 text-emerald-400 font-bold">R$ 38.000</td>
                </tr>
                <tr class="border-b border-white/5">
                    <td class="py-3">10 anos</td>
                    <td class="py-3">R$ 60.000</td>
                    <td class="py-3">R$ 42.000</td>
                    <td class="py-3 text-emerald-400 font-bold">R$ 102.000</td>
                </tr>
                 <tr class="border-b border-white/5 bg-slate-900/50">
                    <td class="py-3">20 anos</td>
                    <td class="py-3">R$ 120.000</td>
                    <td class="py-3 text-yellow-400 font-bold">R$ 259.000</td>
                    <td class="py-3 text-emerald-400 font-bold">R$ 379.000</td>
                </tr>
                 <tr>
                    <td class="py-3">30 anos</td>
                    <td class="py-3">R$ 180.000</td>
                    <td class="py-3 text-yellow-400 font-bold">R$ 950.000</td>
                    <td class="py-3 text-emerald-400 font-bold text-lg">R$ 1.130.000</td>
                </tr>
            </tbody>
        </table>
    </div>

    <p>Perceba que em 30 anos, você tirou do bolso 180 mil, mas ganhou quase <strong>1 Milhão de reais</strong> "de graça" apenas pelos juros. O tempo é o multiplicador.</p>',
    7
),
(
    'O Leão e as Taxas', 
    'O Leão e as Taxas: Custos, IR e como pagar menos', 
    'alta_performance', 
    '12 min', 
    'Não deixe seus lucros serem comidos por taxas e impostos desnecessários.',
    '<p>Muitos investidores focam apenas na rentabilidade bruta e esquecem do que realmente importa: o dinheiro líquido no bolso. Um fundo ruim pode levar 40% do seu lucro embora sem você perceber.</p>

    <h2>Taxas Administrativas: O inimigo silencioso</h2>
    <p>Bancos adoram vender fundos com taxas de administração altas. </p>
    <ul class="list-disc list-inside space-y-2 mt-2 text-slate-300">
        <li><strong>Fuja:</strong> Fundos de Renda Fixa com taxa acima de 0,5% a.a.</li>
        <li><strong>Fuja:</strong> Títulos de Capitalização (isso não é investimento).</li>
        <li><strong>Cuidado:</strong> Previdência Privada com "Taxa de Carregamento".</li>
    </ul>

    <h2>Imposto de Renda (O Leão da Receita)</h2>
    <p>O governo é seu "sócio" obrigatório. Mas você pode diminuir a participação dele legalmente.</p>

    <div class="bg-slate-900 p-4 rounded-xl border border-white/10 my-6">
        <h4 class="font-bold mb-2">Tabela Regressiva da Renda Fixa</h4>
        <p class="text-sm text-muted-foreground mb-4">Vale para CDB, Tesouro Direto, LC. Quanto mais tempo o dinheiro fica, menos imposto você paga sobre o lucro.</p>
        <div class="grid grid-cols-2 gap-y-2 text-sm">
            <div class="border-b border-white/5 pb-1">Até 180 dias</div>
            <div class="border-b border-white/5 pb-1 text-rose-400 font-bold">22,5%</div>
            
            <div class="border-b border-white/5 pb-1">De 181 a 360 dias</div>
            <div class="border-b border-white/5 pb-1 text-rose-300">20,0%</div>
            
            <div class="border-b border-white/5 pb-1">De 361 a 720 dias</div>
            <div class="border-b border-white/5 pb-1 text-yellow-300">17,5%</div>
            
            <div class="pt-1">Acima de 720 dias</div>
            <div class="pt-1 text-emerald-400 font-bold">15,0%</div>
        </div>
    </div>

    <h3>Isenções Importantes (Para aproveitar!)</h3>
    <ul class="list-none space-y-3 mt-4">
        <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><strong>Ações (Swing Trade):</strong> Vendas de até R$ 20.000,00 no mês são ISENTAS de IR sobre o lucro.</span>
        </li>
        <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><strong>Dividendos:</strong> Todos os dividendos de Ações e FIIs são ISENTOS de IR para Pessoa Física atualmente.</span>
        </li>
        <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><strong>LCI / LCA / Debêntures Incentivadas:</strong> Totalmente ISENTAS de IR.</span>
        </li>
    </ul>',
    8
);

-- =================================================================================
-- TRILHAS EXTRAS (ESPECIALISTA)
-- Desbloqueadas após o curso base ou interações específicas.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
-- TRILHA FIIs
(
    'Tijolo vs Papel', 
    'O que são Tijolo e Papel?', 
    'especialista-fii', 
    '10 min', 
    'Fundos Imobiliários: Entenda as duas grandes categorias para montar uma carteira sólida.',
    '<p>Nos Fundos Imobiliários (FIIs), você pode investir em imóveis físicos ou em dívidas do setor. Entender essa diferença é vital.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
            <h3 class="text-amber-400 font-bold mb-2 flex items-center gap-2">🧱 FIIs de Tijolo</h3>
            <p class="text-sm text-slate-300 mb-2">Dono de imóveis reais (Shoppings, Galpões, Lajes Corporativas).</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-slate-400">
                <li><strong>Renda:</strong> Aluguéis dos inquilinos.</li>
                <li><strong>Vantagem:</strong> O imóvel valoriza com o tempo (proteção contra inflação).</li>
                <li><strong>Risco:</strong> Vacância (imóvel ficar vazio).</li>
            </ul>
        </div>
        <div class="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
            <h3 class="text-blue-400 font-bold mb-2 flex items-center gap-2">📄 FIIs de Papel</h3>
            <p class="text-sm text-slate-300 mb-2">Dono de dívidas (CRIs). É como ser o banco do setor imobiliário.</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-slate-400">
                <li><strong>Renda:</strong> Juros pagos pelos devedores.</li>
                <li><strong>Vantagem:</strong> Dividendos costumam ser maiores (ex: IPCA + 6%).</li>
                <li><strong>Risco:</strong> Calote (devedor não pagar) e não tem imóvel físico para vender.</li>
            </ul>
        </div>
    </div>',
    9
),
(
    'Relatório Gerencial', 
    'Como ler um Relatório Gerencial', 
    'especialista-fii', 
    '12 min', 
    'O documento mais importante para o investidor de FIIs. Aprenda a identificar problemas.',
    '<p>Não compre um FII apenas pelo seu Dividend Yield. Todo mês, o gesto publica o Relatório Gerencial. Baixe e leia!</p>
    
    <h2>Checklist de Auditoria</h2>
    <div class="space-y-4">
        <div class="bg-slate-900 p-4 rounded-lg border-l-4 border-emerald-500">
            <h4 class="font-bold">1. Vacância Física</h4>
            <p class="text-sm text-slate-400">Quantos % da área está vazia? Vacância subindo consistentemente é um péssimo sinal.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 class="font-bold">2. Cronograma de Vencimento</h4>
            <p class="text-sm text-slate-400">Quando vencem os contratos? Se 30% da receita vence este ano, há risco do inquilino sair ou renegociar para baixo.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-lg border-l-4 border-rose-500">
            <h4 class="font-bold">3. Alavancagem</h4>
            <p class="text-sm text-slate-400">O fundo tem dívidas? Dívidas altas em cenário de juros altos podem destruir os dividendos.</p>
        </div>
    </div>',
    10
),
(
    'Dividend Yield vs Valorização', 
    'Dividend Yield vs Valorização: A Ilusão', 
    'especialista-fii', 
    '8 min', 
    'Cuidado com dividendos altos artificialmente. O barato pode sair caro.',
    '<p>Um DY (Dividend Yield) muito alto (ex: 18% ao ano) costuma ser uma armadilha. O mercado não deixa dinheiro na mesa.</p>
    
    <h2>A Matemática da Armadilha</h2>
    <p>O DY é calculado assim: <code>(Dividendos pagos nos últimos 12 meses) / (Preço da Cota)</code>.</p>
    
    <div class="bg-rose-900/20 p-4 rounded border border-rose-500/30 my-4 text-center">
        <p class="font-mono text-lg mb-2">Cenário: O Fundo está quebrando.</p>
        <p class="text-sm text-slate-300">A cota cai de R$ 100 para R$ 50 porque o mercado está vendendo em pânico.</p>
        <p class="text-sm text-slate-300 mt-2">O dividendo passado ainda consta no cálculo.</p>
        <p class="font-bold text-rose-400 mt-2 text-xl">Resultado: O DY dispara para 20%!</p>
    </div>
    
    <p>Quem compra olhando só o DY compra um fundo falido achando que está fazendo um ótimo negócio.</p>',
    11
),

-- TRILHA AÇÕES (MASTER)
(
    'Indicadores Básicos', 
    'P/L, ROE e P/VP (Sopa de Letrinhas)', 
    'especialista-acao', 
    '15 min', 
    'Os três filtros fundamentais para separar empresas boas das ruins.',
    '<p>Como saber se uma ação está barata ou cara sem "chutar"? Usando indicadores.</p>
    
    <div class="overflow-x-auto my-6">
        <table class="w-full text-sm text-left border-collapse">
            <thead>
                <tr class="text-muted-foreground border-b border-white/10">
                    <th class="py-2">Indicador</th>
                    <th class="py-2">Significado</th>
                    <th class="py-2">O que buscar?</th>
                </tr>
            </thead>
            <tbody class="text-slate-300">
                <tr class="border-b border-white/5">
                    <td class="py-3 font-bold text-blue-400">P/L (Preço/Lucro)</td>
                    <td class="py-3">Em quantos anos o lucro da empresa "paga" o preço da ação.</td>
                    <td class="py-3">Menor é "mais barato". (Cuidado com P/L negativo = prejuízo).</td>
                </tr>
                <tr class="border-b border-white/5">
                    <td class="py-3 font-bold text-purple-400">P/VP</td>
                    <td class="py-3">Preço sobre o Patrimônio Líquido (se a empresa fechasse hoje).</td>
                    <td class="py-3">Perto de 1.0 é justo. Abaixo de 1.0 é desconto (ou problema).</td>
                </tr>
                <tr>
                    <td class="py-3 font-bold text-emerald-400">ROE</td>
                    <td class="py-3">Retorno sobre Patrimônio (Eficiência).</td>
                    <td class="py-3">Maior que 15%. Mostra que a empresa é uma máquina de lucros.</td>
                </tr>
            </tbody>
        </table>
    </div>',
    12
),
(
    'Small Caps vs Blue Chips', 
    'Small Caps vs Blue Chips', 
    'especialista-acao', 
    '10 min', 
    'Gigantes estáveis ou pequenas promessas explosivas? Onde colocar seu risco.',
    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div>
            <h2 class="text-blue-400 border-b border-blue-400/30 pb-2 mb-2">🐘 Blue Chips</h2>
            <p class="text-sm mb-2">Gigantes consolidadas (Itaú, Vale, Ambev).</p>
            <ul class="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Lucro constante e previsível.</li>
                <li>Pagadoras de dividendos.</li>
                <li>Baixa volatilidade (para a Bolsa).</li>
                <li><strong>Ideal para:</strong> Preservação de patrimônio e Renda.</li>
            </ul>
        </div>
        <div>
            <h2 class="text-orange-400 border-b border-orange-400/30 pb-2 mb-2">🚀 Small Caps</h2>
            <p class="text-sm mb-2">Empresas menores com potencial de explosão.</p>
            <ul class="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Podem dobrar ou triplicar de tamanho.</li>
                <li>Altíssimo risco e volatilidade violenta.</li>
                <li>Geralmente reinvestem o lucro (não pagam dividendo).</li>
                <li><strong>Ideal para:</strong> Multiplicação de capital (pimenta na carteira).</li>
            </ul>
        </div>
    </div>',
    13
),
(
    'Análise de Setores', 
    'Análise de Setores: Cíclicos e Perenes', 
    'especialista-acao', 
    '8 min', 
    'Entenda onde você está pisando. Nem todas as ações reagem igual à economia.',
    '<h2>Setores Perenes (A prova de balas)</h2>
    <p>Vendem coisas que as pessoas precisam, independentemente da crise. São ótimos para iniciantes.</p>
    <ul class="flex flex-wrap gap-2 my-2">
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">⚡ Energia</li>
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">🏦 Bancos</li>
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">💧 Saneamento</li>
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">🛡️ Seguros</li>
    </ul>

    <h2>Setores Cíclicos (Sobe e Desce)</h2>
    <p>Dependem de a economia estar bombando. Se o PIB cai, elas despencam 50%.</p>
    <ul class="flex flex-wrap gap-2 my-2">
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">🛍️ Varejo</li>
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">🏗️ Construção</li>
        <li class="bg-slate-800 px-3 py-1 rounded-full text-xs border border-white/10">✈️ Turismo</li>
    </ul>',
    14
),

-- TRILHA RENDA FIXA TURBINADA
(
    'Marcação a Mercado', 
    'Marcação a Mercado: Ganhando com a queda dos juros', 
    'especialista-rf', 
    '15 min', 
    'O segredo para ter retornos de Bolsa na Renda Fixa. Entenda a gangorra.',
    '<p>Você sabia que seu Tesouro IPCA pode valorizar 30% ou 40% em um ano? Isso acontece devido à <strong>Marcação a Mercado</strong>.</p>
    
    <h2>A Gangorra dos Juros</h2>
    <p>O preço do título e a taxa de juros funcionam como uma gangorra:</p>
    <div class="flex items-center justify-around bg-slate-800 p-6 rounded-xl my-4">
        <div class="text-center">
            <p class="text-rose-400 font-bold text-xl">Taxa Sobe ⬆️</p>
            <p class="text-xs text-muted-foreground">Preço do Título Cai ⬇️</p>
        </div>
        <div class="h-10 w-[2px] bg-white/20"></div>
        <div class="text-center">
            <p class="text-emerald-400 font-bold text-xl">Taxa Cai ⬇️</p>
            <p class="text-xs text-muted-foreground">Preço do Título Sobe ⬆️</p>
        </div>
    </div>
    
    <p><strong>A Estratégia:</strong> Comprar títulos prefixados ou IPCA+ quando os juros estão MUITO ALTOS. Quando o Banco Central começar a cortar os juros, seu título vai valorizar muito e você pode vender antecipadamente com lucro de capitais.</p>',
    15
),
(
    'Debêntures e Crédito', 
    'Debêntures e Risco de Crédito', 
    'especialista-rf', 
    '10 min', 
    'Emprestando para empresas, não para bancos. Maior risco, maior retorno.',
    '<p>Debêntures são títulos de dívida emitidos por empresas (não bancos). Ao comprar uma debênture da Vale ou da Petrobras, você empresta dinheiro para elas.</p>
    
    <h2>O Incentivo Fiscal</h2>
    <p>As <strong>Debêntures Incentivadas</strong> são usadas para financiar infraestrutura (estradas, energia, portos) e, por isso, o governo dá <strong>ISENÇÃO TOTAL de IR</strong>.</p>

    <h2>O Perigo: Risco de Crédito</h2>
    <p>Diferente do CDB, a Debênture <strong>NÃO TEM FGC</strong>. Se a empresa quebrar, você entra na fila de credores e pode ficar sem receber. Por isso, nunca coloque todo seu dinheiro aqui e analise o <strong>Rating</strong> (nota de crédito) da empresa.</p>',
    16
);

-- INSERIR TERMOS (EXEMPLOS SELECIONADOS PARA POPULAR)
-- Nota: Limparemos e inseriremos apenas alguns essenciais para compatibilidade.
-- O usuário pode pedir para popular mais termos depois.
INSERT INTO terms (acronym, name, explanation_simple, explanation_full, category, lesson_id, example, tip) VALUES
-- MÓDULO 1
-- AULA 1: MATRIX
('ATIVOS', 'Ativos', 'Tudo que coloca dinheiro no seu bolso.', 'Bens ou direitos que geram renda passiva ou valorização ao longo do tempo. É a chave para a riqueza.', 'fundamentos', 1, 'Imóveis alugados, Ações que pagam dividendos, Títulos Públicos.', 'Foque em adquirir ativos antes de passivos.'),
('PASSIVOS', 'Passivos', 'Tudo que tira dinheiro do seu bolso.', 'Bens que geram despesas de manutenção, impostos ou desvalorização. Não são investimentos.', 'fundamentos', 1, 'Carro de uso pessoal, Casa de praia que não aluga, Dívidas de cartão.', 'Reduza seus passivos para sobrar dinheiro para ativos.'),

-- AULA 2: INFLAÇÃO
('IPCA', 'Índice Nacional de Preços ao Consumidor Amplo', 'A inflação oficial do Brasil.', 'Mede a variação de preços de uma cesta de produtos e serviços consumidos pelas famílias. Corrói o poder de compra.', 'economia', 2, 'Se o IPCA é 10%, seu dinheiro compra 10% menos coisas.', 'Busque investimentos IPCA+ para se proteger.'),
('RENT REAL', 'Rentabilidade Real', 'O quanto você ganhou acima da inflação.', 'É o retorno do seu investimento subtraído da inflação do período. É o único ganho que te deixa mais rico.', 'indicadores', 2, 'Rendimento de 10% com inflação de 6% gera ganho real de 4%.', 'Sempre calcule o ganho real, não o nominal.'),

-- AULA 3: RESERVA (Aqui entram os pedidos do usuário)
('SELIC', 'Taxa Selic', 'A taxa básica de juros da economia.', 'Definida pelo Banco Central. É a referência para todos os juros do país. Quando sobe, a Renda Fixa rende mais.', 'economia', 3, 'O Tesouro Selic rende, aproximadamente, o valor da taxa Selic.', 'Ótima para Reserva de Emergência.'),
('TESOURO', 'Tesouro Direto', 'Plataforma para emprestar dinheiro ao Governo.', 'O investimento mais seguro do país (Risco Soberano). Você compra títulos da dívida pública.', 'seguranca', 3, 'Tesouro Selic, Tesouro IPCA+, Tesouro Prefixado.', 'Ideal para começar a investir com pouco dinheiro.'),
('LIQUIDEZ', 'Liquidez', 'A velocidade para transformar investimento em dinheiro.', 'A facilidade com que você consegue resgatar seu dinheiro sem perda de valor. Liquidez diária cai na conta no mesmo dia.', 'fundamentos', 3, 'A Poupança e o Tesouro Selic têm alta liquidez. Um Imóvel tem baixa liquidez.', 'Para Reserva de Emergência, exija Liquidez Diária.'),
('CDB', 'Certificado de Depósito Bancário', 'Empréstimo para o banco.', 'Você empresta dinheiro para o banco e ele te devolve com juros. É garantido pelo FGC.', 'renda_fixa', 3, 'CDB do Nubank, CDB do Banco Inter.', 'CDBs de bancos menores costumam pagar mais.'),

-- AULA 4: REGRA DO JOGO (RENDA FIXA)
('CDI', 'Certificado de Depósito Interbancário', 'A taxa que os bancos usam entre si.', 'Muitos investimentos de Renda Fixa rendem uma % do CDI. Ele anda sempre muito próximo da Selic.', 'economia', 4, 'Um CDB 100% do CDI rende praticamente a mesma coisa que a Selic.', NULL),
('FGC', 'Fundo Garantidor de Créditos', 'O seguro dos investimentos.', 'Garante até R$ 250 mil por CPF por instituição financeira em caso de falência do banco.', 'seguranca', 4, 'Se o banco quebrar, o FGC devolve seu dinheiro investido em CDB, LCI ou LCA.', 'Tesouro Direto não tem FGC, pois é do Governo.'),
('LCI/LCA', 'Letras de Crédito (Imobiliário/Agro)', 'Investimentos isentos de Imposto de Renda.', 'Títulos emitidos por bancos para financiar imóveis ou agronegócio. Pessoa física não paga IR sobre o lucro.', 'renda_fixa', 4, 'LCI 90% do CDI equivale a um CDB de 110% do CDI (com IR).', 'Compare sempre com a taxa equivalente do CDB.'),

-- AULA 5: RISCO E RETORNO
('VOLATILADE', 'Volatilidade', 'O quanto o preço sobe e desce.', 'Indica o risco de oscilação de um ativo. Alta volatilidade significa grandes variações de preço em curto prazo.', 'indicadores', 5, 'Ações e Criptomoedas têm alta volatilidade. Poupança tem volatilidade zero.', 'Não confunda volatilidade com risco de perda permanente.'),
('DIVIDENDOS', 'Dividendos', 'Parte do lucro da empresa paga a você.', 'Distribuição de lucros aos acionistas. É isento de Imposto de Renda no Brasil.', 'renda_variavel', 5, 'Se você tem ações da Petrobras, recebe dividendos quando ela lucra.', 'Reinvista os dividendos para o efeito bola de neve.'),

-- AULA 6: DIVERSIFICAÇÃO
('CORRELACAO', 'Correlação', 'Como dois ativos se comportam juntos.', 'Correlação Negativa: Quando um sobe, o outro tende a cair. É o segredo da proteção.', 'indicadores', 6, 'Dólar e Bolsa Brasileira costumam ter correlação negativa.', 'Tenha ativos de classes diferentes (Ações, RF, Dólar).'),

-- MÓDULO 3
-- AULA 7: JUROS COMPOSTOS
('JUROS COMP', 'Juros Compostos', 'Lucro sobre lucro.', 'Quando os juros ganhos também passam a render juros no mês seguinte. É exponencial.', 'fundamentos', 7, 'Investir R$ 100 hoje vira R$ 110. No mês seguinte, rende sobre R$ 110.', 'O tempo é o fator mais importante.'),

-- AULA 8: TAXAS
('TAXA ADM', 'Taxa de Administração', 'O salário do gestor do fundo.', 'Valor cobrado anualmente por Fundos de Investimento para gerir seu dinheiro. Deduzido automaticamente.', 'taxas', 8, 'Fundo com taxa de 2% a.a. precisa render muito para valer a pena.', 'Evite taxas acima de 1% para Renda Fixa.'),
('TABELA REG', 'Tabela Regressiva', 'Quanto mais tempo, menos imposto.', 'Alíquota de IR para Renda Fixa: Começa em 22,5% e cai para 15% após 2 anos.', 'taxas', 8, 'Resgatar antes de 6 meses paga o maior imposto.', 'Segure o investimento por mais de 2 anos se possível.'),

-- AULA 9: FIIs
('TIJOLO', 'Fundo de Tijolo', 'FII dono de imóveis físicos.', 'O fundo compra prédios, shoppings ou galpões e ganha com aluguel.', 'renda_variavel', 9, 'Fundo que é dono de 5 Shoppings.', 'Melhor proteção contra inflação no longo prazo.'),
('PAPEL', 'Fundo de Papel', 'Fundo de dívida imobiliária.', 'O fundo compra CRIs (dívidas) e ganha com os juros.', 'renda_variavel', 9, 'Fundo que financia a construção de prédios.', 'Paga dividendos maiores, mas não valoriza tanto a cota.'),

-- AULA 10: RELATÓRIO
('VACANCIA', 'Vacância', 'Imóvel vazio.', 'Porcentagem da área locável do fundo que não está alugada. Vacância alta = Menos aluguel = Prejuízo.', 'indicadores', 10, 'Fundo de lajes corporativas com 30% de vacância.', 'Fique alerta se a vacância subir constantemente.'),

-- AULA 11: DY
('DY', 'Dividend Yield', 'Rendimento dos dividendos.', 'Quanto o ativo pagou de proventos em relação ao preço da cota nos últimos 12 meses.', 'indicadores', 11, 'Preço R$ 100, Pagou R$ 10. DY = 10%.', 'Cuidado com DY muito alto, pode ser uma armadilha.'),

-- AULA 12: INDICADORES
('PL', 'P/L (Preço sobre Lucro)', 'Tempo de retorno do capital.', 'Resultado da divisão do preço da ação pelo lucro por ação. Indica se está cara ou barata.', 'indicadores', 12, 'P/L de 5 anos.', 'P/L histórico ajuda a saber se está barato.'),
('PVP', 'P/VP', 'Preço sobre Valor Patrimonial.', 'Se a empresa fosse liquidada hoje, quanto valeria? P/VP 1 é o valor justo.', 'indicadores', 12, 'P/VP 0.8 indica desconto de 20%.', 'FIIs de Papel devem ser comprados próximos de P/VP 1.0.'),
('ROE', 'Return on Equity', 'Retorno sobre o Patrimônio.', 'Mede a eficiência da empresa em gerar lucro com o dinheiro dos sócios.', 'indicadores', 12, 'ROE de 20% significa que a cada R$ 100 investidos, a empresa lucra R$ 20.', 'Busque empresas com ROE acima de 15%.'),

-- AULA 13: SMALL CAPS
('BLUE CHIP', 'Blue Chip', 'Empresa gigante e consolidada.', 'Líderes de mercado, lucros constantes, pagam dividendos. Menor risco.', 'renda_variavel', 13, 'Itaú, Vale, Petrobras, Ambev.', 'Base da carteira de ações.'),
('SMALL CAP', 'Small Cap', 'Empresa pequena com potencial.', 'Empresas menores na bolsa. Podem crescer muito ou quebrar. Maior risco e volatilidade.', 'renda_variavel', 13, 'Empresas de tecnologia menores, varejo em expansão.', 'Use como "pimenta" na carteira.'),

-- AULA 14: SETORES
('PERENES', 'Setores Perenes', 'Setores à prova de crise.', 'Empresas que vendem serviços essenciais (energia, água, bancos, seguros). Lucros previsíveis.', 'especialista-acao', 14, 'Taesa (Energia), Sanepar (Água).', 'Ideais para quem busca dividendos constantes.'),
('CICLICOS', 'Setores Cíclicos', 'Dependem da economia.', 'Varejo, construção, turismo. Sobem muito quando o PIB cresce, caem muito na crise.', 'especialista-acao', 14, 'Magazine Luiza (Varejo), CVC (Turismo).', 'Exigem timing: comprar na baixa do ciclo.'),

-- AULA 15: MARCAÇÃO A MERCADO
('PREFIXADO', 'Prefixado', 'Taxa combinada na hora.', 'Você sabe exatamente quanto vai receber no vencimento se segurar até o fim.', 'renda_fixa', 15, 'Tesouro Prefixado 12% a.a.', 'Se vender antes, sofre marcação a mercado.'),
('IPCA+', 'Tesouro IPCA+', 'Inflação + Taxa Fixa.', 'Garante o poder de compra e um ganho real. O melhor para aposentadoria.', 'renda_fixa', 15, 'Tesouro IPCA+ 6% (Paga a inflação + 6%).', 'Proteção blindada contra inflação no longo prazo.'),

-- AULA 16: CRÉDITO
('DEBENTURE', 'Debênture', 'Empréstimo para empresa.', 'Título de dívida de empresas privadas. Risco maior que banco, mas paga mais.', 'renda_fixa', 16, 'Debêntures da Vale para financiar ferrovia.', 'Debêntures Incentivadas não têm IR.'),
('RATING', 'Rating', 'Nota de crédito.', 'Nota dada por agências de risco (AAA, AA, B, C...) sobre a capacidade da empresa pagar a dívida.', 'indicadores', 16, 'Rating AAA é o mais seguro.', 'Nunca compre debênture sem ver o Rating.');
