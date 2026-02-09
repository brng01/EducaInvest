import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

interface GameHelpProps {
    children: React.ReactNode;
}

export const GameHelp = ({ children }: GameHelpProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-16 h-16 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 p-0 transition-all hover:scale-110"
                    aria-label="Ajuda e Instruções"
                >
                    <HelpCircle className="w-12 h-12" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="max-w-xs p-6 bg-slate-800 border-slate-700 shadow-xl">
                <div className="space-y-3">
                    <p className="font-bold text-lg text-primary flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Como Jogar
                    </p>
                    <div className="text-base leading-relaxed text-slate-200">
                        {children}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
