import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-card border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 EduFinanças. Educação financeira para todos. 🇧🇷</p>
          <p className="mt-2">Feito com 💙 para ajudar você a dominar seu dinheiro.</p>
        </div>
      </footer>
    </div>
  );
}
