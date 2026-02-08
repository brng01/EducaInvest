import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, Scale, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalculator } from "@/components/simular/CompoundInterestCalculator";
import { InvestmentComparator } from "@/components/simular/InvestmentComparator";
import { supabase } from "@/integrations/supabase/client";

// Tipo para os dados de mercado
export interface MarketRates {
  selic: number;
  cdi: number;
  ipca: number;
  poupanca: number;
}

export default function Simular() {
  const [rates, setRates] = useState<MarketRates>({
    selic: 0,
    cdi: 0,
    ipca: 0,
    poupanca: 0
  });

  // Busca dados do Supabase ao carregar
  useEffect(() => {
    async function fetchRates() {
      const { data } = await supabase.from('dados_mercado').select('*');

      if (data) {
        // Transforma o array do banco em um objeto fácil de usar
        const newRates = {
          selic: data.find(d => d.ticker === 'SELIC')?.preco_atual || 0,
          cdi: data.find(d => d.ticker === 'CDI')?.preco_atual || 0,
          ipca: data.find(d => d.ticker === 'IPCA')?.preco_atual || 0,
          poupanca: data.find(d => d.ticker === 'POUPANCA')?.preco_atual || 0,
        };
        setRates(newRates);
      }
    }
    fetchRates();
  }, []);

  return (
    <Layout>
      <div className="py-12 md:py-16 bg-slate-950 min-h-screen">
        <div className="container mx-auto px-4">

          {/* Header com Animação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Calculator className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Simuladores Premium</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">
              Simule seu Futuro
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Utilize dados reais do mercado (Selic, CDI, IPCA) para projetar o crescimento do seu patrimônio com precisão.
            </p>
          </motion.div>

          {/* Tabs Estilizadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="compound" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-900/50 border border-white/10 p-1 rounded-full h-12">
                  <TabsTrigger
                    value="compound"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Juros Compostos
                  </TabsTrigger>
                  <TabsTrigger
                    value="compare"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all gap-2"
                  >
                    <Scale className="w-4 h-4" />
                    Comparador
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="compound">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  {/* Glow Effect */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                  <div className="mb-8 relative z-10">
                    <h2 className="font-display text-2xl font-bold flex items-center gap-3 text-white">
                      <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      Calculadora de Juros Compostos
                    </h2>
                  </div>

                  {/* Passamos as taxas reais para o componente */}
                  <CompoundInterestCalculator rates={rates} />
                </div>
              </TabsContent>

              <TabsContent value="compare">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold flex items-center gap-3 text-white">
                      <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <Scale className="w-5 h-5 text-emerald-400" />
                      </div>
                      Comparador de Investimentos
                    </h2>
                  </div>
                  <InvestmentComparator rates={rates} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
