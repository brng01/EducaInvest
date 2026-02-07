import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { LoginOverlay } from "./LoginOverlay";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Busca a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuta mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // SE NÃO ESTIVER AUTENTICADO: Renderiza o conteúdo com Blur + Overlay
  if (!session) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* O conteúdo fica visível mas borrado e bloqueado */}
        <div className="filter blur-md pointer-events-none select-none opacity-50">
          {children}
        </div>
        
        {/* O card de login fica por cima de tudo */}
        <LoginOverlay />
      </div>
    );
  }

  // SE ESTIVER AUTENTICADO: Renderiza normal
  return <>{children}</>;
};
