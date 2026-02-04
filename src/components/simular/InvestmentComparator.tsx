import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Info, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InvestmentComparator() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(1);

  // Current rates (approximate - these would be fetched from an API in production)
  const rates = {
    poupanca: 0.065, // ~6.5% (70% SELIC + TR)
    cdb: 0.11, // ~11% (100% CDI approximation)
    tesouro: 0.1175, // ~11.75% (Tesouro Selic)
  };

  const results = useMemo(() => {
    const calculate = (rate: number) => {
      const gross = amount * Math.pow(1 + rate, years);
      // IR rates: 22.5% (up to 180 days), 20% (181-360), 17.5% (361-720), 15% (720+)
      let irRate = 0.15;
      if (years <= 0.5) irRate = 0.225;
      else if (years <= 1) irRate = 0.20;
      else if (years <= 2) irRate = 0.175;
      
      const profit = gross - amount;
      const tax = profit * irRate;
      const net = gross - tax;
      
      return {
        gross,
        profit,
        tax,
        net,
        rate,
      };
    };

    const poupanca = {
      ...calculate(rates.poupanca),
      tax: 0, // Poupança is tax-free
      net: amount * Math.pow(1 + rates.poupanca, years),
    };
    poupanca.profit = poupanca.net - amount;

    return {
      poupanca,
      cdb: calculate(rates.cdb),
      tesouro: calculate(rates.tesouro),
    };
  }, [amount, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Find the best option
  const bestOption = Object.entries(results).reduce((best, [key, value]) => {
    return value.net > results[best as keyof typeof results].net ? key : best;
  }, "poupanca" as keyof typeof results);

  const investments = [
    {
      key: "poupanca",
      name: "Poupança",
      emoji: "🐷",
      description: "A mais tradicional, isenta de IR",
      result: results.poupanca,
      color: "bg-muted",
    },
    {
      key: "cdb",
      name: "CDB do Banco",
      emoji: "🏦",
      description: "100% do CDI, com IR",
      result: results.cdb,
      color: "bg-primary/10",
    },
    {
      key: "tesouro",
      name: "Tesouro Direto",
      emoji: "🏛️",
      description: "Tesouro Selic, com IR",
      result: results.tesouro,
      color: "bg-success/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="amount">Valor a Investir</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Quanto você quer investir uma única vez
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="pl-10"
            />
          </div>
          <Slider
            value={[amount]}
            onValueChange={([value]) => setAmount(value)}
            min={1000}
            max={100000}
            step={1000}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="comp-years">Período (anos)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Por quanto tempo vai deixar investido
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="comp-years"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min={1}
            max={30}
          />
          <Slider
            value={[years]}
            onValueChange={([value]) => setYears(value)}
            min={1}
            max={10}
            step={1}
            className="mt-2"
          />
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {investments.map((inv, index) => {
          const isBest = inv.key === bestOption;
          return (
            <motion.div
              key={inv.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border p-6 transition-all ${
                isBest
                  ? "border-success bg-success/5 ring-2 ring-success/20"
                  : "border-border bg-card"
              }`}
            >
              {isBest && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Melhor Opção
                </div>
              )}

              <div className="text-center mb-4">
                <span className="text-3xl">{inv.emoji}</span>
                <h3 className="font-display font-semibold text-lg mt-2">
                  {inv.name}
                </h3>
                <p className="text-xs text-muted-foreground">{inv.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxa</span>
                  <span className="font-medium">{formatPercent(inv.result.rate)} a.a.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Valor Bruto</span>
                  <span className="font-medium">{formatCurrency(inv.result.gross)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">IR Retido</span>
                  <span className="font-medium text-destructive">
                    -{formatCurrency(inv.result.tax)}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Valor Líquido</span>
                    <span className={`font-display text-xl font-bold ${isBest ? "text-success" : ""}`}>
                      {formatCurrency(inv.result.net)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-muted-foreground">Lucro</span>
                    <span className="text-success font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{formatCurrency(inv.result.profit)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
        <p>
          <strong>💡 Nota:</strong> As taxas utilizadas são aproximações das taxas atuais de mercado. 
          O IR (Imposto de Renda) sobre investimentos segue a tabela regressiva: quanto mais tempo 
          investido, menor a alíquota. A poupança é isenta de IR.
        </p>
      </div>
    </div>
  );
}
