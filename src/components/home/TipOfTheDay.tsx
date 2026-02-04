import { motion } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const tips = [
  {
    title: "A regra dos 50/30/20",
    content: "Divida sua renda: 50% para necessidades, 30% para desejos e 20% para economias e investimentos. É um ótimo ponto de partida!",
  },
  {
    title: "Comece pequeno, mas comece",
    content: "Mesmo R$ 50 por mês faz diferença. O importante é criar o hábito de investir regularmente.",
  },
  {
    title: "Reserva de emergência primeiro",
    content: "Antes de investir em renda variável, tenha de 3 a 6 meses de gastos guardados em investimentos seguros e líquidos.",
  },
  {
    title: "Tempo é seu maior aliado",
    content: "Graças aos juros compostos, quanto antes você começar, menos precisará investir para atingir seus objetivos.",
  },
  {
    title: "Diversifique seus investimentos",
    content: "Não coloque todos os ovos na mesma cesta. Distribua entre diferentes tipos de investimento para reduzir riscos.",
  },
];

export function TipOfTheDay() {
  const [currentTipIndex, setCurrentTipIndex] = useState(() => 
    Math.floor(Math.random() * tips.length)
  );

  const currentTip = tips[currentTipIndex];

  const handleNewTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tips.length);
    } while (newIndex === currentTipIndex);
    setCurrentTipIndex(newIndex);
  };

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Dica do Dia</h3>
                  <p className="text-xs text-muted-foreground">Atualizada diariamente</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewTip}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <motion.div
              key={currentTipIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <h4 className="font-display font-semibold text-xl mb-3 text-foreground">
                {currentTip.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentTip.content}
              </p>
            </motion.div>

            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTipIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTipIndex ? "bg-warning" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
