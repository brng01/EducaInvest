import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function CompoundInterestCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    
    let compound = 0;
    let linear = 0;
    const chartData = [];

    for (let i = 0; i <= months; i++) {
      compound = monthlyInvestment * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate);
      linear = monthlyInvestment * i;
      
      if (i % 12 === 0) {
        chartData.push({
          year: i / 12,
          "Juros Compostos": Math.round(compound),
          "Sem Juros": Math.round(linear),
        });
      }
    }

    const totalInvested = monthlyInvestment * months;
    const totalInterest = compound - totalInvested;

    return {
      total: compound,
      invested: totalInvested,
      interest: totalInterest,
      chartData,
    };
  }, [monthlyInvestment, annualRate, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthly">Investimento Mensal</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Quanto você vai investir todo mês
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="monthly"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="pl-10"
            />
          </div>
          <Slider
            value={[monthlyInvestment]}
            onValueChange={([value]) => setMonthlyInvestment(value)}
            min={50}
            max={5000}
            step={50}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="rate">Taxa Anual (%)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Taxa de rendimento anual esperada (ex: CDI atual ~12%)
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <Input
              id="rate"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              %
            </span>
          </div>
          <Slider
            value={[annualRate]}
            onValueChange={([value]) => setAnnualRate(value)}
            min={1}
            max={30}
            step={0.5}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="years">Período (anos)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Por quanto tempo você vai investir
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <Slider
            value={[years]}
            onValueChange={([value]) => setYears(value)}
            min={1}
            max={40}
            step={1}
            className="mt-2"
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${monthlyInvestment}-${annualRate}-${years}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Total Acumulado</span>
          </div>
          <p className="font-display text-3xl font-bold">
            {formatCurrency(results.total)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Total Investido</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {formatCurrency(results.invested)}
          </p>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2 text-success">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Ganho com Juros</span>
          </div>
          <p className="font-display text-2xl font-bold text-success">
            +{formatCurrency(results.interest)}
          </p>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold mb-6">
          📈 A Mágica do Tempo: Juros Compostos vs Sem Juros
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="year" 
                tickFormatter={(value) => `${value}a`}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                stroke="hsl(var(--muted-foreground))"
              />
              <RechartsTooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Ano ${label}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Juros Compostos"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Sem Juros"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          A curva azul mostra o poder dos juros compostos trabalhando para você!
        </p>
      </div>
    </div>
  );
}
