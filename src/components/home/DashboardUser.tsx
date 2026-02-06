import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Play, CheckCircle2, Star } from "lucide-react";

export function DashboardUser({ user, perfil }: { user: any; perfil: any }) {
  const [nextLesson, setNextLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProgress() {
      // Busca qual foi a última aula concluída
      const { data: progress } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .order('lesson_id', { ascending: false })
        .limit(1);

      const lastId = progress?.[0]?.lesson_id || 0;
      
      // Busca a próxima aula (ID + 1)
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id, title_short, description')
        .eq('id', lastId + 1)
        .single();

      setNextLesson(lesson || null);
      setLoading(false);
    }
    if (user) getProgress();
  }, [user]);

  // Lógica de Nível (Ex: cada 1000 XP sobe um nível)
  const xpParaProximoNivel = 1000;
  const progressoNivel = ((perfil?.xp_total || 0) % xpParaProximoNivel) / 10;

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card de Perfil e XP */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-slate-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img 
                src={user.user_metadata?.avatar_url} 
                className="w-16 h-16 rounded-2xl border-2 border-primary/30"
                alt="Avatar"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary p-1.5 rounded-lg shadow-lg">
                <Trophy className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Olá, {user.user_metadata?.full_name?.split(' ')[0]}!</h2>
              <p className="text-primary text-xs font-bold uppercase tracking-widest">{perfil?.current_level || 'Poupador Aprendiz'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progresso do Nível</span>
              <span className="text-white">{perfil?.xp_total || 0} XP</span>
            </div>
            <Progress value={progressoNivel} className="h-2 bg-white/5" />
            <p className="text-[10px] text-muted-foreground text-right italic">Mais {1000 - ((perfil?.xp_total || 0) % 1000)} XP para o próximo nível</p>
          </div>
        </motion.div>

        {/* Card de Próxima Aula */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-slate-900/50 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Star className="w-4 h-4 fill-primary" />
                <span className="text-xs font-bold uppercase tracking-tighter">Sua Próxima Missão</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">
                {nextLesson ? nextLesson.title_short : "Você concluiu tudo!"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md line-clamp-2 mb-6">
                {nextLesson ? nextLesson.description : "Parabéns! Você completou todas as aulas disponíveis. Fique de olho para novos conteúdos."}
              </p>
            </div>

            {nextLesson && (
              <Button 
                onClick={() => navigate('/aprender')}
                className="w-full md:w-fit rounded-full bg-white text-slate-900 hover:scale-105 transition-transform font-bold px-8 py-6"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Continuar Jornada
              </Button>
            )}
          </div>
          
          {/* Elementos Decorativos */}
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-32 h-32 text-white" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
