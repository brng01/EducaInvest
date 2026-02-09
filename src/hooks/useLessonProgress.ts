import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { Lesson } from '@/lib/types';

const TIME_LIMIT = 120; // 2 minutes

export function useLessonProgress(
    lessons: Lesson[],
    user: any,
    completedLessonIds: number[],
    setCompletedLessonIds: Dispatch<SetStateAction<number[]>>
) {
    const { toast } = useToast();

    // State for current lesson
    const [currentAulaId, setCurrentAulaId] = useState(() => {
        const saved = localStorage.getItem('educainvest_current_lesson');
        return saved ? parseInt(saved, 10) : 1;
    });

    // Timer state
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [canComplete, setCanComplete] = useState(false);

    // Computed current lesson object
    // Mapped Lesson structure to match what UI expects from the DB mapping in the original file
    // ideally we should standardize, but for now we keep compatibility
    const currentAula = lessons.find(a => a.id === currentAulaId) || lessons[0];

    useEffect(() => {
        setTimeLeft(TIME_LIMIT);
        setCanComplete(false);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentAulaId]);

    const handleLessonChange = (newId: number) => {
        setCurrentAulaId(newId);
        localStorage.setItem('educainvest_current_lesson', newId.toString());
        window.scrollTo(0, 0);

        if (user) {
            supabase.from('user_progress').upsert({
                user_id: user.id,
                lesson_id: newId,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,lesson_id' }).then(({ error }) => {
                if (error) console.error("Erro ao salvar aula atual:", error);
            });
        }
    };

    const getXpReward = (nivel?: string) => {
        const rewards: Record<string, number> = {
            'fundamentos': 100,
            'pratica': 300,
            'alta_performance': 500,
            'especialista-fii': 800,
            'especialista-acao': 800,
            'especialista-rf': 800,
        };
        return rewards[nivel?.toLowerCase() || 'fundamentos'] || 100;
    };

    const handleCompleteAndNext = async () => {
        if (!canComplete || !user) return;

        // Check if it's the last lesson of a module or the entire course
        // Need to handle the mapped 'nivel' property vs 'level' from DB if lessons are mixed types
        // Assuming 'lessons' passed here already has 'nivel' mapped or we use 'level'
        const currentLevel = currentAula.nivel || currentAula.level;
        const isLastOfModule = lessons.filter(l => (l.nivel || l.level) === currentLevel).pop()?.id === currentAulaId;
        const isLastOfCourse = currentAulaId === lessons.length;

        // Confetti removed for professional look
        // if (isLastOfModule || isLastOfCourse) { ... }

        const xpAmount = getXpReward(currentLevel);

        try {
            const { error: progressError } = await supabase.from('user_progress').upsert({
                user_id: user.id,
                lesson_id: currentAulaId,
                is_completed: true,
                completed_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, lesson_id' });

            if (progressError) throw progressError;

            setCompletedLessonIds(prev => [...prev, currentAulaId]);

            const { data: perfil } = await supabase.from('perfis').select('xp_total').eq('id', user.id).single();
            const newTotal = (perfil?.xp_total || 0) + xpAmount;

            await supabase.from('perfis').update({ xp_total: newTotal }).eq('id', user.id);

            toast({
                title: `+${xpAmount} XP Conquistados!`,
                description: isLastOfCourse ? "🎉 Parabéns! Você concluiu o curso!" : "Progresso salvo com sucesso.",
                className: "bg-emerald-500 border-none text-white"
            });

        } catch (error) {
            console.error("Erro ao salvar XP:", error);
            toast({
                title: "Erro ao salvar",
                description: "Verifique sua conexão e tente novamente.",
                variant: "destructive"
            });
            return;
        }

        if (currentAulaId < lessons.length) {
            handleLessonChange(currentAulaId + 1);
        }
    };

    return {
        currentAulaId,
        currentAula,
        timeLeft,
        canComplete,
        handleLessonChange,
        handleCompleteAndNext,
        TIME_LIMIT,
        xpAmount: currentAula ? getXpReward(currentAula.nivel || currentAula.level) : 0
    };
}
