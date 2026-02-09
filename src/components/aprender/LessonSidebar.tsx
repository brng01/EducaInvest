import { BookOpen, ChevronDown, Lock, PlayCircle, CheckCircle2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lesson } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LessonSidebarProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    lessons: Lesson[];
    currentAulaId: number;
    completedLessonIds: number[];
    handleLessonChange: (id: number) => void;
    isAdmin?: boolean;
    onBackToMap?: () => void;
}

export function LessonSidebar({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    lessons,
    currentAulaId,
    completedLessonIds,
    handleLessonChange,
    isAdmin = false,
    onBackToMap
}: LessonSidebarProps) {

    const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

    const maxCompletedId = completedLessonIds.length > 0 ? Math.max(...completedLessonIds) : 0;

    const modulos = [
        { titulo: "Módulo 1: O Despertar (Fundamentos)", aulas: lessons.filter(a => a.nivel === "fundamentos" || a.level === "fundamentos") },
        { titulo: "Módulo 2: A Construção (Ferramentas)", aulas: lessons.filter(a => a.nivel === "pratica" || a.level === "pratica") },
        { titulo: "Módulo 3: A Estratégia (Eficiência)", aulas: lessons.filter(a => a.nivel === "alta_performance" || a.level === "alta_performance") }
    ];

    const trilhasExtras = [
        { titulo: "Especialista em FIIs", aulas: lessons.filter(a => a.nivel === "especialista-fii" || a.level === "especialista-fii") },
        { titulo: "Mestre das Ações", aulas: lessons.filter(a => a.nivel === "especialista-acao" || a.level === "especialista-acao") },
        { titulo: "Renda Fixa Turbinada", aulas: lessons.filter(a => a.nivel === "especialista-rf" || a.level === "especialista-rf") }
    ];

    // Verifica se terminou o curso base para liberar as trilhas extras no menu
    const isBaseCourseComplete = lessons
        .filter(l => ['fundamentos', 'pratica', 'alta_performance'].includes(l.nivel || l.level))
        .every(l => completedLessonIds.includes(l.id));

    return (
        <aside className={cn(
            "w-full lg:w-72 bg-slate-900/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 z-20 transition-all",
            scrollbarClass,
            isMobileMenuOpen ? "h-auto" : "h-auto"
        )}>
            <div className="p-4 lg:p-6">
                <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl z-10 -mx-2 px-2 py-2 mb-2 lg:mb-6 rounded-lg space-y-2">
                    {onBackToMap && (
                        <button
                            onClick={onBackToMap}
                            className="hidden lg:flex w-full items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors p-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/5"
                        >
                            <ChevronDown className="w-4 h-4 rotate-90" />
                            Voltar ao Mapa
                        </button>
                    )}

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-full flex items-center justify-between lg:justify-start gap-2 text-primary lg:cursor-default"
                        aria-label="Menu de aulas"
                    >
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            <h2 className="font-display font-bold text-lg text-white">Cronograma</h2>
                        </div>
                        <ChevronDown className={cn("w-5 h-5 lg:hidden transition-transform", isMobileMenuOpen ? "rotate-180" : "")} />
                    </button>
                </div>

                <div className={cn(
                    "space-y-6 lg:block",
                    isMobileMenuOpen ? "block animate-in slide-in-from-top-2 duration-200" : "hidden"
                )}>
                    {modulos.map((modulo, index) => (
                        <div key={index}>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                                {modulo.titulo}
                            </h3>
                            <div className="space-y-1">
                                {modulo.aulas.map((aula) => {
                                    const isActive = currentAulaId === aula.id;
                                    const aulaFinalizada = completedLessonIds.includes(aula.id);
                                    const isLocked = !isAdmin && aula.id > (maxCompletedId + 1);

                                    const buttonContent = (
                                        <button
                                            disabled={isLocked}
                                            onClick={() => !isLocked && handleLessonChange(aula.id)}
                                            className={cn(
                                                "w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-3 group relative",
                                                isActive
                                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                                    : isLocked
                                                        ? "opacity-40 cursor-not-allowed bg-transparent text-muted-foreground"
                                                        : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                                            )}
                                            aria-label={`Aula ${aula.id}: ${aula.title_short || aula.titulo}`}
                                            aria-current={isActive ? "page" : undefined}
                                            aria-disabled={isLocked}
                                        >
                                            {/* Ícones de Estado */}
                                            {isLocked ? (
                                                <Lock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                                            ) : isActive ? (
                                                <PlayCircle className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                                            ) : aulaFinalizada ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                                            ) : (
                                                <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                                            )}

                                            <span className="line-clamp-1">{aula.id}. {aula.title_short || aula.titulo}</span>
                                        </button>
                                    );

                                    return isLocked ? (
                                        <Tooltip key={aula.id}>
                                            <TooltipTrigger asChild>
                                                {buttonContent}
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="bg-slate-800 border-slate-700">
                                                <p className="text-xs">Complete a aula anterior para desbloquear</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : (
                                        <div key={aula.id}>{buttonContent}</div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* --- TRILHAS EXTRAS (SEMPRE VISÍVEIS, MAS BLOQUEADAS SE NECESSÁRIO) --- */}
                    <div className="pt-6 border-t border-white/5 mt-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-4 px-2 flex items-center gap-2">
                            <Layers className="w-3 h-3" /> Especializações
                        </h3>

                        <div className="space-y-6">
                            {trilhasExtras.map((trilha, index) => (
                                <div key={`trilha-${index}`} className={cn(
                                    "transition-opacity duration-300",
                                    !isBaseCourseComplete && "opacity-50"
                                )}>
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-2 px-2 flex justify-between items-center">
                                        {trilha.titulo}
                                        {!isBaseCourseComplete && <Lock className="w-3 h-3 text-muted-foreground" />}
                                    </h4>
                                    <div className="space-y-1">
                                        {trilha.aulas.map((aula) => {
                                            const isActive = currentAulaId === aula.id;
                                            const aulaFinalizada = completedLessonIds.includes(aula.id);
                                            // Locked if base course not complete OR if individual sequence logic applies
                                            const isLocked = !isAdmin && (!isBaseCourseComplete || (aula.id > (maxCompletedId + 1)));

                                            return (
                                                <button
                                                    key={aula.id}
                                                    disabled={isLocked}
                                                    onClick={() => !isLocked && handleLessonChange(aula.id)}
                                                    className={cn(
                                                        "w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-3 group relative",
                                                        isActive
                                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                            : isLocked
                                                                ? "opacity-40 cursor-not-allowed bg-transparent text-muted-foreground"
                                                                : "text-muted-foreground hover:bg-emerald-500/5 hover:text-emerald-400 border border-transparent"
                                                    )}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="w-3 h-3 shrink-0" />
                                                    ) : isActive ? (
                                                        <PlayCircle className="w-3 h-3 shrink-0 animate-pulse" />
                                                    ) : aulaFinalizada ? (
                                                        <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-500" />
                                                    ) : (
                                                        <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                                                    )}
                                                    <span className="line-clamp-1 text-left">{aula.title_short || aula.titulo}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!isBaseCourseComplete && (
                            <div className="mt-4 px-2">
                                <p className="text-[10px] text-muted-foreground text-center bg-white/5 p-2 rounded-lg border border-white/5">
                                    Complete os módulos anteriores para desbloquear as especializações.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}
