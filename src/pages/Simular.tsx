import { motion } from "framer-motion";
import { Calculator, Sparkles, Scale } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalculator } from "@/components/simular/CompoundInterestCalculator";
import { InvestmentComparator } from "@/components/simular/InvestmentComparator";

export default function Simular() {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-medium">Ferramentas de Simulação</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Simule seus investimentos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja na prática como seu dinheiro pode crescer. Use nossas calculadoras 
              para tomar decisões mais informadas.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="compound" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="compound" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Juros Compostos</span>
                  <span className="sm:hidden">Juros</span>
                </TabsTrigger>
                <TabsTrigger value="compare" className="gap-2">
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">Comparador</span>
                  <span className="sm:hidden">Comparar</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compound">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="font-display text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Juros Compostos: A Mágica do Tempo
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Veja como pequenos aportes mensais podem virar uma grande quantia com o tempo.
                    </p>
                  </div>
                  <CompoundInterestCalculator />
                </div>
              </TabsContent>

              <TabsContent value="compare">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="font-display text-xl font-bold flex items-center gap-2">
                      <Scale className="w-5 h-5 text-success" />
                      Comparador de Investimentos
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compare as opções mais comuns para iniciantes e veja qual rende mais.
                    </p>
                  </div>
                  <InvestmentComparator />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
