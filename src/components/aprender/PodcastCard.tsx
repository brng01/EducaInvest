import { motion } from "framer-motion";
import { Headphones, Play, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PodcastCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      // Ajuste de Cor: Fundo escuro com borda sutil para ornar com o tema
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 text-foreground mb-8 shadow-2xl"
    >
      {/* Decorações de fundo mais discretas */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Icon - Usando a cor primária do site */}
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
          <Headphones className="w-10 h-10 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/10">
              🎧 Aula em Áudio
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              4 min
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-foreground">
            Dominando o Mercado: Por onde começar?
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-xl leading-relaxed">
            Traduzimos o "economês" para você investir com confiança. Ouça nossa aula rápida 
            e entenda os conceitos fundamentais para o seu bolso.
          </p>
          
          {/* Botão de Acessibilidade (Futura integração Supabase) */}
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary hover:text-primary/80 gap-2 text-xs font-semibold uppercase tracking-tight"
          >
            <FileText className="w-3 h-3" />
            Ver Transcrição da Aula
          </Button>
        </div>

        {/* Play Button - Destaque em Azul */}
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shrink-0 rounded-full px-8"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Ouvir Agora
        </Button>
      </div>
    </motion.div>
  );
}
