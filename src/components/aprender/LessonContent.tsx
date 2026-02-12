import { motion } from "framer-motion";
import { Layers, ChevronLeft, ChevronRight, Timer, Info, Lock, CheckCircle2, Trophy, Clock, Play } from "lucide-react";
import { PodcastCard, PodcastCardHandle } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lesson, Term } from "@/lib/types";
import { useState, useEffect, useRef } from "react";

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
    aulaFinalizada?: boolean;
}

// ProgressBar removed

export function LessonContent({
    currentAula,
    totalLessons,
    termosDaAula,
    handleLessonChange,
    currentAulaId,
    canComplete: initialCanComplete, // Rename to avoid conflict if we override logic locally
    timeLeft: initialTimeLeft,       // Same here
    timeLimit,
    handleCompleteAndNext,
    xpAmount,
    isAdmin = false,
    aulaFinalizada = false
}: LessonContentProps) {

    const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

    // Audio State & Handlers removed (Decoupled from timer)

    // Use admin bypass
    const processIsAdmin = isAdmin;

    const finalCanComplete = processIsAdmin || aulaFinalizada || initialCanComplete;

    return (
        <main className={cn(
            "flex-1 relative bg-slate-950/30 lg:h-full lg:overflow-y-auto",
            scrollbarClass
        )}>
            {/* Header Fixo Mobile/Desktop */}
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden lg:flex shrink-0 w-8 h-8 rounded-full hover:bg-white/10"
                            onClick={() => handleLessonChange(currentAulaId - 1)}
                            disabled={currentAulaId === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-sm font-medium text-slate-400 truncate flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5" />
                                Módulo {(currentAula as any).modulo_id || 1} • {currentAula.nivel?.toUpperCase()}
                            </h2>
                            <h1 className="text-base font-bold text-white truncate">
                                {currentAula.titulo}
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
                        {/* Barra de Progresso removida conforme solicitado */}
                    </div>

                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleCompleteAndNext}
                            disabled={!finalCanComplete}
                            className={cn(
                                "gap-2 transition-all duration-500 font-bold",
                                finalCanComplete
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-100"
                                    : "bg-slate-800/50 text-slate-500 border-slate-700/50 grayscale opacity-80"
                            )}
                        >
                            {aulaFinalizada ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Concluída</span>
                                    <span className="sm:hidden">Próxima</span>
                                </>
                            ) : finalCanComplete ? (
                                <>
                                    <Trophy className="w-4 h-4 animate-pulse" />
                                    <span className="hidden sm:inline">Finalizar Aula (+{xpAmount} XP)</span>
                                    <span className="sm:hidden">Finalizar</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">
                                        {/* Mostra tempo restante do timer fixo */}
                                        {`Aguarde ${Math.floor(initialTimeLeft / 60)}:${(initialTimeLeft % 60).toString().padStart(2, '0')}`}
                                    </span>
                                </>
                            )}
                            <ChevronRight className={cn("w-4 h-4 ml-1", finalCanComplete && "animate-bounce-x")} />
                        </Button>
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                {/* Mobile Progress Bar removed */}
                <div className="md:hidden mt-3 pt-2 border-t border-white/5 hidden">
                </div>
            </header>

            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32">
                {/* Podcast Card - Agora com Ref e Callbacks */}
                <PodcastCard
                    aula={currentAula as any}
                    termos={termosDaAula as any[]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {termosDaAula.map((termo) => (
                        <div key={termo.id} id={`term-${termo.id}`}>
                            <TermCard term={termo as any} />
                        </div>
                    ))}
                </div>

                {termosDaAula.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Nenhum termo específico nesta aula.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
