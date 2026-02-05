import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Volume2, 
  PauseCircle, 
  BookOpen, 
  Lightbulb, 
  Rocket,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Percent,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";
import { Level } from "./LevelFilter";

interface TermCardProps {
  term: Termo;
}

const levelLabels: Record<Level, { label: string; color: string; bg: string }> = {
  iniciante: { label: "Iniciante", color: "text-emerald-400", bg: "bg-emerald-400/10 border border-emerald-400/20" },
  intermediario: { label: "Intermediário", color: "text-amber-400", bg: "bg-amber-400/10 border border-amber-400/20" },
  avancado: { label: "Avançado", color: "text-rose-400", bg: "bg-rose-400/10 border border-rose-400/20" },
};

const getCategoryIcon = (category: string) => {
  const iconClass = "w-5 h-5 transition-transform duration-300 group-hover:scale-110";
  
  switch (category) {
    case 'indicadores': return <TrendingUp className={iconClass} />;
    case 'renda_fixa': return <ShieldCheck className={iconClass} />;
    case 'renda_variavel': return <BarChart3 className={iconClass} />;
    case 'taxas': return <Percent className={iconClass} />;
    case 'conceitos': return <Zap className={iconClass} />;
    default: return <BookOpen className={iconClass} />;
  }
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
      style={{ borderRadius: "0.75rem" }} 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group border transition-all duration-300 overflow-hidden w-full backdrop-blur-md ${
        isExpanded 
          ? "bg-slate-900/60 border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]" 
          : "bg-slate-900/40 border-white/10 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
      }`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-start gap-3 sm:gap-4 cursor-pointer relative z-10"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all mt-0.5 border ${
          isExpanded 
            ? "bg-primary/20 border-primary/30 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)] rotate-3" 
            : "bg-slate-800/50 border-white/10 text-primary/80 group-hover:border-primary/30 group-hover:text-primary"
        }`}>
          {getCategoryIcon(term.categoria)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-nowrap items-center gap-2 mb-1">
            <h3 className="font-bold text-base text-foreground leading-tight truncate">
              {term.sigla}
            </h3>
            <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide whitespace-nowrap ${levelInfo.bg} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          
          {/* CORREÇÃO AQUI: Adicionado 'h-10' para forçar altura de 2 linhas */}
          {/* Isso garante que cards com nomes curtos tenham o mesmo tamanho dos longos */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-snug h-10">
            {term.nome}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
           <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayAudio}
            className={`h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary ${isSpeaking ? "text-primary bg-primary/10 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]" : "text-muted-foreground"}`}
          >
            {isSpeaking ? <PauseCircle className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/50 p-1 group-hover:text-primary/70"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 bg-[#0B1120]/50 relative z-0"
          >
            <div className="p-4 space-y-4">
              <div className="relative pl-3 border-l-2 border-primary">
                <p className="text-sm text-foreground leading-normal">
                  {term.explicacaoSimplificada}
                </p>
              </div>

              <div className="bg-slate-900/50 border border-white/5 p-1 rounded-lg flex gap-1">
                <button
                  onClick={() => setActiveTab('tecnico')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'tecnico' 
                      ? "bg-primary/10 text-primary shadow-sm border border-primary/20" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Técnico
                </button>

                <button
                  onClick={() => setActiveTab('exemplo')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'exemplo' 
                      ? "bg-primary/10 text-primary shadow-sm border border-primary/20" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Na Prática
                </button>
              </div>

              <div className="h-[130px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeTab === 'tecnico' ? (
                    <motion.div
                      key="tecnico"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-900/40 border border-white/5 rounded-lg p-3 min-h-full"
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
                      className="bg-primary/5 border border-primary/10 rounded-lg p-3 min-h-full"
                    >
                      <p className="text-sm text-foreground/90 leading-normal">
                        {term.exemplo || "Exemplo não disponível."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {term.dicaComoComecar && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3 items-start shadow-[0_0_15px_rgba(var(--primary-rgb),0.05)]"
                >
                  <div className="bg-primary/10 p-1.5 rounded-full shrink-0 mt-0.5 border border-primary/20">
                    <Rocket className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase mb-1">
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
