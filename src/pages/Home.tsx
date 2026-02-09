import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { TipOfTheDay } from "@/components/home/TipOfTheDay";
import { DashboardUser } from "@/components/home/DashboardUser";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/lib/types";

import { MarketTicker } from "@/components/home/MarketTicker";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<{ completed: number; total: number; percentage: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Busca sessão do usuário
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        // Busca dados em paralelo para melhor performance
        const [perfilResult, progressResult] = await Promise.all([
          supabase.from("perfis").select("*").eq("id", session.user.id).single(),
          supabase.from("user_progress")
            .select("lesson_id, is_completed")
            .eq("user_id", session.user.id)
        ]);

        if (perfilResult.error) throw perfilResult.error;

        if (perfilResult.data) {
          setPerfil(perfilResult.data as UserProfile);
        }

        if (progressResult.data) {
          const completedLessons = progressResult.data.filter(p => p.is_completed).length;
          const totalLessons = await getTotalLessons();
          setProgress({
            completed: completedLessons,
            total: totalLessons,
            percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
          });
        }
      }
    } catch (error: any) {
      console.error("Erro ao carregar dados do usuário:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar suas informações. Tente recarregar a página.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalLessons = async () => {
    const { count } = await supabase
      .from("lessons")
      .select("*", { count: "exact", head: true });
    return count || 0;
  };

  // Container de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">
              Carregando sua jornada...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-0">
        <MarketTicker />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Hero Section ou Dashboard */}
        <motion.div variants={itemVariants}>
          {user ? (
            <DashboardUser user={user} perfil={perfil} progress={progress} />
          ) : (
            <HeroSection />
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <QuickActions userLoggedIn={!!user} progress={progress} />
        </motion.div>

        {/* Tip of the Day */}
        <motion.div variants={itemVariants}>
          <TipOfTheDay />
        </motion.div>

        {/* Seção de Estatísticas (apenas para usuários logados) */}
        {user && progress && (
          <motion.div variants={itemVariants}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Progresso Geral */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-blue-400">Progresso do Curso</h3>
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{progress.percentage}%</p>
                  <p className="text-xs text-muted-foreground">
                    {progress.completed} de {progress.total} aulas concluídas
                  </p>
                </div>

                {/* Card 2: XP Total */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-emerald-400">XP Conquistado</h3>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {perfil?.xp_total || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Continue estudando para subir de nível!
                  </p>
                </div>

                {/* Card 3: Próxima Meta */}
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-purple-400">Próxima Meta</h3>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {progress.total - progress.completed}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {progress.total - progress.completed === 1
                      ? "aula restante"
                      : "aulas restantes"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action (apenas para não logados) */}
        {!user && (
          <motion.div variants={itemVariants}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Pronto para Transformar Seu Futuro Financeiro?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Junte-se a milhares de pessoas que estão aprendendo a investir de forma inteligente e segura. Comece agora gratuitamente!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/aprender"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/25"
                  >
                    Começar Jornada
                  </a>
                  <a
                    href="/simular"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-all hover:scale-105"
                  >
                    Explorar Simuladores
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
