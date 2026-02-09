import { motion } from "framer-motion";
import { CheckCircle2, Lock, Play, BookOpen, Clock } from "lucide-react";
import { Lesson } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface JourneyGridProps {
    lessons: Lesson[];
    completedLessonIds: number[];
    onSelectLesson: (id: number) => void;
}

export function JourneyGrid({ lessons, completedLessonIds, onSelectLesson }: JourneyGridProps) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                    Sua Jornada Financeira
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Complete os módulos passo a passo para desbloquear novos conhecimentos e conquistar sua liberdade financeira.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {/* Connecting Line (Desktop) - Visual decoration */}
                <div className="hidden lg:block absolute top-[100px] left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 -z-10 rounded-full" />

                {lessons.map((lesson, index) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    // Unlock logic: First lesson is always unlocked, or if previous is completed
                    const isUnlocked = index === 0 || completedLessonIds.includes(lessons[index - 1].id);

                    // Locked state overwrites everything else unless it's completed (replaying)
                    // But usually you can replay completed.
                    // If not unlocked and not completed -> Locked.
                    const isLocked = !isUnlocked && !isCompleted;

                    return (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative flex flex-col bg-slate-900/40 backdrop-blur-md border rounded-3xl overflow-hidden transition-all duration-300 ${isLocked
                                    ? "border-white/5 opacity-50 grayscale hover:opacity-75 hover:grayscale-0 cursor-not-allowed"
                                    : "border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                                }`}
                        >
                            {/* Card Header / Image Placeholder */}
                            <div className={`h-32 relative overflow-hidden flex items-center justify-center ${isCompleted ? "bg-emerald-500/10" : isLocked ? "bg-slate-800" : "bg-primary/10"
                                }`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

                                {isCompleted ? (
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                                ) : isLocked ? (
                                    <Lock className="w-10 h-10 text-slate-500 relative z-10" />
                                ) : (
                                    <BookOpen className="w-10 h-10 text-primary relative z-10" />
                                )}

                                <span className="absolute top-4 right-4 text-xs font-bold text-white/50 bg-black/30 px-2 py-1 rounded-full border border-white/5 font-mono">
                                    #{index + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                                        {lesson.title_short || lesson.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {lesson.description || "Domine este conceito financeiro essencial."}
                                    </p>
                                </div>

                                <div className="mt-auto space-y-4">
                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                            <Clock className="w-3 h-3" /> {lesson.duration || "5 min"}
                                        </span>
                                        <span className="uppercase tracking-wider font-bold text-[10px]">
                                            {lesson.level || "Iniciante"}
                                        </span>
                                    </div>

                                    {/* Progress Bar (Visual) */}
                                    {isCompleted ? (
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                                                <span>Concluído</span>
                                                <span>100%</span>
                                            </div>
                                            <Progress value={100} className="h-1.5 bg-emerald-950" indicatorClassName="bg-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-0" />
                                        </div>
                                    )}

                                    <Button
                                        className={`w-full font-bold gap-2 ${isCompleted
                                                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                                : "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                                            }`}
                                        disabled={isLocked}
                                        variant={isCompleted ? "ghost" : "default"}
                                        onClick={() => !isLocked && onSelectLesson(lesson.id)}
                                    >
                                        {isCompleted ? "Revisar Aula" : isLocked ? "Bloqueado" : "Começar Agora"}
                                        {!isLocked && <Play className="w-4 h-4 fill-current" />}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
