import { useMarketData } from "@/hooks/useMarketData";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Percent } from "lucide-react";

export const MarketTicker = () => {
    const { rates, isLoading } = useMarketData();

    if (isLoading) return null;

    const items = [
        { label: "SELIC", value: rates.selic, color: "text-emerald-400" },
        { label: "CDI", value: rates.cdi, color: "text-blue-400" },
        { label: "IPCA (Inflação)", value: rates.ipca, color: "text-amber-400" },
        { label: "Poupança", value: rates.poupanca, color: "text-slate-400" },
    ];

    // Duplicar itens para scroll infinito suave
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-slate-950/50 border-b border-white/5 overflow-hidden py-2 backdrop-blur-sm relative z-40">
            <div className="flex relative items-center">
                <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-slate-950 to-transparent z-10" />
                <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-slate-950 to-transparent z-10" />

                <motion.div
                    className="flex gap-12 whitespace-nowrap px-4"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {tickerItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                            <span className={`text-sm font-black flex items-center gap-1 ${item.color}`}>
                                {item.value.toFixed(2)}%
                                <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
