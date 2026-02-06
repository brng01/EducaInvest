import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Função para Magic Link
  // Função para Magic Link atualizada
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Utilizamos signInWithOtp para enviar o link por e-mail
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Define para onde o usuário vai após clicar no link do e-mail
        emailRedirectTo: window.location.origin + "/home",
      },
    });

    if (error) {
      toast({ 
        title: "Erro", 
        description: error.message, 
        variant: "destructive" 
      });
    } else {
      toast({ 
        title: "Verifique seu e-mail", 
        description: "Enviamos um link mágico para você entrar!" 
      });
    }
    setLoading(false);
  };

  // Função para Google Login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/aprender",
      },
    });
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white font-display">Bem-vindo ao EducaInvest</h1>
          <p className="text-muted-foreground">Sua jornada rumo à liberdade financeira começa aqui.</p>
        </div>

        {/* Botão Google */}
        <Button 
          onClick={handleGoogleLogin}
          variant="outline" 
          className="w-full h-12 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 gap-3"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
          Entrar com Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-muted-foreground font-medium tracking-widest">Ou use seu e-mail</span></div>
        </div>

        {/* Formulário Magic Link */}
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-11 rounded-full bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50"
              required
            />
          </div>
          <Button 
            disabled={loading}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Enviar Link Mágico"}
            {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>
        </form>

        <p className="text-[10px] text-center text-muted-foreground/50 uppercase tracking-tighter">
          Ao entrar, você concorda em salvar seu progresso e ganhar XP.
        </p>
      </motion.div>
    </div>
  );
}
