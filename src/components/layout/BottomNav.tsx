import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Calculator, Gamepad2, User } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/aprender", label: "Aprender", icon: BookOpen },
        { path: "/simular", label: "Simular", icon: Calculator },
        { path: "/praticar", label: "Praticar", icon: Gamepad2 },
        { path: "/ranking", label: "Ranking", icon: Trophy },
        { path: "/perfil", label: "Perfil", icon: User },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-t border-white/10 pb-safe">
            <nav className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center justify-center p-2 w-full"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavHighlight"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            <item.icon
                                className={`w-6 h-6 transition-colors duration-200 ${isActive ? "text-primary fill-primary/20" : "text-slate-400"
                                    }`}
                            />
                            <span
                                className={`text-[10px] font-medium mt-1 transition-colors duration-200 ${isActive ? "text-primary" : "text-slate-400"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
