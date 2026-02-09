import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, TrendingUp, Zap, Coins, Building } from "lucide-react";
import { gameService, EmpireItem } from "@/services/gameService";

interface Props {
    onBack: () => void;
}

export const EmpireBuilder = ({ onBack }: Props) => {
    const [balance, setBalance] = useState(0);
    const [clickValue, setClickValue] = useState(1);
    const [passiveIncome, setPassiveIncome] = useState(0);
    const [items, setItems] = useState<EmpireItem[]>([]);
    const [ownedItems, setOwnedItems] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Floating texts
    const [clicks, setClicks] = useState<{ id: number; x: number; y: number; val: number }[]>([]);
    const clickIdRef = useRef(0);

    useEffect(() => {
        loadGame();
        // Load save from localstorage
        const saved = localStorage.getItem('empireSave');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setBalance(parsed.balance || 0);
                setOwnedItems(parsed.ownedItems || {});
                // Recalculate rates based on loaded items is tricky because we need `items` first
                // So we do it in loadGame after fetching items
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            // Recalculate rates
            let newClickVal = 1;
            let newPassive = 0;

            items.forEach(item => {
                const count = ownedItems[item.id] || 0;
                if (count > 0) {
                    if (item.type === 'active') {
                        newClickVal += item.base_income * count;
                    } else {
                        newPassive += item.base_income * count;
                    }
                }
            });

            setClickValue(newClickVal);
            setPassiveIncome(newPassive);
        }
    }, [ownedItems, items]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (passiveIncome > 0) {
                setBalance(b => b + passiveIncome);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [passiveIncome]);

    useEffect(() => {
        // Auto-save every 5s
        const timer = setInterval(() => {
            localStorage.setItem('empireSave', JSON.stringify({
                balance,
                ownedItems
            }));
        }, 5000);
        return () => clearInterval(timer);
    }, [balance, ownedItems]);

    const loadGame = async () => {
        try {
            const data = await gameService.getEmpireItems();
            setItems(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWork = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Add balance
        setBalance(b => b + clickValue);

        // Add floating text
        const rect = e.currentTarget.getBoundingClientRect();
        // Random position around center
        const x = e.clientX - rect.left + (Math.random() * 40 - 20);
        const y = e.clientY - rect.top + (Math.random() * 40 - 20);

        const id = clickIdRef.current++;
        setClicks(prev => [...prev, { id, x, y, val: clickValue }]);

        // Cleanup floating text after 1s
        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== id));
        }, 800);
    };

    const getCost = (item: EmpireItem, count: number) => {
        return Math.floor(item.base_cost * Math.pow(1.15, count));
    };

    const buyItem = (item: EmpireItem) => {
        const count = ownedItems[item.id] || 0;
        const cost = getCost(item, count);

        if (balance >= cost) {
            setBalance(b => b - cost);
            setOwnedItems(prev => ({
                ...prev,
                [item.id]: (prev[item.id] || 0) + 1
            }));
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-white">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
                <p>Construindo império...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-[600px] max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2 text-white hover:text-primary hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4" /> Sair
                </Button>
            </div>

            <div className="grid md:grid-cols-[1fr_300px] gap-8 h-full">
                {/* Main Area */}
                <div className="flex flex-col gap-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl flex flex-col items-center">
                            <span className="text-muted-foreground text-sm uppercase font-bold mb-1">Renda Passiva</span>
                            <div className="flex items-center gap-2 text-emerald-400">
                                <TrendingUp className="w-5 h-5" />
                                <span className="text-2xl font-bold font-mono">+ED$ {passiveIncome}/s</span>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl flex flex-col items-center">
                            <span className="text-muted-foreground text-sm uppercase font-bold mb-1">Renda Ativa</span>
                            <div className="flex items-center gap-2 text-amber-400">
                                <Zap className="w-5 h-5" />
                                <span className="text-2xl font-bold font-mono">+ED$ {clickValue}/clique</span>
                            </div>
                        </div>
                    </div>

                    {/* Clicker Area */}
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] relative">
                        <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">
                            ED$ {Math.floor(balance).toLocaleString()}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWork}
                            className="w-48 h-48 rounded-full bg-gradient-to-b from-primary to-primary/60 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] border-4 border-white/10 flex flex-col items-center justify-center gap-2 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Briefcase className="w-16 h-16 text-white" />
                            <span className="font-bold text-white text-lg uppercase tracking-wider">Trabalhar</span>
                        </motion.button>

                        {/* Floating text container */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <AnimatePresence>
                                {clicks.map(click => (
                                    <motion.div
                                        key={click.id}
                                        initial={{ opacity: 1, y: 0, x: 0 }}
                                        animate={{ opacity: 0, y: -100 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute font-bold text-emerald-400 text-xl"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            marginLeft: click.x,
                                            marginTop: click.y
                                        }}
                                    >
                                        +ED${click.val}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Shop Sidebar */}
                <div className="relative bg-slate-900/50 border-l border-white/10 overflow-y-auto max-h-[600px] rounded-xl 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-white/10
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                    <div className="p-4 border-b border-white/10 sticky top-0 bg-slate-950 z-50 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Building className="w-4 h-4" /> Loja de Investimentos
                        </h3>
                        {passiveIncome > 0 && (
                            <span className="text-[10px] text-emerald-400 font-mono animate-pulse">RENDENDO...</span>
                        )}
                    </div>

                    <div className="p-2 space-y-3">
                        {items.map(item => {
                            const count = ownedItems[item.id] || 0;
                            const cost = getCost(item, count);
                            const canAfford = balance >= cost;
                            const isPassive = item.type === 'passive';

                            // Visual accents
                            const accentClass = isPassive ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'border-amber-500/20 hover:border-amber-500/50';
                            const glowClass = isPassive ? 'group-hover:bg-emerald-500/5' : 'group-hover:bg-amber-500/5';

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => buyItem(item)}
                                    disabled={!canAfford}
                                    className={`
                                        w-full text-left p-4 rounded-xl border transition-all relative group overflow-hidden
                                        ${canAfford
                                            ? `bg-slate-800/40 ${accentClass} ${glowClass}`
                                            : 'bg-slate-950/50 border-white/5 opacity-50 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {/* Type indicator bubble */}
                                    <div className={`absolute -right-1 -top-1 w-12 h-12 blur-2xl opacity-20 ${isPassive ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                                    <div className="flex justify-between items-start mb-1 relative z-10">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-sm group-hover:text-primary transition-colors">{item.name}</span>
                                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isPassive ? 'text-emerald-500/70' : 'text-amber-500/70'}`}>
                                                {isPassive ? 'Renda Passiva' : 'Renda Ativa'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-white/70">
                                                Nível {count}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed relative z-10">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-muted-foreground uppercase font-bold">Custo</span>
                                            <div className={`flex items-center gap-1 text-sm font-bold font-mono ${canAfford ? 'text-amber-400' : 'text-slate-500'}`}>
                                                <Coins className="w-3.5 h-3.5" />
                                                {cost.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] text-muted-foreground uppercase font-bold">Bônus</span>
                                            <div className={`flex items-center gap-1 text-sm font-bold font-mono ${isPassive ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                {isPassive ? <TrendingUp className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                                                +{item.base_income}
                                                {count > 0 && (
                                                    <span className="text-[10px] opacity-60 ml-1">
                                                        (Total: {item.base_income * count})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next level preview for owned items */}
                                    {count > 0 && (
                                        <div className={`mt-2 py-1 px-2 rounded-md text-[10px] font-medium text-center relative z-10 ${isPassive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            Próximo Nível: +{item.base_income} per {isPassive ? 'sec' : 'click'}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
