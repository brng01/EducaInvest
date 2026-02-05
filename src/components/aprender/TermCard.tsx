import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Volume2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";

interface TermCardProps {
  term: Termo;
  hideLevel?: boolean; // NOVA PROPRIEDADE OPCIONAL
}

export function TermCard({ term, hideLevel = false }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Cores baseadas no nível (mantemos a lógica caso precise usar a cor na borda)
  const levelColor = 
    term.nivelId === 'iniciante' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
    term.nivelId === 'intermediario' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
    'text-rose-500 bg-rose-500/10 border-rose-500/20';

  const Icon = term.categoria === 'indicadores' ? Lightbulb : 
               term.categoria === 'renda_fixa' ?  Lightbulb : 
               Lightbulb; // Pode variar ícone por categoria depois

  return (
    <div className="h-full">
      <motion.div 
        layout="position"
        className={`h-full bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all flex flex-col ${isExpanded ? 'ring-1 ring-primary/50' : ''}`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800 border border-white/5 text-primary`}>
                <span className="font-display font-bold text-sm">{term.sigla.substring(0, 2)}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{term.sigla}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{term.nome}</p>
              </div>
            </div>

            {/* AQUI: SÓ RENDERIZA SE hideLevel FOR FALSO */}
            {!hideLevel && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${levelColor}`}>
                {term.nivelId}
              </span>
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {term.explicacaoSimplificada}
            </p>
          </div>

          {/* Botão de Expandir/Ocultar */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            {term.audioUrl && (
               <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full hover:bg-white/5">
                 <Volume2 className="w-4 h-4" />
               </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-xs h-8 text-primary hover:text-primary/80 hover:bg-primary/10 gap-1 pr-2 pl-3 rounded-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Menos detalhes" : "Ver detalhes"}
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>

        {/* Área Expandida */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-950/30 border-t border-white/5"
            >
              <div className="p-5 space-y-4 text-sm">
                <div>
                  <h4 className="text-primary font-bold mb-1 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Lightbulb className="w-3 h-3" /> Explicação Técnica
                  </h4>
                  <p className="text-muted-foreground">{term.explicacaoCompleta}</p>
                </div>
                
                {term.exemplo && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-white font-bold text-xs block mb-1">Exemplo Prático:</span>
                    <p className="text-muted-foreground italic">"{term.exemplo}"</p>
                  </div>
                )}

                {term.dicaComoComecar && (
                   <div>
                    <span className="text-emerald-400 font-bold text-xs block mb-1">Dica de Ouro:</span>
                    <p className="text-muted-foreground">{term.dicaComoComecar}</p>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
