import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, PauseCircle, BookOpen, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";
import { Level } from "./LevelFilter";

interface TermCardProps {
  term: Termo;
}

const levelLabels: Record<Level, { label: string; color: string; bg: string }> = {
  iniciante: { label: "Iniciante", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  intermediario: { label: "Intermediário", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  avancado: { label: "Avançado", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30" },
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'exemplo' | 'tecnico'>('exemplo');
  
  const levelInfo = levelLabels[term.nivelId] || levelLabels['iniciante'];

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const textToRead = term.explicacaoSimplificada || "Texto indisponível";
    
    if (term.audioUrl) {
      const audio = new Audio(term.audioUrl);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
      setIsSpeaking(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "pt-BR";
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <motion.div
      layout
      // Mantém o borderRadius fixo para não distorcer na animação
      style={{ borderRadius: "0.75rem" }} 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Removemos transition-all para evitar conflito com o Framer Motion
      className={`group border transition-colors duration-300 overflow-hidden w-full ${
        isExpanded 
          ? "bg-card border-primary/50 shadow-lg ring-1 ring-primary/20" 
          : "bg-card border-border/60 hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {/* --- HEADER ADAPTÁVEL (Melhor UX Mobile) --- */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        // items-start: Alinha ícones no topo caso o texto quebre linha (fica mais bonito)
        className="w-full p-4 flex items-start gap-3 sm:gap-4 cursor-pointer relative"
      >
        {/* Ícone Sigla */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
          isExpanded ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
        }`}>
          <span className="text-lg font-bold">{term.sigla.charAt(0)}</span>
        </div>

        {/* Info Principal - Agora permite quebra de linha */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-base text-foreground leading-tight break-words">
              {term.sigla}
            </h3>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide border border-transparent whitespace-nowrap ${levelInfo.bg} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          {/* line-clamp-2 permite até 2 linhas de texto antes de cortar, melhor que truncate */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-snug">
            {term.nome}
          </p>
        </div>

        {/* Controles da Direita */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
           <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayAudio}
            className={`h-8 w-8 rounded-full ${isSpeaking ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
          >
            {isSpeaking ? <PauseCircle className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/50 p-1"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* --- CONTEÚDO EXPANDIDO --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/40 bg-muted/30"
          >
            <div className="p-4 space-y-4">
              
              {/* Resumo */}
              <div className="relative pl-3 border-l-2 border-primary">
                <p className="text-sm text-foreground leading-normal">
                  {term.explicacaoSimplificada}
                </p>
              </div>

              {/* Seletor de Abas */}
              <div className="bg-background/50 p-1 rounded-lg flex gap-1 border border-border/50">
                <button
                  onClick={() => setActiveTab('tecnico')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'tecnico' 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Técnico
                </button>

                <button
                  onClick={() => setActiveTab('exemplo')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'exemplo' 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Na Prática
                </button>
              </div>

              {/* Conteúdo da Aba (Altura Fixa e Scroll) */}
              <div className="h-[130px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeTab === 'tecnico' ? (
                    <motion.div
                      key="tecnico"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-500/5 border border-border/50 rounded-lg p-3 min-h-full"
                    >
                      <p className="text-sm text-muted-foreground italic leading-normal">
                        "{term.explicacaoCompleta || "Definição não disponível."}"
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="exemplo"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 min-h-full"
                    >
                      <p className="text-sm text-foreground/90 leading-normal">
                        {term.exemplo || "Exemplo não disponível."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DICA EXTRA: Como Começar */}
              {term.dicaComoComecar && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 flex gap-3 items-start"
                >
                  <div className="bg-emerald-500/10 p-1.5 rounded-full shrink-0 mt-0.5">
                    <Rocket className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-500 uppercase mb-1">
                      Como Começar
                    </h4>
                    <p className="text-xs text-foreground/80 leading-normal">
                      {term.dicaComoComecar}
                    </p>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
