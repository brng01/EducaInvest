import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  Layers, 
  PlayCircle, 
  CheckCircle2, 
  Loader2,
  Timer,
  Lock,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Imports do Backend e Tipagem
import { supabase } from "@/integrations/supabase/client"; 
import { Aula, Termo } from "@/lib/termosData"; 

const TIME_LIMIT = 120; // Aumentado para 2 minutos (mais realista)

// ========== COMPONENTE: BARRA DE PROGRESSO DO TIMER ==========
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

// ========== COMPONENTE PRINCIPAL ==========
export default function Aprender() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Estados para os Dados Reais
  const [lessons, setLessons] = useState<Aula[]>([]);
  const [allTerms, setAllTerms] = useState<Termo[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados da Gamificação e Trava
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [canComplete, setCanComplete] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // ========== ESTADO COM PERSISTÊNCIA ==========
  const [currentAulaId, setCurrentAulaId] = useState(() => {
    // Carrega do localStorage como fallback imediato
    const saved = localStorage.getItem('educainvest_current_lesson');
    return saved ? parseInt(saved, 10) : 1;
  });

  // ========== FUNÇÃO PARA TROCAR DE AULA (com persistência) ==========
  const handleLessonChange = (newId: number) => {
    setCurrentAulaId(newId);
    localStorage.setItem('educainvest_current_lesson', newId.toString());
    setIsMobileMenuOpen(false); // Fecha menu mobile
    window.scrollTo(0, 0); // Scroll para topo
    
    // Salva no Supabase em background (não bloqueia UI)
    if (user) {
      supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: newId,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' }).catch(err => {
        console.error("Erro ao salvar aula atual:", err);
      });
    }
  };

  // ========== 1. BUSCANDO DADOS DO SUPABASE (OTIMIZADO COM Promise.all) ==========
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);

        // Paraleliza todas as queries para melhor performance
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

        // Mapeia aulas concluídas
        const ids = progressData?.map(p => p.lesson_id) || [];
        setCompletedLessonIds(ids);

        // Mapeia lições
        const mappedLessons: Aula[] = (lessonsData || []).map((l: any) => ({
          id: l.id,
          titulo: l.title_short,
          tituloCompleto: l.title_full,
          nivel: l.level,
          duracao: l.duration,
          descricao: l.description,
          transcricaoCompleta: l.transcript_html
        }));
        setLessons(mappedLessons);

        // Mapeia termos
        const mappedTerms: Termo[] = (termsData || []).map((t: any) => {
          const parentLesson = mappedLessons.find(l => l.id === t.lesson_id);
          return {
            id: t.id,
            sigla: t.acronym,
            nome: t.name,
            explicacaoCompleta: t.explanation_full,
            explicacaoSimplificada: t.explanation_simple,
            exemplo: t.example,
            dicaComoComecar: t.tip,
            nivelId: parentLesson?.nivel || 'iniciante', 
            categoria: t.category,
            aulaAssociadaId: t.lesson_id
          };
        });
        setAllTerms(mappedTerms);

        // Carrega última aula do Supabase (sobrescreve localStorage se houver)
        if (session?.user) {
          const { data: lastLesson } = await supabase
            .from('user_progress')
            .select('lesson_id')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();
          
          if (lastLesson?.lesson_id) {
            setCurrentAulaId(lastLesson.lesson_id);
            localStorage.setItem('educainvest_current_lesson', lastLesson.lesson_id.toString());
          }
        }

      } catch (error: any) {
        console.error("Erro ao carregar dados:", error);
        
        // Tratamento específico de erro de autenticação
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

  // ========== 2. LÓGICA DO TIMER (Reseta ao trocar de aula) ==========
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

  const currentAula = lessons.find(a => a.id === currentAulaId) || lessons[0];

  // ========== CÁLCULO DO XP BASEADO NA DIFICULDADE ==========
  const getXpReward = (nivel: string) => {
    const rewards: Record<string, number> = {
      'iniciante': 100,
      'intermediario': 300,
      'avancado': 500
    };
    return rewards[nivel?.toLowerCase()] || 100;
  };

  const xpAmount = currentAula ? getXpReward(currentAula.nivel) : 100;

  // ========== 3. FUNÇÃO DE CONCLUSÃO COM XP DINÂMICO ==========
  const handleCompleteAndNext = async () => {
    if (!canComplete || !user) return;

    // Efeito de Confete apenas na última aula do módulo ou curso
    const isLastOfModule = lessons.filter(l => l.nivel === currentAula.nivel).pop()?.id === currentAulaId;
    const isLastOfCourse = currentAulaId === lessons.length;
    
    if (isLastOfModule || isLastOfCourse) {
      confetti({
        particleCount: isLastOfCourse ? 200 : 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#ffffff', '#60a5fa', '#10b981']
      });
    }

    try {
      // Salva progresso (Marca aula como completa)
      const { error: progressError } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: currentAulaId,
        is_completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id, lesson_id' });

      if (progressError) throw progressError;

      // ATUALIZAÇÃO LOCAL: Libera a próxima aula no menu instantaneamente
      setCompletedLessonIds(prev => [...prev, currentAulaId]);

      // Adiciona XP Dinâmico ao Perfil
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
      return; // Não avança se houver erro
    }

    // Avança para próxima aula
    if (currentAulaId < lessons.length) {
      handleLessonChange(currentAulaId + 1);
    }
  };

  // ========== FILTRAGEM DE TERMOS COM EARLY RETURN ==========
  const termosDaAula = useMemo(() => {
    if (!allTerms.length) return [];
    return allTerms.filter(t => t.aulaAssociadaId === currentAulaId);
  }, [currentAulaId, allTerms]);
  
  // ========== LÓGICA DE BLOQUEIO DO MENU (MELHORADA) ==========
  const maxCompletedId = completedLessonIds.length > 0 ? Math.max(...completedLessonIds) : 0;

  const modulos = [
    { titulo: "Módulo 1: O Básico Invisível", aulas: lessons.filter(a => a.nivel === "iniciante") },
    { titulo: "Módulo 2: O Mercado", aulas: lessons.filter(a => a.nivel === "intermediario") },
    { titulo: "Módulo 3: Jogo Avançado", aulas: lessons.filter(a => a.nivel === "avancado") }
  ];

  const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

  // ========== LOADING STATE ==========
  if (isLoading || !currentAula) {
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

  return (
    <Layout>
      <TooltipProvider>
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 lg:overflow-hidden">
          
          {/* ========== COLUNA 1: MENU LATERAL ========== */}
          <aside className={cn(
            "w-full lg:w-72 bg-slate-900/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 z-20 transition-all",
            scrollbarClass,
            isMobileMenuOpen ? "h-auto" : "h-auto" 
          )}>
            <div className="p-4 lg:p-6">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between lg:justify-start gap-2 mb-2 lg:mb-6 text-primary sticky top-0 bg-slate-900/90 backdrop-blur-xl py-2 z-10 -mx-2 px-2 rounded-lg lg:cursor-default"
                aria-label="Menu de aulas"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="font-display font-bold text-lg text-white">Cronograma</h2>
                </div>
                <ChevronDown className={cn("w-5 h-5 lg:hidden transition-transform", isMobileMenuOpen ? "rotate-180" : "")} />
              </button>

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
                        const isCompleted = completedLessonIds.includes(aula.id);
                        const isLocked = aula.id > (maxCompletedId + 1);

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
                            aria-label={`Aula ${aula.id}: ${aula.titulo}`}
                            aria-current={isActive ? "page" : undefined}
                            aria-disabled={isLocked}
                          >
                            {/* Ícones de Estado */}
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                            ) : isActive ? (
                              <PlayCircle className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                            )}
                            
                            <span className="line-clamp-1">{aula.id}. {aula.titulo}</span>
                          </button>
                        );

                        // Adiciona Tooltip apenas para aulas travadas
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
              </div>
            </div>
          </aside>

          {/* ========== COLUNA 2: CONTEÚDO DA AULA ========== */}
          <main className={cn("flex-1 relative bg-slate-950/30 lg:h-full lg:overflow-y-auto", scrollbarClass)}>
            <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8 pb-32">
                
                <motion.div
                  key={`header-${currentAula.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    <span>Aula {currentAula.id} de {lessons.length}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-primary">{currentAula.nivel}</span>
                  </div>
                  <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {currentAula.tituloCompleto}
                  </h1>
                </motion.div>

                <PodcastCard aula={currentAula} />

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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <TermCard term={term} hideLevel={true} /> 
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground/50 text-sm">
                      Esta aula foca na teoria e mentalidade, sem termos técnicos específicos.
                    </div>
                  )}
                </div>

                {/* ========== NAVEGAÇÃO COM BOTÃO DE XP E TIMER ========== */}
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
                      <ProgressBar timeLeft={timeLeft} total={TIME_LIMIT} />
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
                        ? (currentAulaId === lessons.length ? "🎉 Concluir Curso" : `Concluir e Ganhar +${xpAmount} XP`) 
                        : `Aguarde ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                      {canComplete && currentAulaId !== lessons.length && (
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
        </div>
      </TooltipProvider>
    </Layout>
  );
}
