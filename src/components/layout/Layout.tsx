import React from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

import { ChatWidget } from "../chat/ChatWidget";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0"> {/* Padding bottom para mobile */}
        {children}
      </main>
      <footer className="bg-card border-t border-border py-8 mt-auto hidden md:block">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 EducaInvest. Educação financeira para todos. 🇧🇷</p>
          <p className="mt-2">Feito com coração para ajudar você a dominar seu dinheiro.</p>
        </div>
      </footer>
      <BottomNav />
      <ChatWidget />
    </div>
  );
}
