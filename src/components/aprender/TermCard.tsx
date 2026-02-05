import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Termo } from "@/lib/termosData";
import { Level } from "./LevelFilter";

interface TermCardProps {
  term: Termo;
}

const levelLabels: Record<Level, { label: string; color: string }> = {
  iniciante: { label: "Iniciante", color: "bg-success/20 text-success" },
  intermediario: { label: "Intermediário", color: "bg-warning/20 text-warning" },
  experiente: { label: "Experiente", color: "bg-accent/20 text-accent" },
};

export function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const levelInfo = levelLabels[term.nivelId];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Collapsed State */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-primary">{term.sigla.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground">
              {term.sigla}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{term.nome}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-border">
              <div className="pt-4 space-y-4">
                {/* Explanation */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    📖 Explicação Simplificada
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {term.explicacao}
                  </p>
                </div>

                {/* Audio Button */}
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Audio playback would be implemented here
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                  Ouvir Explicação
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
