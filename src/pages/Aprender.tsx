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

export default function Aprender() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

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

  // ========== 1. FETCHING DATA FROM SUPABASE ==========
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);

        // Parallelize queries
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

        // Map completed lessons
        const ids = progressData?.map((p: any) => p.lesson_id) || [];
        setCompletedLessonIds(ids);

        // Map lessons
        // Note: The database fields might not match exact Lesson interface if we are strictly typing
        // But for now we cast or map as we did before, but cleaner
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

        // Map terms
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
        // INJECTION REMOVED: Term is now in Supabase

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

  // ========== FILTER TERMS ==========
  const termosDaAula = useMemo(() => {
    if (!allTerms.length || !currentAula) return [];

    // Função para escapar caracteres especiais de regex
    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Normaliza o texto da aula para busca
    const transcriptLower = (currentAula.transcricaoCompleta || "").toLowerCase();

    return allTerms.filter(term => {
      // 1. Prioridade: Se o termo pertence explicitamente à aula
      if (term.aulaAssociadaId === currentAulaId) return true;

      // 2. Busca Dinâmica: Se o termo é mencionado no texto da aula
      const name = term.nome?.toLowerCase();
      const acronym = term.sigla?.toLowerCase();

      // Verifica se o NOME do termo aparece (com word boundaries para evitar parciais)
      // Ex: "Renda" não deve dar match em "Renda Fixa" se "Renda" for um termo separado (mas aqui queremos inclusão)
      // Usaremos includes simples primeiro para performance, mas validação mais robusta seria regex
      // Regex: \btermo\b

      const hasName = name && new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(transcriptLower);
      const hasAcronym = acronym && new RegExp(`\\b${escapeRegExp(acronym)}\\b`, 'i').test(transcriptLower);

      return hasName || hasAcronym;
    });
  }, [currentAulaId, currentAula, allTerms]);

  // ========== LOADING STATE ==========
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

  return (
    <Layout>
      <TooltipProvider>
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 lg:overflow-hidden">

          <LessonSidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            lessons={lessons}
            currentAulaId={currentAulaId}
            completedLessonIds={completedLessonIds}
            handleLessonChange={handleLessonChange}
            isAdmin={isAdmin}
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
            isCompleted={completedLessonIds.includes(currentAulaId)}
          />

        </div>
      </TooltipProvider>
    </Layout>
  );
}
