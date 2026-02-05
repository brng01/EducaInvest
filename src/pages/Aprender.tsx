import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  Layers, 
  PlayCircle, 
  CheckCircle2, 
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { TermCard } from "@/components/aprender/TermCard";
import { Button } from "@/components/ui/button";
import { aulas, listaCompletaTermos } from "@/lib/termosData";
import { cn } from "@/lib/utils";

export default function Aprender() {
  const [currentAulaId, setCurrentAulaId] = useState(1);
  const currentAula = aulas.find(a => a.id === currentAulaId) || aulas[0];

  const termosDaAula = useMemo(() => {
    return listaCompletaTermos.filter((term) => term.aulaAssociadaId === currentAulaId);
  }, [currentAulaId]);

  const modulos = [
    { titulo: "Módulo 1: O Básico Invisível", aulas: aulas.filter(a => a.nivel === "iniciante") },
    { titulo: "Módulo 2: O Mercado", aulas: aulas.filter(a => a.nivel === "intermediario") },
    { titulo: "Módulo 3: Jogo Avançado", aulas: aulas.filter(a => a.nivel === "avancado") }
  ];

  // Função para avançar
  const handleNext = () => {
    if (currentAulaId < aulas.length) setCurrentAulaId(prev => prev + 1);
  };

  // Função para voltar
  const handlePrev = () => {
    if (currentAulaId > 1) setCurrentAulaId(prev => prev - 1);
  };

  const scrollbarClass = "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors";

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
        {/* --- COLUNA 1: MENU LATERAL --- */}
        <aside className={cn(
          "w-full lg:w-72 bg-slate-900/50 backdrop-blur-md border-r border-white/10 shrink-0 z-20",
          scrollbarClass
        )}>
          <div className="p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-6 text-primary sticky top-0 bg-slate-900/90 backdrop-blur-xl py-2 z-10 -mx-2 px-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
              <h2 className="font-display font-bold text-lg text-white">Cronograma</h2>
            </div>

            <div className="space-y-6">
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
                          onClick={() => setCurrentAulaId(aula.id)}
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
        <main className={cn("flex-1 h-full relative scroll-smooth bg-slate-950/30", scrollbarClass)}>
          <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 pb-32">
              
              <motion.div
                key={`header-${currentAula.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    <span>Aula {currentAula.id} de {aulas.length}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-primary">{currentAula.nivel}</span>
                 </div>
                 <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                   {currentAula.titulo}
                 </h1>
              </motion.div>

              <PodcastCard aula={currentAula} />

              <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Layers className="w-3 h-3" />
                  Conceitos da Aula
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* AQUI ESTÁ A CORREÇÃO: items-start adicionado */}
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
                  <div className="col-span-full p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground/50">
                    <p className="text-sm">Esta aula foca na teoria e mentalidade, sem termos técnicos específicos.</p>
                  </div>
                )}
              </div>

              {/* 3. NAVEGAÇÃO DUPLA (ANTERIOR / PRÓXIMA) */}
              <div className="pt-10 border-t border-white/10 flex justify-between items-center">
                
                {/* Botão Anterior */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handlePrev}
                  disabled={currentAulaId === 1}
                  className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-full px-6"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Aula Anterior
                </Button>

                {/* Botão Próxima */}
                <Button 
                    size="lg"
                    onClick={handleNext} 
                    disabled={currentAulaId === aulas.length}
                    className="group bg-white text-slate-900 hover:bg-white/90 font-bold rounded-full px-8 py-6 text-base shadow-lg shadow-white/5 transition-all hover:scale-105"
                  >
                    {currentAulaId === aulas.length ? "Concluir Curso" : "Próxima Aula"}
                    {currentAulaId !== aulas.length && (
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                </Button>
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
