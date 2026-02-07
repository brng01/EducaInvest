import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, DollarSign, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { MarketRates } from "@/pages/Simular"; 
import { cn } from "@/lib/utils";

interface ComparatorProps {
  rates: MarketRates;
}

export function InvestmentComparator({ rates }: ComparatorProps) {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(1);

  // Lógica de Cálculo
  const results = useMemo(() => {
    const calculate = (annualRatePercentage: number, isTaxFree: boolean = false) => {
      const rateDecimal = annualRatePercentage / 100;
      const gross = amount * Math.pow(1 + rateDecimal, years);
      
      let irRate = 0.15;
      if (years <= 0.5) irRate = 0.225;
      else if (years <= 1.0) irRate = 0.20;
      else if (years <= 2.0) irRate = 0.175;
      
      const profit = gross - amount;
      const tax = isTaxFree ? 0 : profit * irRate;
      const net = gross - tax;
      
      return {
        gross,
        profit,
        tax,
        net,
        rate: annualRatePercentage,
      };
    };

    return {
      poupanca: calculate(rates.poupanca, true),
      cdb: calculate(rates.cdi, false),          
      tesouro: calculate(rates.selic, false),    
    };
  }, [amount, years, rates]);

  // Formatação Padronizada (Sempre 2 casas decimais)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Formatação para o Input (Sempre 2 casas decimais)
  const formatNumberDisplay = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: number) => void) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setter(Number(rawValue));
  };

  const bestOption = Object.entries(results).reduce((best, [key, value]) => {
    return value.net > results[best as keyof typeof results].net ? key : best;
  }, "poupanca" as keyof typeof results);

  const investments = [
    {
      key: "poupanca",
      name: "Poupança",
      emoji: "🐷",
      description: "Isento de IR",
      result: results.poupanca,
    },
    {
      key: "cdb",
      name: "CDB do Banco",
      emoji: "🏦",
      description: "100% do CDI",
      result: results.cdb,
    },
    {
      key: "tesouro",
      name: "Tesouro Direto",
      emoji: "🏛️",
      description: "Tesouro Selic",
      result: results.tesouro,
    },
  ];

  return (
    <div className="space-y-8 text-foreground">
      
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* --- INPUTS --- */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-slate-300">Valor a Investir</span>
             </div>
             
             <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-semibold text-sm pointer-events-none">
                  R$
                </span>
                <Input 
                  type="text"
                  value={formatNumberDisplay(amount)}
                  onChange={(e) => handleInputChange(e, setAmount)}
                  className="h-10 pl-9 pr-3 text-right font-medium bg-primary/5 border-primary/20 text-primary rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-primary/30"
                />
             </div>
          </div>
          <Slider
            value={[amount]}
            min={100}
            max={500000}
            step={100}
            onValueChange={(v) => setAmount(v[0])}
            className="py-2 cursor-pointer"
          />
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-slate-300">Tempo Investido</span>
             </div>
             
             <div className="relative w-32">
                <Input 
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="h-10 pl-3 pr-12 text-right font-medium bg-primary/5 border-primary/20 text-primary rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px] text-primary/70 font-medium text-xs pointer-events-none uppercase tracking-wide">
                  {years === 1 ? "ano" : "anos"}
                </span>
             </div>
          </div>
          <Slider
            value={[years]}
            min={1}
            max={30}
            step={1}
            onValueChange={(v) => setYears(v[0])}
            className="py-2 cursor-pointer"
          />
        </div>
      </div>

      {/* --- CARDS DE COMPARAÇÃO --- */}
      <div className="grid md:grid-cols-3 gap-4 pt-4">
        {investments.map((inv, index) => {
          const isBest = inv.key === bestOption;
          return (
            <motion.div
              key={inv.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border",
                isBest
                  ? "bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] ring-1 ring-emerald-500/20"
                  : "bg-slate-800/40 border-white/5 hover:border-white/10"
              )}
            >
              {isBest && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3 h-3" />
                  Melhor Opção
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-4xl mb-3 filter drop-shadow-md">{inv.emoji}</div>
                <h3 className="font-display font-bold text-lg text-white">
                  {inv.name}
                </h3>
                <div className="flex justify-center items-center gap-2 mt-2">
                   <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-muted-foreground border border-white/5">
                      {inv.result.rate.toFixed(2)}% a.a.
                   </span>
                   <span className="text-[10px] text-muted-foreground">{inv.description}</span>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Valor Bruto</span>
                  <span className="text-slate-200">{formatCurrency(inv.result.gross)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">IR Estimado</span>
                  <span className={cn("font-medium", inv.result.tax > 0 ? "text-rose-400" : "text-emerald-400")}>
                    {inv.result.tax > 0 ? `-${formatCurrency(inv.result.tax)}` : "Isento"}
                  </span>
                </div>
                
                <div className="h-px bg-white/5 my-2" />

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                     <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Valor Líquido</span>
                     <span className={cn("text-xl font-bold", isBest ? "text-emerald-400" : "text-white")}>
                        {formatCurrency(inv.result.net)}
                     </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-400/5 p-2 rounded-lg border border-emerald-400/10">
                   <TrendingUp className="w-3 h-3" />
                   <span>Lucro: +{formatCurrency(inv.result.profit)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Como funciona o cálculo:</strong> As taxas utilizadas (Selic: {rates.selic}%, CDI: {rates.cdi}%, Poupança: {rates.poupanca}%) são baseadas nos dados reais de mercado mais recentes. 
          O Imposto de Renda segue a tabela regressiva oficial (22,5% a 15%) dependendo do tempo investido. A Poupança é isenta.
        </p>
      </div>
    </div>
  );
}
