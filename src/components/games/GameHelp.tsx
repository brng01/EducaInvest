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
                    variant="outline"
                    size="icon"
                    className="w-14 h-14 rounded-full bg-slate-800/80 border-2 border-white/20 text-white shadow-lg hover:bg-slate-700 hover:scale-105 transition-all"
                    aria-label="Ajuda e Instruções"
                >
                    <span className="text-3xl font-black">?</span>
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
