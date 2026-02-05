import { motion } from "framer-motion";
import { BookOpen, Calculator, Gamepad2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Sou Iniciante",
    subtitle: "Quero Aprender",
    description: "Comece do zero com explicações simples e exemplos práticos do dia a dia.",
    icon: BookOpen,
    path: "/aprender",
    gradient: "bg-gradient-hero",
    iconBg: "bg-primary/20",
  },
  {
    title: "Já sei um pouco",
    subtitle: "Quero Simular",
    description: "Teste cenários e veja como seu dinheiro pode crescer com o tempo.",
    icon: Calculator,
    path: "/simular",
    gradient: "bg-gradient-success",
    iconBg: "bg-success/20",
  },
  {
    title: "Quero me divertir",
    // CORREÇÃO AQUI: De "Jogar Arcade" para "Quero Praticar"
    subtitle: "Quero Praticar", 
    description: "Aprenda brincando com jogos educativos sobre investimentos.",
    icon: Gamepad2,
    path: "/praticar", // Confirme se você já alterou a rota no App.tsx para /praticar
    gradient: "bg-gradient-arcade",
    iconBg: "bg-accent/20",
  },
];

export function QuickActions() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Por onde você quer começar?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o caminho que faz mais sentido para você agora.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {actions.map((action, index) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={action.path}>
                <motion.div
                  className="group relative bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-xl transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  {/* Gradient accent top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${action.gradient}`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${action.iconBg} flex items-center justify-center mb-4`}>
                    <action.icon className="w-7 h-7 text-foreground" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground font-medium">{action.title}</p>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {action.subtitle}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6">
                    {action.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    <span>Acessar</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
