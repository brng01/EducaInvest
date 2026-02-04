import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Volume2, 
  TrendingUp, 
  Percent, 
  Building2, 
  Landmark, 
  PiggyBank,
  BarChart3,
  Wallet,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Level = "iniciante" | "intermediario" | "avancado";

export interface Term {
  id: string;
  name: string;
  acronym?: string;
  icon: React.ElementType;
  level: Level;
  explanation: string;
  example: string;
}

export const financialTerms: Term[] = [
  {
    id: "selic",
    name: "Taxa SELIC",
    acronym: "SELIC",
    icon: Percent,
    level: "iniciante",
    explanation: "É a taxa básica de juros da economia brasileira. Pense nela como o 'preço' do dinheiro no país. Quando a SELIC sobe, empréstimos ficam mais caros. Quando cai, fica mais barato pegar dinheiro emprestado.",
    example: "Se a SELIC está em 12% ao ano, investimentos em renda fixa tendem a pagar pelo menos esse valor. É como um 'piso' para os rendimentos.",
  },
  {
    id: "cdi",
    name: "CDI",
    acronym: "CDI",
    icon: TrendingUp,
    level: "iniciante",
    explanation: "Certificado de Depósito Interbancário. É uma taxa muito próxima da SELIC, usada como referência para a maioria dos investimentos de renda fixa. Quando você vê '100% do CDI', significa que vai render exatamente essa taxa.",
    example: "Um CDB que paga 110% do CDI rende um pouco mais que a taxa básica. É como ganhar 10% de bônus sobre o rendimento padrão!",
  },
  {
    id: "ipca",
    name: "IPCA",
    acronym: "IPCA",
    icon: BarChart3,
    level: "iniciante",
    explanation: "Índice de Preços ao Consumidor Amplo. É o índice oficial da inflação no Brasil. Mede quanto os preços subiram em média. Se seu investimento não render acima do IPCA, você está perdendo poder de compra.",
    example: "Se o IPCA foi de 5% no ano e seu investimento rendeu 8%, você teve um ganho real de aproximadamente 3% acima da inflação.",
  },
  {
    id: "cdb",
    name: "CDB",
    acronym: "CDB",
    icon: Building2,
    level: "iniciante",
    explanation: "Certificado de Depósito Bancário. É como se você emprestasse dinheiro para o banco, e ele te pagasse juros por isso. É um investimento de renda fixa, seguro e simples para começar.",
    example: "Você coloca R$ 1.000 em um CDB que paga 100% do CDI. Se o CDI for 12% ao ano, após 1 ano você terá aproximadamente R$ 1.120 (antes do IR).",
  },
  {
    id: "tesouro",
    name: "Tesouro Direto",
    icon: Landmark,
    level: "iniciante",
    explanation: "Programa do governo que permite você emprestar dinheiro para o Brasil e receber juros em troca. É considerado o investimento mais seguro do país, pois é garantido pelo governo federal.",
    example: "O Tesouro Selic é ótimo para reserva de emergência: rende próximo à SELIC, você pode resgatar a qualquer momento e não perde dinheiro.",
  },
  {
    id: "poupanca",
    name: "Poupança",
    icon: PiggyBank,
    level: "iniciante",
    explanation: "A caderneta de poupança é o investimento mais tradicional do Brasil. É muito seguro e fácil, mas geralmente rende menos que outras opções de renda fixa disponíveis.",
    example: "Atualmente, a poupança rende 70% da SELIC + TR quando a SELIC está acima de 8,5%. Isso significa que você consegue rendimentos melhores em outros investimentos tão seguros quanto.",
  },
  {
    id: "acoes",
    name: "Ações",
    icon: TrendingUp,
    level: "intermediario",
    explanation: "Quando você compra uma ação, está comprando um pedacinho de uma empresa. Se a empresa vai bem, sua ação valoriza. Se vai mal, pode desvalorizar. É um investimento de renda variável.",
    example: "Se você compra ações da Petrobras, você se torna sócio da empresa. Se o petróleo sobe e a empresa lucra mais, suas ações podem valorizar.",
  },
  {
    id: "fundos-imobiliarios",
    name: "Fundos Imobiliários",
    acronym: "FIIs",
    icon: Building2,
    level: "intermediario",
    explanation: "São fundos que investem em imóveis (shoppings, escritórios, galpões). Você recebe 'aluguéis' mensais sem precisar comprar um imóvel inteiro. Esses rendimentos geralmente são isentos de IR.",
    example: "Com R$ 100, você pode ser 'dono' de um pedacinho de um shopping e receber sua parte proporcional dos aluguéis todos os meses.",
  },
  {
    id: "diversificacao",
    name: "Diversificação",
    icon: Target,
    level: "intermediario",
    explanation: "É a estratégia de não colocar todo seu dinheiro em um único investimento. Distribuindo entre diferentes tipos, você reduz o risco de perder tudo se um deles for mal.",
    example: "Em vez de colocar R$ 10.000 só em ações, você divide: R$ 5.000 em renda fixa, R$ 3.000 em ações e R$ 2.000 em fundos imobiliários.",
  },
  {
    id: "liquidez",
    name: "Liquidez",
    icon: Wallet,
    level: "intermediario",
    explanation: "É a facilidade de transformar um investimento em dinheiro. Alta liquidez = você resgata rápido. Baixa liquidez = pode demorar ou ter custos para resgatar.",
    example: "A poupança tem alta liquidez: você saca na hora. Um imóvel tem baixa liquidez: pode levar meses para vender pelo preço justo.",
  },
  {
    id: "renda-variavel",
    name: "Renda Variável",
    icon: BarChart3,
    level: "avancado",
    explanation: "Investimentos onde o retorno não é previsível. Pode render muito ou pouco (ou até negativo). Inclui ações, fundos de ações, criptomoedas. Maior risco, mas potencial de maior retorno.",
    example: "Se você investiu R$ 1.000 em ações, pode terminar o ano com R$ 1.300 (lucro de 30%) ou R$ 800 (prejuízo de 20%). É variável!",
  },
  {
    id: "come-cotas",
    name: "Come-Cotas",
    icon: Percent,
    level: "avancado",
    explanation: "É uma antecipação de imposto de renda que acontece em maio e novembro em alguns fundos de investimento. O governo 'come' parte das suas cotas para cobrar o IR antecipado.",
    example: "Se você tem um fundo sujeito a come-cotas, a cada 6 meses o governo recolhe 15% do lucro, reduzindo seu número de cotas.",
  },
];

interface TermCardProps {
  term: Term;
}

const levelLabels = {
  iniciante: { label: "Iniciante", color: "bg-success/20 text-success"},
  intermediario: { label: "Intermediário", color: "bg-warning/20 text-warning"},
  avancado: { label: "Avançado", color: "bg-accent/20 text-accent"},
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const levelInfo = levelLabels[term.level];
  const IconComponent = term.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Collapsed State */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground">
              {term.acronym || term.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${levelInfo.color}`}>
              {levelInfo.emoji} {levelInfo.label}
            </span>
          </div>
          {term.acronym && (
            <p className="text-sm text-muted-foreground truncate">{term.name}</p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-border">
              <div className="pt-4 space-y-4">
                {/* Explanation */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    📖 Explicação Simplificada
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {term.explanation}
                  </p>
                </div>

                {/* Example */}
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    💡 Exemplo Prático
                  </h4>
                  <p className="text-foreground text-sm leading-relaxed">
                    {term.example}
                  </p>
                </div>

                {/* Audio Button */}
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Audio playback would be implemented here
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                  Ouvir Explicação
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
