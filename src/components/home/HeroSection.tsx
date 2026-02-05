export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Espaço seguro para aprender</span>
          </motion.div>

          {/* Main heading - AJUSTADO PARA MELHOR FLUXO */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
          >
            Domine seu dinheiro <br className="hidden md:block" />
            <span className="text-gradient-hero">antes que ele domine você.</span>
          </motion.h1>

          {/* Subtext - MAIS DIRETO */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Descomplique seus investimentos com explicações claras e sem jargões. 
            O ponto de partida ideal para sua liberdade financeira.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/aprender">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow w-full sm:w-64 h-14 text-lg font-bold rounded-full">
                Começar a Aprender
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/simular">
              <Button size="lg" variant="outline" className="w-full sm:w-64 h-14 text-lg border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full transition-all">
                Ver Simuladores
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-sm font-medium text-muted-foreground/80"
          >
            <div className="flex items-center gap-2 hover:text-accent transition-colors">
              <Heart className="w-4 h-4 text-accent" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Shield className="w-4 h-4 text-primary" />
              <span>Sem Vendas</span>
            </div>
            <div className="flex items-center gap-2 hover:text-success transition-colors">
              <TrendingUp className="w-4 h-4 text-success" />
              <span>No seu ritmo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
