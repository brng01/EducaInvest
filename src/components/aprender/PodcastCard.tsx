import { motion } from "framer-motion";
import { Headphones, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PodcastCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 md:p-8 text-primary-foreground mb-8"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <Headphones className="w-10 h-10" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
              🎧 Aula em Áudio
            </span>
            <span className="text-xs opacity-80 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              15 min
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
            Aula Introdutória: Por onde começar?
          </h3>
          <p className="text-sm md:text-base opacity-90 mb-4 max-w-xl">
            Ouça nossa aula inicial e entenda os conceitos básicos que todo investidor 
            precisa saber antes de dar o primeiro passo. Explicação clara e sem jargões!
          </p>
        </div>

        {/* Play Button */}
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 shadow-lg shrink-0"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Play Podcast
        </Button>
      </div>
    </motion.div>
  );
}
