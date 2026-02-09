import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { gameService, GameQuestion } from "@/services/gameService";

interface Props {
    onBack: () => void;
}

interface TermContent {
    term: string;
    definition: string;
}

interface GameItem {
    id: string; // "term-1" or "def-1"
    originalId: number;
    text: string;
    type: 'term' | 'def';
}

export const DesafioTermos = ({ onBack }: Props) => {
    const [items, setItems] = useState<{ terms: GameItem[], defs: GameItem[] }>({ terms: [], defs: [] });
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [selectedDef, setSelectedDef] = useState<string | null>(null);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        loadGame();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    // Check match
    useEffect(() => {
        if (selectedTerm && selectedDef) {
            const termId = parseInt(selectedTerm.split('-')[1]);
            const defId = parseInt(selectedDef.split('-')[1]);

            if (termId === defId) {
                // Match!
                setMatchedIds(prev => [...prev, termId]);
                setScore(s => s + 10 + Math.floor(timeLeft / 2)); // Bonus for speed
                setSelectedTerm(null);
                setSelectedDef(null);

                // Check win condition
                if (matchedIds.length + 1 === items.terms.length) {
                    setIsPlaying(false);
                }
            } else {
                // Mismatch - wait a bit then reset
                const t = setTimeout(() => {
                    setSelectedTerm(null);
                    setSelectedDef(null);
                }, 500);
                return () => clearTimeout(t);
            }
        }
    }, [selectedTerm, selectedDef]);

    const loadGame = async () => {
        setIsLoading(true);
        try {
            const data = await gameService.getTermPairs();
            // Take random 5 pairs to avoid display overflow
            const selected = data.sort(() => Math.random() - 0.5).slice(0, 5);

            const terms: GameItem[] = selected.map(q => ({
                id: `term-${q.id}`,
                originalId: q.id,
                text: (q.content as TermContent).term,
                type: 'term'
            })).sort(() => Math.random() - 0.5);

            const defs: GameItem[] = selected.map(q => ({
                id: `def-${q.id}`,
                originalId: q.id,
                text: (q.content as TermContent).definition,
                type: 'def'
            })).sort(() => Math.random() - 0.5);

            setItems({ terms, defs });
            setMatchedIds([]);
            setScore(0);
            setTimeLeft(60);
            setIsPlaying(true);
            setSelectedTerm(null);
            setSelectedDef(null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-white">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
                <p>Preparando termos...</p>
            </div>
        );
    }

    const isGameOver = timeLeft === 0 || matchedIds.length === items.terms.length;

    if (isGameOver && !isPlaying) {
        const isWin = matchedIds.length === items.terms.length;
        return (
            <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-center p-6 text-white">
                <h2 className="text-3xl font-bold mb-4">{isWin ? "Você Venceu!" : "Tempo Esgotado!"}</h2>
                <p className="text-xl mb-6">
                    Sua pontuação final: <span className="text-primary font-bold">{score}</span>
                </p>
                <div className="flex gap-4">
                    <Button onClick={onBack} variant="secondary">
                        Voltar
                    </Button>
                    <Button onClick={loadGame} className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Jogar Novamente
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2 text-white hover:text-primary hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4" /> Sair
                </Button>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${timeLeft < 10 ? 'border-red-500 text-red-500' : 'border-white/10 text-white'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="font-mono font-bold">{timeLeft}s</span>
                    </div>
                    <div className="text-white font-bold">
                        Pts: {score}
                    </div>
                </div>
            </div>

            {/* Game Board */}
            <div className="flex-1 grid grid-cols-2 gap-8 md:gap-12 relative">
                {/* Connectors Layer (if implemented in V2) */}

                {/* Definitions Column */}
                <div className="flex flex-col justify-center gap-4">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-bold mb-2">Definições</h3>
                    {items.defs.map(def => {
                        const isMatched = matchedIds.includes(def.originalId);
                        const isSelected = selectedDef === def.id;

                        return (
                            <motion.button
                                key={def.id}
                                layoutId={def.id}
                                className={`
                            p-4 rounded-xl text-sm md:text-base font-medium text-left transition-all relative border overflow-hidden
                            ${isMatched
                                        ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-500 opacity-50'
                                        : isSelected
                                            ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]'
                                            : 'bg-slate-800/50 border-white/10 text-slate-200 hover:border-white/30 hover:bg-slate-800'
                                    }
                        `}
                                onClick={() => !isMatched && setSelectedDef(def.id)}
                                disabled={isMatched}
                                whileHover={!isMatched ? { scale: 1.02 } : {}}
                                whileTap={!isMatched ? { scale: 0.98 } : {}}
                            >
                                {def.text}
                                {isMatched && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Terms Column */}
                <div className="flex flex-col justify-center gap-4">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-bold mb-2">Termos</h3>
                    {items.terms.map(term => {
                        const isMatched = matchedIds.includes(term.originalId);
                        const isSelected = selectedTerm === term.id;

                        return (
                            <motion.button
                                key={term.id}
                                layoutId={term.id}
                                className={`
                            p-4 rounded-xl text-base md:text-lg font-bold text-center transition-all relative border h-full flex items-center justify-center
                            ${isMatched
                                        ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-500 opacity-50'
                                        : isSelected
                                            ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]'
                                            : 'bg-slate-800/50 border-white/10 text-white hover:border-white/30 hover:bg-slate-800'
                                    }
                        `}
                                onClick={() => !isMatched && setSelectedTerm(term.id)}
                                disabled={isMatched}
                                whileHover={!isMatched ? { scale: 1.02 } : {}}
                                whileTap={!isMatched ? { scale: 0.98 } : {}}
                            >
                                {term.text}
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
