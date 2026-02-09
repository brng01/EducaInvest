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
                                <span className="text-2xl font-bold font-mono">+R$ {passiveIncome}/s</span>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl flex flex-col items-center">
                            <span className="text-muted-foreground text-sm uppercase font-bold mb-1">Renda Ativa</span>
                            <div className="flex items-center gap-2 text-amber-400">
                                <Zap className="w-5 h-5" />
                                <span className="text-2xl font-bold font-mono">+R$ {clickValue}/clique</span>
                            </div>
                        </div>
                    </div>

                    {/* Clicker Area */}
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] relative">
                        <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">
                            R$ {Math.floor(balance).toLocaleString()}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWork}
                            className="w-48 h-48 rounded-full bg-gradient-to-b from-primary to-primary/60 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] border-4 border-white/10 flex flex-col items-center justify-center gap-2 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Briefcase className="w-16 h-16 text-white" />
                            <span className="font-bold text-white text-lg">TRABALHAR</span>
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
                                        +R${click.val}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Shop Sidebar */}
                <div className="bg-slate-900/50 border-l border-white/10 overflow-y-auto max-h-[600px] rounded-xl">
                    <div className="p-4 border-b border-white/10 sticky top-0 bg-slate-900/90 backdrop-blur z-10">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Building className="w-4 h-4" /> Loja de Investimentos
                        </h3>
                    </div>

                    <div className="p-2 space-y-2">
                        {items.map(item => {
                            const count = ownedItems[item.id] || 0;
                            const cost = getCost(item, count);
                            const canAfford = balance >= cost;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => buyItem(item)}
                                    disabled={!canAfford}
                                    className={`
                     w-full text-left p-3 rounded-lg border transition-all relative group
                     ${canAfford
                                            ? 'bg-slate-800 border-white/10 hover:border-primary/50 hover:bg-slate-800'
                                            : 'bg-slate-900/50 border-transparent opacity-60 cursor-not-allowed'
                                        }
                   `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-white text-sm">{item.name}</span>
                                        <span className="text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded text-white">
                                            Lvl {count}
                                        </span>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-xs font-mono text-amber-500">
                                            <Coins className="w-3 h-3" />
                                            {cost.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-mono text-emerald-500">
                                            {item.type === 'active' ? <Zap className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                            +{item.base_income}
                                        </div>
                                    </div>

                                    {/* Progress bar visual for next buy? maybe later */}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
