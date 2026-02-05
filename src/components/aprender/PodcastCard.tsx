import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Clock, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aula } from "@/lib/termosData";

interface PodcastCardProps {
  aula: Aula;
}

// ATENÇÃO: O 'export function' aqui é obrigatório para funcionar com { PodcastCard }
export function PodcastCard({ aula }: PodcastCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="w-full">
      <motion.div
        key={aula.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-10 text-foreground shadow-2xl"
      >
        {/* Efeito de Glow no fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Icon Box */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shrink-0 border border-white/10 shadow-inner group">
            <Headphones className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Content */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                aula.nivel === 'iniciante' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                aula.nivel === 'intermediario' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                {aula.nivel}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                <Clock className="w-3 h-3" />
                {aula.duracao}
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                {aula.tituloCompleto || aula.titulo}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {aula.descricao}
              </p>
            </div>
            
            {/* Controles */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-8 h-12 font-semibold text-base transition-transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Ouvir Aula {aula.id}
              </Button>

              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowTranscript(!showTranscript)}
                className="h-12 px-6 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40 transition-all gap-2"
              >
                <FileText className="w-4 h-4" />
                {showTranscript ? "Ocultar Texto" : "Ler Transcrição"}
                {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Área de Transcrição Expansível */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-8 border-t border-white/10 relative">
                 <div 
                  className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-li:text-slate-300 max-w-none bg-slate-950/30 p-6 md:p-8 rounded-2xl border border-white/5"
                  dangerouslySetInnerHTML={{ __html: aula.transcricaoCompleta }} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
