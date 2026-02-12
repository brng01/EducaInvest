import { motion } from "framer-motion";
import { Gamepad2, Play, Lock, Zap, Brain, Trophy, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { OConsultor } from "@/components/games/OConsultor";
import { DesafioTermos } from "@/components/games/DesafioTermos";
import { EmpireBuilder } from "@/components/games/EmpireBuilder";
import { getLevelInfo, formatNumber } from "@/lib/utils";

const games = [
  {
    id: "consultor",
    title: "O Consultor",
    emoji: "🃏",
    description: "Assuma o papel de um consultor financeiro e decida: é golpe ou oportunidade? Deslize para aprovar ou rejeitar cenários do dia a dia.",
    skills: ["Malícia Financeira", "Identificação de Golpes", "Tomada de Decisão"],
    difficulty: "Fácil",
    duration: "5 min",
    available: true,
    gradient: "from-blue-600/20 to-cyan-500/20",
  },
  {
    id: "termos",
    title: "Desafio de Termos",
    emoji: "🧩",
    description: "Você sabe o que é Selic ou Liquidez? Conecte os termos às suas definições corretas contra o relógio e domine o vocabulário.",
    skills: ["Vocabulário Técnico", "Conceitos Básicos", "Agilidade"],
    difficulty: "Médio",
    duration: "1 min",
    available: true,
    gradient: "from-purple-600/20 to-pink-500/20",
  },
  {
    id: "empire",
    title: "Empire Builder",
    emoji: "🏗️",
    description: "Construa seu império financeiro! Comece trabalhando e invista para gerar renda passiva. Aprenda na prática o efeito dos juros compostos.",
    skills: ["Renda Ativa x Passiva", "Juros Compostos", "Gestão de Patrimônio"],
    difficulty: "Médio",
    duration: "Infinito",
    available: true,
    gradient: "from-emerald-600/20 to-green-500/20",
  },
];

export default function Arcade() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [xp, setXP] = useState(0);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });
    setActiveGame(null);
  }, [location.key]);

  useEffect(() => {
    if (activeGame) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Fetch XP from DB if user is logged in
    const fetchXP = async () => {
      if (user) {
        const { data } = await supabase
          .from('perfis')
          .select('xp_total')
          .eq('id', user.id)
          .single();
        if (data) setXP(data.xp_total || 0);
      } else {
        setXP(0);
      }
    };

    fetchXP();

    // Listen for XP updates
    const handleUpdate = () => fetchXP();
    window.addEventListener('educainvest_xp_updated', handleUpdate);
    return () => window.removeEventListener('educainvest_xp_updated', handleUpdate);
  }, [activeGame, user]);

  const { name: levelName, nextLevel } = getLevelInfo(xp);
  const xpToNext = nextLevel ? nextLevel.min - xp : 0;
  const progressToNext = nextLevel ? ((xp - getLevelInfo(xp).min) / (nextLevel.min - getLevelInfo(xp).min)) * 100 : 100;


  return (
    <Layout>
      <div className="py-12 md:py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent min-h-screen">
        <div className="container mx-auto px-4">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {!activeGame && (
              <>
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
              </>
            )}
          </motion.div>

          {/* Game Area or List */}
          {activeGame ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl min-h-[600px]"
            >
              {activeGame === 'consultor' && <OConsultor onBack={() => setActiveGame(null)} user={user} />}
              {activeGame === 'termos' && <DesafioTermos onBack={() => setActiveGame(null)} user={user} />}
              {activeGame === 'empire' && <EmpireBuilder onBack={() => setActiveGame(null)} user={user} />}
            </motion.div>
          ) : (
            <>
              {/* Stats Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 shadow-lg relative overflow-hidden"
              >
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
                      <p className="text-3xl font-display font-bold text-white tabular-nums">
                        {formatNumber(xp)}
                        {nextLevel && (
                          <span className="text-lg text-muted-foreground font-normal">/{formatNumber(nextLevel.min)}</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">Seus Pontos XP</p>
                    </div>
                  </div>

                  <div className="w-px h-14 bg-white/10 hidden md:block" />

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <Zap className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-3xl font-display font-bold text-white">{levelName}</p>
                      <p className="text-sm text-muted-foreground font-medium">Seu Nível</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Games Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game, index) => {
                  // Restricted Games Logic
                  const isRestricted = ['consultor', 'empire'].includes(game.id);
                  const isLockedForGuest = isRestricted && !user;

                  // If locked for guest, it overrides "available". But we also respect original "available" false.
                  // Actually, let's say "available" is about development status.
                  // So if available=true BUT lockedForGuest, we show Lock.

                  const showLock = !game.available || isLockedForGuest;

                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] transition-all duration-300 flex flex-col h-full"
                    >
                      <div className={`h-28 bg-gradient-to-br ${game.gradient} flex items-center justify-center border-b border-white/5 relative overflow-hidden shrink-0`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                        <span className="text-6xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{game.emoji}</span>

                        {/* Overlay Lock for Guests */}
                        {isLockedForGuest && (
                          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-[2px]">
                            <Lock className="w-10 h-10 text-white/50" />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h2 className="font-display text-xl font-bold text-white leading-tight">{game.title}</h2>
                          {showLock && (
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-slate-800 text-muted-foreground px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              {isLockedForGuest ? "Membros" : "Breve"}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                          {game.description}
                        </p>

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

                        <div className="flex items-center justify-between text-xs text-muted-foreground/80 mb-5 pt-4 border-t border-white/5 mt-auto">
                          <span className="flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5" />
                            {game.difficulty}
                          </span>
                          <span className="flex items-center gap-1.5">
                            ⏱️ {game.duration}
                          </span>
                        </div>

                        <Button
                          className={`w-full gap-2 font-bold shadow-lg transition-all ${!showLock
                            ? "shadow-primary/20 hover:shadow-primary/40"
                            : "opacity-80"
                            }`}
                          disabled={!game.available && !isLockedForGuest} // Disable if dev status, enable if guest lock (to click)
                          variant={!showLock ? "default" : "secondary"}
                          size="lg"
                          onClick={() => {
                            if (isLockedForGuest) {
                              window.location.href = '/login';
                              return;
                            }
                            setActiveGame(game.id)
                          }}
                        >
                          {!showLock ? (
                            <>
                              <Play className="w-4 h-4 fill-current" />
                              Jogar Agora
                            </>
                          ) : isLockedForGuest ? (
                            <>
                              <Lock className="w-4 h-4" />
                              Entrar para Jogar
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
                  )
                })}
              </div>
            </>
          )}

          {/* Coming Soon Message - Only show if no game active */}
          {!activeGame && (
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
          )}
        </div>
      </div>
    </Layout>
  );
}
