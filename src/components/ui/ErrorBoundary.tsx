import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Ops, algo deu errado!</h1>
                        <p className="text-slate-400 mb-6">
                            Encontramos um erro inesperado. Não se preocupe, seu progresso está salvo. Tente recarregar a página.
                        </p>

                        <div className="bg-red-950/30 border border-red-500/10 rounded-lg p-4 mb-6 text-left overflow-auto max-h-32">
                            <p className="text-xs text-red-400 font-mono break-all">
                                {this.state.error?.message || "Erro desconhecido"}
                            </p>
                        </div>

                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full h-12 rounded-full gap-2 bg-primary hover:bg-primary/90"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Recarregar Página
                        </Button>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-4 text-sm text-slate-500 hover:text-white transition-colors underline"
                        >
                            Voltar para o Início
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
