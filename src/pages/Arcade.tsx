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
    gradient: "bg-gradient-hero",
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
    gradient: "bg-gradient-arcade",
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
    gradient: "bg-gradient-success",
  },
];

export default function Arcade() {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-arcade text-primary-foreground px-4 py-2 rounded-full mb-4">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-sm font-medium">Arcade Financeiro</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Aprenda brincando! 🎮
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jogos educativos para fixar o que você aprendeu. Diversão garantida 
              enquanto você domina o mundo dos investimentos.
            </p>
          </motion.div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-display font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Jogos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-display font-bold">0/300</p>
                  <p className="text-sm text-muted-foreground">Pontos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-display font-bold">Iniciante</p>
                  <p className="text-sm text-muted-foreground">Seu Nível</p>
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
                className="relative bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow"
              >
                {/* Header gradient */}
                <div className={`h-24 ${game.gradient} flex items-center justify-center`}>
                  <span className="text-5xl">{game.emoji}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-lg font-bold">{game.title}</h3>
                    {!game.available && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Em breve
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {game.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {game.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      {game.difficulty}
                    </span>
                    <span>⏱️ {game.duration}</span>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full gap-2"
                    disabled={!game.available}
                    variant={game.available ? "default" : "secondary"}
                  >
                    {game.available ? (
                      <>
                        <Play className="w-4 h-4" />
                        Jogar Agora
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Em Breve
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
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full">
              <Zap className="w-5 h-5" />
              <span className="font-medium">
                Novos jogos sendo desenvolvidos! Fique ligado 🚀
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
