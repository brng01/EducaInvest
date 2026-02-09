import { motion } from "framer-motion";
import { CheckCircle2, Lock, Play, ChevronRight, Clock } from "lucide-react";
import { Lesson } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LessonListProps {
    lessons: Lesson[];
    completedLessonIds: number[];
    onSelectLesson: (lesson: Lesson) => void;
}

export function LessonList({ lessons, completedLessonIds, onSelectLesson }: LessonListProps) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
            <div className="text-left mb-10 space-y-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                    Trilha de Aprendizado
                </h1>
                <p className="text-muted-foreground text-lg">
                    Siga o caminho para dominar suas finanças.
                </p>
            </div>

            <div className="space-y-4 relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/50 via-white/10 to-transparent hidden md:block" />

                {lessons.map((lesson, index) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    // Unlock logic: First lesson is always unlocked, or if previous is completed
                    const isUnlocked = index === 0 || completedLessonIds.includes(lessons[index - 1].id);
                    const isLocked = !isUnlocked && !isCompleted;

                    // Current active lesson logic (first unlocked but not completed)
                    const isCurrent = !isCompleted && isUnlocked;

                    return (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => !isLocked && onSelectLesson(lesson)}
                            className={cn(
                                "relative group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 md:ml-0",
                                isLocked
                                    ? "bg-slate-900/20 border-white/5 opacity-60 cursor-not-allowed"
                                    : "bg-slate-900/60 border-white/10 cursor-pointer hover:bg-slate-800/80 hover:border-primary/30 hover:shadow-lg hover:translate-x-1",
                                isCurrent && "bg-slate-800/80 border-primary/40 shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                            )}
                        >
                            {/* Status Icon */}
                            <div className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full shrink-0 z-10 border-2 transition-colors",
                                isCompleted
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                                    : isCurrent
                                        ? "bg-primary/20 border-primary text-primary animate-pulse-slow"
                                        : "bg-slate-800 border-slate-700 text-slate-500"
                            )}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : isLocked ? (
                                    <Lock className="w-5 h-5" />
                                ) : (
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                                        Módulo {index + 1}
                                    </span>
                                    {isCurrent && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase">
                                            Atual
                                        </span>
                                    )}
                                </div>
                                <h3 className={cn(
                                    "text-lg font-bold truncate",
                                    isCompleted ? "text-slate-300" : isLocked ? "text-slate-500" : "text-white"
                                )}>
                                    {lesson.titulo || lesson.title_short}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {lesson.duration || "5 min"}
                                    </span>
                                    <span>•</span>
                                    <span>{lesson.level || "Iniciante"}</span>
                                </div>
                            </div>

                            {/* Arrow Indicator */}
                            {!isLocked && (
                                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center mt-12 text-sm text-muted-foreground">
                <p>Complete as aulas para desbloquear o próximo nível.</p>
            </div>
        </div>
    );
}
