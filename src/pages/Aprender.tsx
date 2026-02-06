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
  Timer // Novo ícone para o timer
} from "lucide-react";
import confetti from "canvas-confetti"; // Biblioteca de celebração
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Import do Toast para feedback

// Imports do Backend e Tipagem
import { supabase } from "@/integrations/supabase/client"; 
import { Aula, Termo } from "@/lib/termosData"; 

const TIME_LIMIT = 30; // Tempo em segundos para liberar o XP

export default function Aprender() {
  const [currentAulaId, setCurrentAulaId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Estados para os Dados Reais
  const [lessons, setLessons] = useState<Aula[]>([]);
  const [allTerms, setAllTerms] = useState<Termo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados da Gamificação e Trava
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [canComplete, setCanComplete] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // 1. Buscando dados do Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);

        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .order('order_index', { ascending: true });

        const { data: termsData } = await supabase.from('terms').select('*');

        const mappedLessons: Aula[] = (lessonsData || []).map((l: any) => ({
          id: l.id,
          titulo: l.title_short,
          tituloCompleto: l.title_full,
          nivel: l.level, // Importante: deve ser 'iniciante', 'intermediario', ou 'avancado'
          duracao: l.duration,
          descricao: l.description,
          transcricaoCompleta: l.transcript_html
        }));
        setLessons(mappedLessons);

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
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Lógica do Timer (Reseta ao trocar de aula)
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

  // Cálculo do XP baseado na dificuldade
  const getXpReward = (nivel: string) => {
    const rewards: Record<string, number> = {
      'iniciante': 100,
      'intermediario': 300,
      'avancado': 500
    };
    return rewards[nivel?.toLowerCase()] || 100;
  };

  const xpAmount = currentAula ? getXpReward(currentAula.nivel) : 100;

  // 3. Função de Conclusão com XP Dinâmico
  const handleCompleteAndNext = async () => {
    if (!canComplete || !user) return;

    // Efeito de Confete
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#ffffff', '#60a5fa']
    });

    try {
      // Salva progresso (Marca aula como completa)
      const { error: progressError } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: currentAulaId,
        is_completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id, lesson_id' });

      if (progressError) throw progressError;

      // Adiciona XP Dinâmico ao Perfil
      const { data: perfil } = await supabase.from('perfis').select('xp_total').eq('id', user.id).single();
      const newTotal = (perfil?.xp_total || 0) + xpAmount;
      
      await supabase.from('perfis').update({ xp_total: newTotal }).eq('id', user.id);

      toast({
        title: `+${xpAmount} XP Conquistados!`,
        description: "Progresso salvo com sucesso.",
        className: "bg-emerald-500 border-none text-white"
      });

    } catch (error) {
      console.error("Erro ao salvar XP:", error);
      toast({
        title: "Erro ao salvar",
        description: "Verifique sua conexão.",
        variant: "destructive"
      });
    }

    // Avança para próxima aula
    if (currentAulaId < lessons.length) {
      setCurrentAulaId(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const termosDaAula = useMemo(() => allTerms.filter(t => t.aulaAssociadaId === currentAulaId), [currentAulaId, allTerms]);
  
  const modulos = [
    { titulo: "Módulo 1: O Básico Invisível", aulas: lessons.filter(a => a.nivel === "iniciante") },
    { titulo: "Módulo 2: O Mercado", aulas: lessons.filter(a => a.nivel === "intermediario") },
    { titulo: "Módulo 3: Jogo Avançado", aulas: lessons.filter(a => a.nivel === "avancado") }
  ];

  const scrollbarClass = "lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 lg:[&::-webkit-scrollbar-thumb]:rounded-full hover:lg:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

  if (isLoading || !currentAula) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen lg:h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 lg:overflow-hidden">
        
        {/* --- COLUNA 1: MENU LATERAL --- */}
        <aside className={cn(
          "w-full lg:w-72 bg-slate-900/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 z-20 transition-all",
          scrollbarClass,
          isMobileMenuOpen ? "h-auto" : "h-auto" 
        )}>
          <div className="p-4 lg:p-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between lg:justify-start gap-2 mb-2 lg:mb-6 text-primary sticky top-0 bg-slate-900/90 backdrop-blur-xl py-2 z-10 -mx-2 px-2 rounded-lg lg:cursor-default"
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
                      const isCompleted = currentAulaId > aula.id;
                      return (
                        <button
                          key={aula.id}
                          onClick={() => {
                            setCurrentAulaId(aula.id);
                            setIsMobileMenuOpen(false); 
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-3 group",
                            isActive 
                              ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]" 
                              : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                          )}
                        >
                          {isActive ? (
                            <PlayCircle className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                          )}
                          <span className="line-clamp-1">{aula.id}. {aula.titulo}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- COLUNA 2: CONTEÚDO DA AULA --- */}
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

              {/* Navegação Dupla com Botão de XP Travado e Valor Dinâmico */}
              <div className="pt-10 border-t border-white/10 flex flex-col-reverse gap-4 md:flex-row justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentAulaId(prev => prev - 1)}
                  disabled={currentAulaId === 1}
                  className="text-muted-foreground hover:text-white rounded-full px-6 w-full md:w-auto"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Aula Anterior
                </Button>

                <div className="flex flex-col items-center gap-2 w-full md:w-auto">
                  <Button 
                    size="lg"
                    onClick={handleCompleteAndNext} 
                    disabled={!canComplete}
                    className={cn(
                      "group font-bold rounded-full px-8 py-6 text-base transition-all w-full md:w-auto",
                      canComplete 
                        ? "bg-white text-slate-900 hover:scale-105" 
                        : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                    )}
                  >
                    {!canComplete && <Timer className="w-4 h-4 mr-2 animate-pulse" />}
                    {canComplete 
                      ? (currentAulaId === lessons.length ? "Concluir Curso" : `Concluir e Ganhar +${xpAmount} XP`) 
                      : `Aguarde ${timeLeft}s para liberar`}
                    {canComplete && currentAulaId !== lessons.length && (
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1" />
                    )}
                  </Button>
                  {!canComplete && (
                    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest animate-pulse">
                      Estude o conteúdo para coletar seus pontos
                    </p>
                  )}
                </div>
              </div>

              <footer className="text-center text-[10px] text-muted-foreground/30 pt-8">
                <p>© 2026 EducaInvest.</p>
              </footer>
          </div>
        </main>
      </div>
    </Layout>
  );
}
