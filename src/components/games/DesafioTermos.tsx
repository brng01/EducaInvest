import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, RefreshCw, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { gameService, GameQuestion } from "@/services/gameService";
import { formatNumber, cn } from "@/lib/utils";
import { GameHelp } from "./GameHelp";


interface Props {
    onBack: () => void;
    user?: any;
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

const MATCH_STYLES = [
    { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]" },
    { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", glow: "shadow-[0_0_20px_rgba(99,102,241,0.2)]" },
    { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-[0_0_20px_rgba(139,92,246,0.2)]" },
    { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", glow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]" },
    { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", glow: "shadow-[0_0_20px_rgba(14,165,233,0.2)]" },
];

export const DesafioTermos = ({ onBack, user }: Props) => {

    const [items, setItems] = useState<{ terms: GameItem[], defs: GameItem[] }>({ terms: [], defs: [] });
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [selectedDef, setSelectedDef] = useState<string | null>(null);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [matchedColors, setMatchedColors] = useState<Record<number, number>>({});
    const [mismatchPairs, setMismatchPairs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [xpSaved, setXpSaved] = useState(false);

    const scoreRef = useRef(0);
    const xpSavedRef = useRef(false);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        xpSavedRef.current = xpSaved;
    }, [xpSaved]);

    useEffect(() => {
        loadGame();
    }, []);

    useEffect(() => {
        let timer: any;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const isGameOver = timeLeft === 0 || matchedIds.length === items.terms.length;

    useEffect(() => {
        if (!isPlaying && isGameOver && score > 0 && !xpSaved) {
            if (user) {
                gameService.addUserXP(user.id, score);
            }

            setXpSaved(true);
        }
    }, [isPlaying, isGameOver, score, xpSaved]);

    useEffect(() => {
        if (selectedTerm && selectedDef) {
            const termId = parseInt(selectedTerm.split('-')[1]);
            const defId = parseInt(selectedDef.split('-')[1]);

            if (termId === defId) {
                setMatchedColors(prev => ({ ...prev, [termId]: colorIndex }));
                setMatchedIds(prev => [...prev, termId]);
                setScore(s => s + 10 + Math.floor(timeLeft / 2));
                setMatchedColors(prev => ({ ...prev, [termId]: colorIndex }));
                setMatchedIds(prev => [...prev, termId]);
                setScore(s => s + 10 + Math.floor(timeLeft / 2));
                setSelectedTerm(null);
                setSelectedDef(null);

                const stats = JSON.parse(localStorage.getItem('termoStats') || '{"totalMatched":0,"bestTimeLeft":0}');
                stats.totalMatched += 1;
                localStorage.setItem('termoStats', JSON.stringify(stats));
                if (timeLeft > stats.bestTimeLeft) {
                    stats.bestTimeLeft = timeLeft;
                    localStorage.setItem('termoStats', JSON.stringify(stats));
                }
            }
        } else {
            if (navigator.vibrate) navigator.vibrate(200);

            setMismatchPairs([selectedTerm, selectedDef]);
            const t = setTimeout(() => {
                setMismatchPairs([]);
                setSelectedTerm(null);
                setSelectedDef(null);
            }, 600);
            return () => clearTimeout(t);
        }
    }
    }, [selectedTerm, selectedDef]);

const loadGame = async () => {
    setIsLoading(true);
    try {
        const data = await gameService.getTermPairs();
        const selected = data.sort(() => Math.random() - 0.5).slice(0, 5);

        const terms: GameItem[] = selected.map(q => ({
            id: `term-${q.id}`,
            originalId: q.id,
            text: (q.content as TermContent).term,
            type: 'term' as const
        })).sort(() => Math.random() - 0.5);

        const defs: GameItem[] = selected.map(q => ({
            id: `def-${q.id}`,
            originalId: q.id,
            text: (q.content as TermContent).definition,
            type: 'def' as const
        })).sort(() => Math.random() - 0.5);

        setItems({ terms, defs });
        setMatchedIds([]);
        setMatchedColors({});
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

if (isGameOver && !isPlaying) {
    const isWin = matchedIds.length === items.terms.length;
    return (
        <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-center p-6 text-white">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isWin ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isWin ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
            </div>
            <h2 className="text-3xl font-bold mb-4">{isWin ? "Mestre dos Termos!" : "Tempo Esgotado!"}</h2>
            <p className="text-xl mb-6 text-muted-foreground tabular-nums">
                Você acumulou <span className="text-primary font-bold">{formatNumber(score)}</span> pontos de experiência.
            </p>
            <div className="flex gap-4 w-full max-w-xs">
                <Button onClick={loadGame} className="flex-1 gap-2" size="lg">
                    <RefreshCw className="w-4 h-4" /> Jogar
                </Button>
                <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
                    Sair
                </Button>
            </div>
        </div>
    );
}

return (
    <div className="flex flex-col h-full min-h-[500px] max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2 text-white/70 hover:text-white hover:bg-white/10" aria-label="Sair do jogo">
                    <ArrowLeft className="w-4 h-4" /> Sair
                </Button>
                <GameHelp>
                    <p>
                        Conecte os conceitos bancários e financeiros às suas definições corretas o mais rápido possível!
                        Selecione um termo de um lado e sua definição do outro.
                        Ganhe bônus de <span className="text-amber-400">tempo</span> ao acertar rapidamente.
                    </p>
                </GameHelp>
            </div>
            <div className="flex items-center gap-6">
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-colors ${timeLeft < 10 ? 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse' : 'border-white/10 bg-white/5 text-white'}`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono font-bold text-lg">{timeLeft}s</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-black text-muted-foreground leading-none">Score</span>
                    <div className="text-primary font-black text-2xl tabular-nums">
                        {formatNumber(score)} <span className="text-xs">ED$</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Game Board */}
        <div className="flex-1 grid grid-cols-2 gap-6 md:gap-12 relative overflow-y-auto pr-2 
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-white/10
                [&::-webkit-scrollbar-thumb]:rounded-full">

            {/* Definitions Column */}
            <div className="flex flex-col gap-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs uppercase font-black tracking-widest text-emerald-400">Definições</span>
                </div>
                {items.defs.map(def => {
                    const isMatched = matchedIds.includes(def.originalId);
                    const isSelected = selectedDef === def.id;
                    const isMismatch = mismatchPairs.includes(def.id);
                    const colorIndex = matchedColors[def.originalId];
                    const matchStyle = isMatched && colorIndex !== undefined ? MATCH_STYLES[colorIndex] : null;

                    return (
                        <motion.button
                            key={def.id}
                            className={cn(
                                "p-5 rounded-2xl text-sm md:text-base font-medium text-left transition-all relative border min-h-[90px] flex items-center group backdrop-blur-md overflow-hidden",
                                isMatched && matchStyle
                                    ? `${matchStyle.bg} ${matchStyle.border} ${matchStyle.text} ${matchStyle.glow} cursor-default`
                                    : isMismatch
                                        ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                        : isSelected
                                            ? "bg-primary/30 border-primary text-white shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)] ring-1 ring-primary/50"
                                            : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-emerald-500/40 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-lg"
                            )}
                            onClick={() => !isMatched && isPlaying && setSelectedDef(def.id)}
                            disabled={isMatched || !isPlaying}
                            whileHover={!isMatched && isPlaying ? { x: 5, scale: 1.02 } : {}}
                            whileTap={!isMatched && isPlaying ? { scale: 0.98 } : {}}
                        >
                            {/* Selection Glow Effect */}
                            {isSelected && !isMatched && (
                                <motion.div
                                    layoutId="glow-def"
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}

                            <span className="relative z-10 leading-relaxed">{def.text}</span>

                            <AnimatePresence>
                                {isMatched && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                                            matchStyle ? `bg-white/10 ${matchStyle.border.replace('border-', 'border-')}` : "bg-emerald-500/20 border-emerald-500/30")}>
                                            <CheckCircle2 className={cn("w-4 h-4", matchStyle ? matchStyle.text : "text-emerald-400")} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )
                })}
            </div>

            {/* Terms Column */}
            <div className="flex flex-col gap-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-xs uppercase font-black tracking-widest text-amber-400">Termos</span>
                </div>
                {items.terms.map(term => {
                    const isMatched = matchedIds.includes(term.originalId);
                    const isSelected = selectedTerm === term.id;
                    const isMismatch = mismatchPairs.includes(term.id);
                    const colorIndex = matchedColors[term.originalId];
                    const matchStyle = isMatched && colorIndex !== undefined ? MATCH_STYLES[colorIndex] : null;

                    return (
                        <motion.button
                            key={term.id}
                            className={cn(
                                "p-5 rounded-2xl text-base md:text-lg font-bold text-center transition-all relative border min-h-[90px] flex items-center justify-center backdrop-blur-md overflow-hidden",
                                isMatched && matchStyle
                                    ? `${matchStyle.bg} ${matchStyle.border} ${matchStyle.text} ${matchStyle.glow} cursor-default`
                                    : isMismatch
                                        ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                        : isSelected
                                            ? "bg-primary/30 border-primary text-white shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)] ring-1 ring-primary/50"
                                            : "bg-white/[0.03] border-white/10 text-white hover:border-amber-500/40 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-lg"
                            )}
                            onClick={() => !isMatched && isPlaying && setSelectedTerm(term.id)}
                            disabled={isMatched || !isPlaying}
                            whileHover={!isMatched && isPlaying ? { x: -5, scale: 1.02 } : {}}
                            whileTap={!isMatched && isPlaying ? { scale: 0.98 } : {}}
                        >
                            {/* Selection Glow Effect */}
                            {isSelected && !isMatched && (
                                <motion.div
                                    layoutId="glow-term"
                                    className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}

                            <span className="relative z-10">{term.text}</span>

                            <AnimatePresence>
                                {isMatched && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        <CheckCircle2 className={cn("w-5 h-5", matchStyle ? matchStyle.text : "text-emerald-400/60")} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    </div>
);
};
