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
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Busca sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchPerfil(currentUser.id);
        setupRealtimeSubscription(currentUser.id); // Ativa o Realtime
      }
    });

    // 2. Escuta mudanças de auth
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchPerfil(currentUser.id);
        setupRealtimeSubscription(currentUser.id);
      } else {
        setPerfil(null);
      }
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  // Busca dados iniciais de XP e Nível
  const fetchPerfil = async (userId: string) => {
    const { data } = await supabase
      .from("perfis")
      .select("xp_total, current_level")
      .eq("id", userId)
      .single();
    if (data) setPerfil(data);
  };

  // --- LOGICA REALTIME ---
  const setupRealtimeSubscription = (userId: string) => {
    const channel = supabase
      .channel(`perfil_changes_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'perfis',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          // Atualiza o estado local assim que o banco mudar
          setPerfil(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
                    <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-white/10 text-white p-2">
                      <div className="px-2 py-1.5 mb-2 border-b border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                          {perfil?.current_level}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuItem
                        onClick={() => navigate('/perfil')}
                        className="focus:bg-white/5 cursor-pointer rounded-lg"
                      >
                        <User className="mr-2 h-4 w-4" /> Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="focus:bg-rose-500/10 text-rose-400 cursor-pointer rounded-lg"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sair
                      </DropdownMenuItem>
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
