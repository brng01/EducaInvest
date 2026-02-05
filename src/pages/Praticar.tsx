import { motion } from "framer-motion";
import { Gamepad2, Play, Lock, Zap, Brain, Trophy, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const games = [
  {
    id: "super-trunfo",
    title: "Super Trunfo do Investidor",
    emoji: "🃏",
    description:
      "Um jogo de cartas onde você aprende sobre risco e retorno comparando diferentes investimentos. Descubra quando é melhor arriscar e quando é melhor jogar na segurança!",
    skills: ["Risco vs Retorno", "Tipos de Investimento", "Tomada de Decisão"],
    difficulty: "Fácil",
    duration: "10-15 min",
    available: false,
    gradient: "from-blue-600/20 to-cyan-500/20", // Gradiente Glass
  },
  {
    id: "memoria-financeira",
    title: "Jogo da Memória Financeira",
    emoji: "🧠",
    description:
      "Exercite sua memória enquanto aprende! Combine as siglas (SELIC, CDI, CDB...) com seus significados e explicações. Quanto mais rápido, mais pontos!",
    skills: ["Memorização", "Siglas Financeiras", "Conceitos Básicos"],
    difficulty: "Fácil",
    duration: "5-10 min",
    available: false,
    gradient: "from-purple-600/20 to-pink-500/20", // Gradiente Glass
  },
  {
    id: "quiz-investidor",
    title: "Quiz do Investidor",
    emoji: "❓",
    description:
      "Teste seus conhecimentos com perguntas sobre investimentos. Cada resposta correta te aproxima do nível de Investidor Expert!",
    skills: ["Conhecimento Geral", "Conceitos", "Estratégias"],
    difficulty: "Médio",
    duration: "15-20 min",
    available: false,
    gradient: "from-emerald-600/20 to-green-500/20", // Gradiente Glass
  },
];

export default function Arcade() {
  return (
    <Layout>
      {/* Background com gradiente sutil */}
      <div className="py-12 md:py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          
          {/* Header Refinado - Estilo Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-md text-primary px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-sm font-medium">Arena de Treino</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-sm">
              Aprenda na prática
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
              Jogos educativos para fixar o conteúdo. Diversão garantida enquanto você domina o mercado financeiro.
            </p>
          </motion.div>

          {/* Stats Banner - Estilo Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 shadow-lg relative overflow-hidden"
          >
            {/* Efeito de brilho no fundo do banner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-display font-bold text-white">3</p>
                  <p className="text-sm text-muted-foreground font-medium">Jogos Disponíveis</p>
                </div>
              </div>
              
              <div className="w-px h-14 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Star className="w-7 h-7 text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-display font-bold text-white">0<span className="text-lg text-muted-foreground font-normal">/300</span></p>
                  <p className="text-sm text-muted-foreground font-medium">Seus Pontos</p>
                </div>
              </div>

              <div className="w-px h-14 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Zap className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-display font-bold text-white">Iniciante</p>
                  <p className="text-sm text-muted-foreground font-medium">Seu Nível</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                // Card Glass
                className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] transition-all duration-300"
              >
                {/* Header gradient translúcido */}
                <div className={`h-28 bg-gradient-to-br ${game.gradient} flex items-center justify-center border-b border-white/5 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <span className="text-6xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{game.emoji}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-display text-xl font-bold text-white leading-tight">{game.title}</h3>
                    {!game.available && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-slate-800 text-muted-foreground px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Breve
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium uppercase tracking-wide bg-white/5 text-muted-foreground border border-white/5 px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground/80 mb-5 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" />
                      {game.difficulty}
                    </span>
                    <span className="flex items-center gap-1.5">
                      ⏱️ {game.duration}
                    </span>
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full gap-2 font-bold shadow-lg transition-all ${
                      game.available 
                      ? "shadow-primary/20 hover:shadow-primary/40" 
                      : "opacity-80"
                    }`}
                    disabled={!game.available}
                    variant={game.available ? "default" : "secondary"}
                    size="lg"
                  >
                    {game.available ? (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        Jogar Agora
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Em Desenvolvimento
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 text-primary px-6 py-3 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
              <Zap className="w-5 h-5 fill-current" />
              <span className="font-medium">
                Novos desafios sendo criados! Fique ligado 🚀
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
