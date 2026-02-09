import { useState, useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

// Imports to Backend and Types
import { supabase } from "@/integrations/supabase/client";
import { Lesson, Term } from "@/lib/types";

// New Components and Hooks
import { LessonSidebar } from "@/components/aprender/LessonSidebar";
import { LessonContent } from "@/components/aprender/LessonContent";
import { useLessonProgress } from "@/hooks/useLessonProgress";

import { JourneyGrid } from "@/components/aprender/JourneyGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Aprender() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // View Mode: 'journey' (Grid) or 'player' (Lesson Content)
  // Default to 'journey' for better UX
  const [viewMode, setViewMode] = useState<'journey' | 'player'>('journey');

  // Real Data States
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [allTerms, setAllTerms] = useState<Term[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Admin detection (memoized or calculated once)
  const isAdmin = useMemo(() => {
    return localStorage.getItem('educainvest_admin') === 'true' || user?.email === 'brunogd964@gmail.com';
  }, [user]);

  // Use custom hook for progress logic
  const {
    currentAulaId,
    currentAula,
    timeLeft,
    canComplete,
    handleLessonChange,
    handleCompleteAndNext,
    TIME_LIMIT,
    xpAmount
  } = useLessonProgress(lessons, user, completedLessonIds, setCompletedLessonIds, isAdmin);

  // Fetching Data
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);

        const [lessonsResult, termsResult, progressResult] = await Promise.all([
          supabase.from('lessons').select('*').order('order_index', { ascending: true }),
          supabase.from('terms').select('*'),
          session?.user
            ? supabase.from('user_progress')
              .select('lesson_id')
              .eq('user_id', session.user.id)
              .eq('is_completed', true)
            : Promise.resolve({ data: null })
        ]);

        const lessonsData = lessonsResult.data;
        const termsData = termsResult.data;
        const progressData = progressResult.data;

        const ids = progressData?.map((p: any) => p.lesson_id) || [];
        setCompletedLessonIds(ids);

        const mappedLessons: Lesson[] = (lessonsData || []).map((l: any) => ({
          ...l,
          titulo: l.title_short,
          tituloCompleto: l.title_full,
          nivel: l.level,
          duracao: l.duration,
          descricao: l.description,
          transcricaoCompleta: l.transcript_html
        }));
        setLessons(mappedLessons);

        const mappedTerms: Term[] = (termsData || []).map((t: any) => {
          const parentLesson = mappedLessons.find(l => l.id === t.lesson_id);
          return {
            ...t,
            sigla: t.acronym,
            nome: t.name,
            explicacaoCompleta: t.explanation_full,
            explicacaoSimplificada: t.explanation_simple,
            exemplo: t.example,
            dicaComoComecar: t.tip,
            nivelId: parentLesson?.nivel || 'fundamentos',
            aulaAssociadaId: t.lesson_id
          };
        });

        setAllTerms(mappedTerms);

      } catch (error: any) {
        console.error("Erro ao carregar dados:", error);

        if (error?.code === 'PGRST116' || error?.message?.includes('JWT')) {
          toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente",
            variant: "destructive"
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  // Filter Terms
  const termosDaAula = useMemo(() => {
    if (!allTerms.length || !currentAula) return [];

    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const transcriptLower = (currentAula.transcricaoCompleta || "").toLowerCase();

    return allTerms.filter(term => {
      if (term.aulaAssociadaId === currentAulaId) return true;

      const name = term.nome?.toLowerCase();
      const acronym = term.sigla?.toLowerCase();

      const hasName = name && new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(transcriptLower);
      const hasAcronym = acronym && new RegExp(`\\b${escapeRegExp(acronym)}\\b`, 'i').test(transcriptLower);

      return hasName || hasAcronym;
    });
  }, [currentAulaId, currentAula, allTerms]);

  // Loading State
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">Carregando conteúdo...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentAula) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-lg text-muted-foreground">Nenhuma aula encontrada.</p>
            <p className="text-sm text-muted-foreground/50">Tente recarregar a página ou contate o suporte.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle starting a lesson from the grid
  const handleSelectLesson = (id: number) => {
    handleLessonChange(id);
    setViewMode('player');
  };

  return (
    <Layout>
      <TooltipProvider>
        {viewMode === 'journey' ? (
          <div className="min-h-screen bg-slate-950 pb-20">
            <JourneyGrid
              lessons={lessons}
              completedLessonIds={completedLessonIds}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row min-h-screen lg:h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 lg:overflow-hidden relative">

            {/* Back to Journey Button (Mobile/Desktop) */}
            <div className="absolute top-4 left-4 z-50 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('journey')}
                className="bg-slate-900/80 backdrop-blur-md border border-white/10 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Mapa
              </Button>
            </div>

            {/* Desktop Back Button inside Sidebar area usually, but sidebar handles navigation. 
                We can add a "Back to Map" in the Sidebar header or just keep it as is. 
                For now, let's rely on the Sidebar or a global back. 
            */}

            <LessonSidebar
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              lessons={lessons}
              currentAulaId={currentAulaId}
              completedLessonIds={completedLessonIds}
              handleLessonChange={handleLessonChange}
              isAdmin={isAdmin}
              onBackToMap={() => setViewMode('journey')}
            />

            <LessonContent
              currentAula={currentAula}
              totalLessons={lessons.length}
              termosDaAula={termosDaAula}
              handleLessonChange={handleLessonChange}
              currentAulaId={currentAulaId}
              canComplete={canComplete}
              timeLeft={timeLeft}
              timeLimit={TIME_LIMIT}
              handleCompleteAndNext={handleCompleteAndNext}
              xpAmount={xpAmount}
              isAdmin={isAdmin}
              aulaFinalizada={completedLessonIds.includes(currentAulaId)}
            />
          </div>
        )}
      </TooltipProvider>
    </Layout>
  );
}
