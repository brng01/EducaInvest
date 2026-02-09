import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, ThumbsUp, ThumbsDown, AlertTriangle, TrendingUp } from "lucide-react";
import { gameService, GameQuestion } from "@/services/gameService";

interface Props {
    onBack: () => void;
}

interface QuestionContent {
    text: string;
    type: 'good' | 'bad';
    explanation: string;
}

export const OConsultor = ({ onBack }: Props) => {
    const [questions, setQuestions] = useState<GameQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const data = await gameService.getConsultorQuestions();
            // Shuffle questions
            const shuffled = data.sort(() => Math.random() - 0.5);
            setQuestions(shuffled);
        } catch (error) {
            console.error("Failed to load questions", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwipe = (swipeDir: 'left' | 'right') => {
        if (showFeedback) return;

        setDirection(swipeDir);
        const currentQuestion = questions[currentIndex];
        const content = currentQuestion.content as QuestionContent;

        // Left = Reject (ThumbsDown), Right = Approve (ThumbsUp)
        // If content.type is 'bad', correct action is Reject (Left)
        // If content.type is 'good', correct action is Approve (Right)

        const isCorrect =
            (swipeDir === 'left' && content.type === 'bad') ||
            (swipeDir === 'right' && content.type === 'good');

        setLastAnswerCorrect(isCorrect);
        if (isCorrect) setScore(s => s + 1);

        setShowFeedback(true);
    };

    const nextQuestion = () => {
        setShowFeedback(false);
        setDirection(null);
        setCurrentIndex(prev => prev + 1);
    };

    const resetGame = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowFeedback(false);
        setDirection(null);
        loadQuestions();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-white">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
                <p>Carregando cenários...</p>
            </div>
        );
    }

    const isGameOver = currentIndex >= questions.length;

    if (isGameOver) {
        return (
            <div className="flex flex-col h-full min-h-[500px] items-center justify-center text-center p-6 text-white">
                <h2 className="text-3xl font-bold mb-4">Fim de Jogo!</h2>
                <p className="text-xl mb-6">
                    Você acertou <span className="text-primary font-bold">{score}</span> de <span className="text-primary font-bold">{questions.length}</span> cenários.
                </p>

                <div className="flex gap-4">
                    <Button onClick={onBack} variant="secondary">
                        Voltar ao Menu
                    </Button>
                    <Button onClick={resetGame}>
                        Jogar Novamente
                    </Button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const content = currentQuestion.content as QuestionContent;

    return (
        <div className="flex flex-col h-full min-h-[500px] max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2 text-white hover:text-primary hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4" /> Sair
                </Button>
                <div className="text-sm font-medium text-muted-foreground">
                    Cenário {currentIndex + 1}/{questions.length}
                </div>
            </div>

            {/* Card Area */}
            <div className="flex-1 relative flex flex-col items-center justify-center perspective-1000">
                <AnimatePresence mode="wait">
                    {!showFeedback ? (
                        <motion.div
                            key="question-card"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0, rotate: direction === 'left' ? -10 : 10, x: direction === 'left' ? -200 : 200 }}
                            transition={{ duration: 0.3 }}
                            className="w-full bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center min-h-[300px] justify-center"
                        >
                            <div className="mb-6 p-4 bg-primary/10 rounded-full">
                                {content.type === 'good' ? (
                                    // We don't show the type icon yet, maybe a generic question mark or scenario icon
                                    <TrendingUp className="w-8 h-8 text-primary" />
                                ) : (
                                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                                )}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-relaxed">
                                {content.text}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Deslize ou use os botões abaixo
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feedback-card"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`w-full border rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center min-h-[300px] justify-center ${lastAnswerCorrect
                                    ? "bg-emerald-900/40 border-emerald-500/30"
                                    : "bg-red-900/40 border-red-500/30"
                                }`}
                        >
                            <div className={`mb-6 p-4 rounded-full ${lastAnswerCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                                {lastAnswerCorrect ? (
                                    <Check className="w-8 h-8 text-emerald-500" />
                                ) : (
                                    <X className="w-8 h-8 text-red-500" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {lastAnswerCorrect ? "Boa escolha!" : "Cuidado!"}
                            </h3>
                            <p className="text-white/90 mb-6 leading-relaxed">
                                {content.explanation}
                            </p>
                            <Button onClick={nextQuestion} className="w-full" size="lg">
                                Próximo
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    size="lg"
                    className="border-red-500/50 text-red-500 hover:bg-red-950/30 hover:text-red-400 h-16 text-lg gap-2"
                    onClick={() => handleSwipe('left')}
                    disabled={showFeedback}
                >
                    <ThumbsDown className="w-6 h-6" />
                    Recusar
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-950/30 hover:text-emerald-400 h-16 text-lg gap-2"
                    onClick={() => handleSwipe('right')}
                    disabled={showFeedback}
                >
                    Aceitar
                    <ThumbsUp className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
};
