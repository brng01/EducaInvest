import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy,
    Flame,
    BookOpen,
    Calendar,
    Medal,
    Star,
    Target,
    Clock,
    CheckCircle2,
    RefreshCw,
    AlertCircle,
    Gamepad2,
    Coins,
    TrendingUp,
    Briefcase,
    Building
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserProfile, UserProgress } from "@/lib/types";
import { gameService } from "@/services/gameService";
import { useToast } from "@/hooks/use-toast";

export default function Perfil() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [perfil, setPerfil] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState({
        completedLessons: 0,
        totalLessons: 0,
        streak: 0,
        totalXp: 0
    });
    const [history, setHistory] = useState<any[]>([]);
    const { toast } = useToast();
    const [isResetting, setIsResetting] = useState(false);
    const [empireData, setEmpireData] = useState({
        balance: 0,
        ownedItems: {} as Record<number, number>,
        totalItemsCount: 0,
        uniqueItemTypes: 0
    });
    const [consultorStats, setConsultorStats] = useState({ totalAnalyzed: 0, bestStreak: 0 });
    const [termoStats, setTermoStats] = useState({ totalMatched: 0, bestTimeLeft: 0 });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);

                // 1. Fetch Perfil
                const { data: perfilData } = await supabase
                    .from("perfis")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();

                if (perfilData) {
                    setPerfil(perfilData as UserProfile);
                }

                // 2. Fetch Progress (Stats)
                const { data: progressData } = await supabase
                    .from("user_progress")
                    .select("lesson_id, completed_at, is_completed")
                    .eq("user_id", session.user.id)
                    .eq("is_completed", true)
                    .order("completed_at", { ascending: false });

                const { count: totalLessonsCount } = await supabase
                    .from("lessons")
                    .select("*", { count: "exact", head: true });

                // Calculate Streak
                const streakDays = calculateStreak(progressData || []);

                setStats({
                    completedLessons: progressData?.length || 0,
                    totalLessons: totalLessonsCount || 0,
                    streak: streakDays,
                    totalXp: perfilData?.xp_total || 0
                });

                // 3. History (Last 5 activities)
                if (progressData && progressData.length > 0) {
                    const recentIds = progressData.slice(0, 5).map(p => p.lesson_id);
                    const { data: recentLessons } = await supabase
                        .from('lessons')
                        .select('id, title_short')
                        .in('id', recentIds);

                    const historyWithTitles = progressData.slice(0, 5).map(p => {
                        const lesson = recentLessons?.find(l => l.id === p.lesson_id);
                        return {
                            ...p,
                            title: lesson?.title_short || `Aula ${p.lesson_id}`
                        };
                    });
                    setHistory(historyWithTitles);
                }

                // 4. Empire Builder Local Data
                const empireSave = localStorage.getItem('empireSave');
                if (empireSave) {
                    try {
                        const parsed = JSON.parse(empireSave);
                        const items = parsed.ownedItems || {};
                        const totalCount = Object.values(items).reduce((a: number, b: any) => a + (Number(b) || 0), 0);
                        const uniqueCount = Object.keys(items).length;

                        setEmpireData({
                            balance: parsed.balance || 0,
                            ownedItems: items,
                            totalItemsCount: totalCount,
                            uniqueItemTypes: uniqueCount
                        });
                    } catch (e) {
                        console.error("Erro ao carregar save do Empire Builder:", e);
                    }
                }

                // 5. O Consultor Stats
                const consultorSave = localStorage.getItem('consultorStats');
                if (consultorSave) {
                    try {
                        setConsultorStats(JSON.parse(consultorSave));
                    } catch (e) { console.error(e); }
                }

                // 6. Desafio Termos Stats
                const termoSave = localStorage.getItem('termoStats');
                if (termoSave) {
                    try {
                        setTermoStats(JSON.parse(termoSave));
                    } catch (e) { console.error(e); }
                }

            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetXP = async () => {
        if (!user) return;
        const confirmed = window.confirm("Tem certeza que deseja zerar seu XP e Nível? Suas aulas concluídas serão mantidas.");
        if (!confirmed) return;

        setIsResetting(true);
        try {
            const result = await gameService.resetXP(user.id);
            if (result?.success) {
                toast({ title: "XP Resetado", description: "Seu XP e nível foram zerados." });
                fetchProfileData();
            } else throw new Error();
        } catch (error) {
            toast({ title: "Erro", description: "Falha ao resetar XP.", variant: "destructive" });
        } finally { setIsResetting(false); }
    };

    const handleResetLessons = async () => {
        if (!user) return;
        const confirmed = window.confirm("Tem certeza que deseja zerar seu progresso no Mapa de Aulas? Seu XP será mantido.");
        if (!confirmed) return;

        setIsResetting(true);
        try {
            const result = await gameService.resetLessons(user.id);
            if (result?.success) {
                toast({ title: "Mapa Resetado", description: "Seu progresso de aulas foi zerado." });
                fetchProfileData();
            } else throw new Error();
        } catch (error) {
            toast({ title: "Erro", description: "Falha ao resetar lições.", variant: "destructive" });
        } finally { setIsResetting(false); }
    };

    const handleResetAll = async () => {
        if (!user) return;
        const confirmed = window.confirm("ATENÇÃO: Isso apagará TODO o seu progresso (XP + Aulas). Tem certeza?");
        if (!confirmed) return;

        setIsResetting(true);
        try {
            const result = await gameService.resetUserProgress(user.id);
            if (result?.success) {
                // Clear Local Stats too
                localStorage.removeItem('empireSave');
                localStorage.removeItem('consultorStats');
                localStorage.removeItem('termoStats');

                toast({ title: "Tudo Resetado", description: "Sua conta foi zerada com sucesso." });
                fetchProfileData();
            } else throw new Error();
        } catch (error) {
            toast({ title: "Erro", description: "Falha ao resetar tudo.", variant: "destructive" });
        } finally { setIsResetting(false); }
    };

    const handleResetEmpire = async () => {
        const confirmed = window.confirm("Deseja zerar seu progresso no Empire Builder (saldo, itens e renda)? O XP geral será mantido.");
        if (!confirmed) return;

        setIsResetting(true);
        try {
            const result = await gameService.resetEmpireBuilder();
            if (result?.success) {
                toast({ title: "Jogo Resetado", description: "Seu progresso no Empire Builder foi zerado." });
            } else throw new Error();
        } catch (error) {
            toast({ title: "Erro", description: "Falha ao resetar jogo.", variant: "destructive" });
        } finally { setIsResetting(false); }
    };

    const calculateStreak = (progress: any[]) => {
        if (!progress || progress.length === 0) return 0;

        // Extract native dates without time, sorted descending
        const uniqueDates = Array.from(new Set(
            progress
                .map(p => new Date(p.completed_at).toDateString())
        )).map(dateStr => new Date(dateStr));

        // Sort descending just to be safe
        uniqueDates.sort((a, b) => b.getTime() - a.getTime());

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (uniqueDates.length === 0) return 0;

        // Check if the most recent activity was today or yesterday
        const lastActivity = uniqueDates[0];

        // If last activity is older than yesterday, streak is broken (0)
        // Unless we want to show the broken streak? usually it resets.
        if (lastActivity < yesterday) return 0;

        let streak = 1;
        // Iterate to check consecutive days
        for (let i = 0; i < uniqueDates.length - 1; i++) {
            const current = uniqueDates[i];
            const next = uniqueDates[i + 1];

            const diffTime = Math.abs(current.getTime() - next.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };

    const achievements = [
        { id: 1, title: "Primeiros Passos", desc: "Concluiu a primeira aula", icon: Star, color: "text-amber-400", bg: "bg-amber-400/10", unlocked: stats.completedLessons > 0 },
        { id: 2, title: "Constante", desc: "3 dias de ofensiva", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", unlocked: stats.streak >= 3 },
        { id: 3, title: "Dedicado", desc: "Concluiu 5 aulas", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10", unlocked: stats.completedLessons >= 5 },
        { id: 4, title: "Investidor", desc: "Atingiu Nível Investidor", icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-400/10", unlocked: ['Investidor', 'Analista', 'Mestre'].includes(perfil?.current_level || '') },
        // Empire Builder Achievements
        { id: 5, title: "Primeiro Milhão", desc: "Saldo de R$ 1.000.000 no simulator", icon: Coins, color: "text-yellow-500", bg: "bg-yellow-500/10", unlocked: empireData.balance >= 1000000 },
        { id: 6, title: "Grande Investidor", desc: "Saldo de R$ 10.000.000 no simulator", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10", unlocked: empireData.balance >= 10000000 },
        { id: 7, title: "Colecionador", desc: "5 tipos de investimentos diferentes", icon: Briefcase, color: "text-cyan-400", bg: "bg-cyan-400/10", unlocked: empireData.uniqueItemTypes >= 5 },
        { id: 8, title: "Magnata", desc: "Possui 20+ ativos no simulador", icon: Building, color: "text-rose-400", bg: "bg-rose-400/10", unlocked: empireData.totalItemsCount >= 20 },
        // O Consultor Achievements
        { id: 9, title: "Olho Clínico", desc: "Streak de 10 acertos seguidos", icon: Target, color: "text-orange-400", bg: "bg-orange-400/10", unlocked: consultorStats.bestStreak >= 10 },
        { id: 10, title: "Analista Sênior", desc: "50 cenários analisados", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10", unlocked: consultorStats.totalAnalyzed >= 50 },
        // Desafio Termos Achievements
        { id: 11, title: "Dicionário Humano", desc: "50 termos acertados", icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-400/10", unlocked: termoStats.totalMatched >= 50 },
        { id: 12, title: "Veloz e Furioso", desc: "Venceu com 40s+ no relógio", icon: Flame, color: "text-red-500", bg: "bg-red-500/10", unlocked: termoStats.bestTimeLeft >= 40 },
    ];

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8 space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-20 h-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                    </div>
                </div>
            </Layout>
        );
    }

    const nextLevelXp = 1000;
    const currentLevelProgress = ((perfil?.xp_total || 0) % nextLevelXp) / nextLevelXp * 100;

    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 pb-20">

                {/* --- HEADER --- */}
                <div className="relative bg-gradient-to-b from-primary/10 to-slate-950 pt-10 pb-20 px-4">
                    <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-slate-900 shadow-2xl relative z-10">
                                <AvatarImage src={user?.user_metadata?.avatar_url} />
                                <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                                    {user?.email?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-full z-20">
                                <div className="bg-amber-400 p-1.5 rounded-full text-slate-900">
                                    <Trophy className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        <div className="text-center md:text-left space-y-2">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-2xl md:text-3xl font-display font-bold text-white"
                            >
                                {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                            </motion.h1>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-wrap justify-center md:justify-start gap-2"
                            >
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                                    {perfil?.current_level || "Iniciante"}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10 text-xs font-medium flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> Membro desde {new Date(user?.created_at).toLocaleDateString()}
                                </span>
                            </motion.div>
                        </div>

                        <div className="md:ml-auto w-full md:w-64 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground font-medium">Próximo Nível</span>
                                <span className="text-white font-bold">{Math.round(nextLevelXp - ((perfil?.xp_total || 0) % nextLevelXp))} XP</span>
                            </div>
                            <Progress value={currentLevelProgress} className="h-2 bg-white/10" />
                            <p className="text-xs text-right mt-2 text-primary font-medium">{perfil?.xp_total || 0} XP Total</p>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="container mx-auto max-w-4xl px-4 -mt-10 relative z-20 space-y-8">

                    {/* STATS GRID */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                        <Card className="bg-slate-900/80 border-white/10 backdrop-blur-md">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                                <Flame className="w-8 h-8 text-orange-500 mb-2" />
                                <span className="text-2xl md:text-3xl font-bold text-white">{stats.streak}</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium">Dias seguidos</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-900/80 border-white/10 backdrop-blur-md">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                                <span className="text-2xl md:text-3xl font-bold text-white">{stats.completedLessons}</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium">Aulas Completas</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-900/80 border-white/10 backdrop-blur-md">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                                <Target className="w-8 h-8 text-blue-500 mb-2" />
                                <span className="text-2xl md:text-3xl font-bold text-white">{Math.round((stats.completedLessons / (stats.totalLessons || 1)) * 100)}%</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium">Conclusão</span>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ACHIEVEMENTS */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Medal className="w-5 h-5 text-amber-400" /> Conquistas
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map((ach) => (
                                <motion.div
                                    key={ach.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${ach.unlocked
                                        ? "bg-slate-800/50 border-white/10"
                                        : "bg-slate-900/30 border-white/5 opacity-50 grayscale"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${ach.bg}`}>
                                        <ach.icon className={`w-6 h-6 ${ach.color}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${ach.unlocked ? "text-white" : "text-slate-400"}`}>{ach.title}</h4>
                                        <p className="text-xs text-muted-foreground">{ach.desc}</p>
                                    </div>
                                    {ach.unlocked && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* HISTORY */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-400" /> Atividade Recente
                        </h3>
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                            {history.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {history.map((item, i) => (
                                        <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <BookOpen className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">Aula Concluída</p>
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {new Date(item.completed_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-muted-foreground text-sm">
                                    Nenhuma atividade recente encontrada.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* DANGER ZONE */}
                    <section className="pt-8 border-t border-white/5">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> Zona de Perigo
                            </h3>
                            <p className="text-sm text-slate-400 mb-4">
                                Deseja recomeçar? Escolha o que você deseja zerar na sua conta.
                            </p>
                            <div className="flex flex-col md:flex-row gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    onClick={handleResetXP}
                                    disabled={isResetting}
                                >
                                    <Star className="w-4 h-4" />
                                    Zerar apenas XP
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    onClick={handleResetLessons}
                                    disabled={isResetting}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Zerar apenas Aulas
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    onClick={handleResetEmpire}
                                    disabled={isResetting}
                                >
                                    <Gamepad2 className="w-4 h-4" />
                                    Zerar Empire Builder
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1 gap-2"
                                    onClick={handleResetAll}
                                    disabled={isResetting}
                                >
                                    <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
                                    Zerar Tudo
                                </Button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </Layout>
    );
}
