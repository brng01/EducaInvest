import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Olá! Sou seu Tutor Financeiro com IA. 🧠\n\nPosso te ajudar com dúvidas sobre investimentos, termos do mercado ou explicar o conteúdo das aulas.\n\nComo posso ajudar hoje?"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            if (!N8N_WEBHOOK_URL) {
                throw new Error("Webhook URL not configured");
            }

            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pergunta: userMessage.content }), // Matched with n8n workflow expectation {{ $json.body.pergunta }}
            });

            if (!response.ok) {
                throw new Error('Falha na comunicação com a IA');
            }

            const data = await response.json();

            // Expecting { output: "answer text" } or similar from n8n. Adjust as needed.
            // If n8n returns simple text, handle that. If JSON object, access field.
            // Common n8n webhook response is often just the JSON data returned by the last node.
            // Assuming the last node returns a JSON with a field 'text' or 'output'.
            // Expecting { output: "answer text" } or { text: "answer text" } or { message: "answer text" }
            // Robust parsing to avoid "Objects are not valid as a React child" error
            let botResponseText = '';

            // Prioritize specific fields if they exist and are strings
            if (typeof data.output === 'string') botResponseText = data.output;
            else if (typeof data.text === 'string') botResponseText = data.text;
            else if (typeof data.message === 'string') botResponseText = data.message;
            else if (typeof data.answer === 'string') botResponseText = data.answer;

            // If still empty, handle objects/arrays/other types safety
            else {
                const content = data.output || data.text || data.message || data.answer || data;
                botResponseText = typeof content === 'string'
                    ? content
                    : JSON.stringify(content, null, 2); // Pretty print for objects
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: botResponseText
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: !N8N_WEBHOOK_URL
                    ? "⚠️ Configuração pendente: Adicione a URL do Webhook n8n no arquivo .env (VITE_N8N_WEBHOOK_URL)."
                    : "Desculpe, tive um problema para processar sua pergunta. Tente novamente mais tarde."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 md:bottom-8 md:right-8 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="mb-4 w-[90vw] md:w-[400px] h-[500px] max-h-[70vh] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <Bot className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white text-sm">Tutor IA</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs text-slate-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "flex gap-3 max-w-[85%]",
                                            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                            msg.role === 'user'
                                                ? "bg-slate-700 border-slate-600"
                                                : "bg-primary/20 border-primary/30"
                                        )}>
                                            {msg.role === 'user' ? (
                                                <User className="w-4 h-4 text-slate-300" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-primary" />
                                            )}
                                        </div>

                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-white/10 text-slate-200 rounded-tl-sm border border-white/5"
                                        )}>
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Loading State */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3 mr-auto max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                                            <Bot className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-xs text-slate-400 animate-pulse">Consultando base de conhecimento...</span>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-slate-950/50">
                            <div className="flex text-[10px] text-slate-500 mb-2 justify-center gap-2">
                                <Sparkles className="w-3 h-3 text-primary/50" />
                                <span>IA treinada com conteúdo EducaInvest</span>
                            </div>
                            <div className="relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite sua dúvida..."
                                    disabled={isLoading}
                                    className="pr-12 bg-white/5 border-white/10 focus-visible:ring-primary/50 rounded-xl"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isLoading}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center transition-all duration-300 z-50",
                    isOpen ? "bg-slate-800 text-slate-300" : "bg-gradient-to-tr from-primary to-blue-600 text-white"
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-7 h-7 fill-current" />
                )}
            </motion.button>
        </div>
    );
}
