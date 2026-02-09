import { motion } from "framer-motion";
import { Layers, ChevronLeft, ChevronRight, Timer, Info, Lock } from "lucide-react";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lesson, Term } from "@/lib/types";

interface LessonContentProps {
    currentAula: Lesson;
    totalLessons: number;
    termosDaAula: Term[];
    handleLessonChange: (id: number) => void;
    currentAulaId: number;
    canComplete: boolean;
    timeLeft: number;
    timeLimit: number;
    handleCompleteAndNext: () => void;
    xpAmount: number;
    isAdmin?: boolean;
}

const ProgressBar = ({ timeLeft, total }: { timeLeft: number; total: number }) => {
    const percentage = ((total - timeLeft) / total) * 100;

    return (
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

export function LessonContent({
    currentAula,
    totalLessons,
    termosDaAula,
    handleLessonChange,
    currentAulaId,
    canComplete,
    timeLeft,
    timeLimit,
    handleCompleteAndNext,
    xpAmount,
    isAdmin = false
}: LessonContentProps) {

    const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

    return (
        <main className={cn("flex-1 relative bg-slate-950/30 lg:h-full lg:overflow-y-auto", scrollbarClass)}>
            <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8 pb-32">

                <motion.div
                    key={`header-${currentAula.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            <span>Aula {currentAula.id} de {totalLessons}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-primary">{currentAula.nivel || currentAula.level}</span>
                        </div>
                        {isAdmin && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">
                                <Lock className="w-3 h-3" />
                                <span>Modo Admin Ativo (Sem Travas)</span>
                            </div>
                        )}
                    </div>
                    <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {currentAula.title_full || currentAula.tituloCompleto}
                    </h1>
                </motion.div>

                <PodcastCard aula={currentAula as any} termos={termosDaAula as any[]} />

                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Conceitos da Aula
                    </span>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {termosDaAula.length > 0 ? (
                        termosDaAula.map((term, index) => (
                            <motion.div
                                key={term.id}
                                id={`term-${term.id}`} // ID for scroll
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TermCard term={term as any} hideLevel={true} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground/50 text-sm">
                            Esta aula foca na teoria e mentalidade, sem termos técnicos específicos.
                        </div>
                    )}
                </div>

                {/* ========== NAVIGATION WITH XP BUTTON AND TIMER ========== */}
                <div className="pt-10 border-t border-white/10 flex flex-col-reverse gap-4 md:flex-row justify-between items-center">
                    <Button
                        variant="ghost"
                        onClick={() => handleLessonChange(currentAulaId - 1)}
                        disabled={currentAulaId === 1}
                        className="text-muted-foreground hover:text-white rounded-full px-6 w-full md:w-auto disabled:opacity-30"
                        aria-label="Ir para aula anterior"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Aula Anterior
                    </Button>

                    <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                        {!canComplete && (
                            <ProgressBar timeLeft={timeLeft} total={timeLimit} />
                        )}

                        <Button
                            size="lg"
                            onClick={handleCompleteAndNext}
                            disabled={!canComplete}
                            className={cn(
                                "group font-bold rounded-full px-8 py-6 text-base transition-all w-full md:w-auto relative overflow-hidden",
                                canComplete
                                    ? "bg-white text-slate-900 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                            )}
                            aria-label={canComplete ? `Concluir aula e ganhar ${xpAmount} XP` : `Aguarde ${timeLeft} segundos para liberar`}
                            role="button"
                            aria-disabled={!canComplete}
                        >
                            {!canComplete && <Timer className="w-4 h-4 mr-2 animate-pulse" />}
                            {canComplete
                                ? (currentAulaId === totalLessons ? "🎉 Concluir Curso" : `Concluir e Ganhar +${xpAmount} XP`)
                                : `Aguarde ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                            {canComplete && currentAulaId !== totalLessons && (
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            )}
                        </Button>

                        {!canComplete && (
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                                <Info className="w-3 h-3" />
                                <span>Estude o conteúdo para coletar seus pontos</span>
                            </div>
                        )}
                    </div>
                </div>

                <footer className="text-center text-[10px] text-muted-foreground/30 pt-8">
                    <p>© 2026 EducaInvest - Educação Financeira ao Seu Alcance</p>
                </footer>
            </div>
        </main>
    );
}
