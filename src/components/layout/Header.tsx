import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Calculator,
  Gamepad2,
  Menu,
  X,
  Coins,
  Trophy,
  LogOut,
  User,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/aprender", label: "Aprender", icon: BookOpen },
  { path: "/simular", label: "Simular", icon: Calculator },
  { path: "/praticar", label: "Praticar", icon: Gamepad2 },
  { path: "/ranking", label: "Ranking", icon: Trophy },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let combinedSubscription: { unsubscribe: () => void } | null = null;
    let channel: any = null;

    // Função para configurar tudo
    const initialize = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchPerfil(currentUser.id);

        // Setup Realtime
        channel = supabase
          .channel(`perfil_changes_${currentUser.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'perfis',
              filter: `id=eq.${currentUser.id}`,
            },
            (payload) => {
              console.log("Perfil atualizado via realtime:", payload.new);
              setPerfil(payload.new);
            }
          )
          .subscribe();
      }
    };

    initialize();

    // Escuta mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Se mudou o usuário, refaz a inscrição realtime
      if (channel) await supabase.removeChannel(channel);

      if (currentUser) {
        fetchPerfil(currentUser.id);
        channel = supabase
          .channel(`perfil_changes_${currentUser.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'perfis',
              filter: `id=eq.${currentUser.id}`,
            },
            (payload) => {
              setPerfil(payload.new);
            }
          )
          .subscribe();
      } else {
        setPerfil(null);
      }
    });

    combinedSubscription = subscription;

    return () => {
      if (combinedSubscription) combinedSubscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Listen for manual XP updates
  useEffect(() => {
    const handleXpUpdate = () => {
      if (user) fetchPerfil(user.id);
    };

    window.addEventListener('educainvest_xp_updated', handleXpUpdate);
    return () => window.removeEventListener('educainvest_xp_updated', handleXpUpdate);
  }, [user]);

  // Busca dados iniciais de XP e Nível
  const fetchPerfil = async (userId: string) => {
    const { data } = await supabase
      .from("perfis")
      .select("xp_total, current_level")
      .eq("id", userId)
      .single();
    if (data) setPerfil(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="bg-gradient-hero p-2 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coins className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="font-display font-bold text-xl text-foreground">
              Educa<span className="text-gradient-hero">Invest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <div className="relative px-4 py-2 rounded-xl font-medium transition-colors hover:text-foreground hover:bg-secondary/50 group">
                      {isActive && (
                        <motion.div
                          layoutId="desktopNavHighlight"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <div className={`flex items-center gap-2 relative z-10 ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Separador e Perfil/XP */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              {user ? (
                <>
                  {/* Badge de XP com animação de pulso quando o valor mudar */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={perfil?.xp_total}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-white">{perfil?.xp_total || 0} XP</span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Dropdown do Usuário */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none">
                        <Avatar className="h-9 w-9 border border-primary/20 hover:scale-105 transition-transform">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-0 bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white overflow-hidden rounded-2xl shadow-2xl">
                      <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 p-4 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10 border-2 border-white/10 shadow-lg">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                              {user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate leading-tight">
                              {user.user_metadata?.full_name || "Investidor"}
                            </p>
                            <p className="text-[10px] text-slate-300 truncate font-mono opacity-80">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {perfil?.current_level}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium ml-auto">
                            {perfil?.xp_total || 0} XP
                          </span>
                        </div>
                      </div>

                      <div className="p-2 space-y-1">
                        <DropdownMenuItem
                          onClick={() => navigate('/perfil')}
                          className="group flex items-center gap-3 px-3 py-2.5 outline-none cursor-pointer rounded-xl transition-all duration-200 focus:bg-white/5 hover:bg-white/5"
                        >
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Meu Perfil</span>
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Estatísticas e conquistas</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="group flex items-center gap-3 px-3 py-2.5 outline-none cursor-pointer rounded-xl transition-all duration-200 focus:bg-rose-500/10 hover:bg-rose-500/10"
                        >
                          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-rose-400 group-hover:text-rose-300">Sair da conta</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="rounded-xl h-10 px-6 font-bold shadow-lg shadow-primary/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Header Elements (Logo + XP only, no menu) */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <motion.div
                key={perfil?.xp_total}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
              >
                <Trophy className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-bold text-white">{perfil?.xp_total || 0}</span>
              </motion.div>
            )}
            {/* Nav is now at the bottom */}
          </div>
        </div>
      </div>
    </header>
  );
}
