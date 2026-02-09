import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Trophy, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/lib/types";

interface LessonIntroModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: () => void;
    lesson: Lesson;
    isCompleted?: boolean;
}

export function LessonIntroModal({ isOpen, onClose, onStart, lesson, isCompleted }: LessonIntroModalProps) {
    if (!isOpen) return null;

    // Mock data for "Enrichment" since DB might not have these yet
    const xpReward = lesson.level === "Iniciante" ? 100 : lesson.level === "Intermediário" ? 250 : 500;

    // Split description into bullet points if possible, or just mock some key takeaways
    const takeaways = [
        "Compreenda os conceitos fundamentais deste tópico",
        "Aprenda a aplicar o conhecimento na prática",
        "Evite armadilhas comuns relacionadas ao assunto"
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 via-slate-900 to-slate-900" />
                    <div className="absolute top-4 right-4 z-20">
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="p-8 relative pt-12">
                        {/* Icon/Badge */}
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                            {isCompleted ? (
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            ) : (
                                <BookOpen className="w-8 h-8 text-primary" />
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                    {lesson.titulo || lesson.title_short}
                                </h2>
                                <p className="text-slate-400 leading-relaxed">
                                    {lesson.descricao || lesson.description}
                                </p>
                            </div>

                            {/* Key Takeaways */}
                            <div className="bg-white/5 rounded-xl p-5 border border-white/5 space-y-3">
                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-primary rounded-full" />
                                    O que você vai aprender
                                </h3>
                                <ul className="space-y-2">
                                    {takeaways.map((point, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                                            <CheckCircle2 className="w-4 h-4 text-primary/50 mt-0.5 shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950/50 rounded-lg p-3 flex items-center gap-3 border border-white/5">
                                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Tempo Estimado</p>
                                        <p className="text-sm text-white font-bold">{lesson.duration || "5 min"}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-950/50 rounded-lg p-3 flex items-center gap-3 border border-white/5">
                                    <div className="p-2 rounded-full bg-amber-500/10 text-amber-400">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Recompensa</p>
                                        <p className="text-sm text-white font-bold">+{xpReward} XP</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button
                                onClick={onStart}
                                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/25 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                size="lg"
                            >
                                {isCompleted ? "Revisar Conteúdo" : "Começar Aula"}
                                <Play className="w-5 h-5 ml-2 fill-current" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
