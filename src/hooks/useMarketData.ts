import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MarketRates } from "@/lib/types";

export function useMarketData() {
    const [rates, setRates] = useState<MarketRates>({
        selic: 0,
        cdi: 0,
        ipca: 0,
        poupanca: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRates() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase.from('dados_mercado').select('*');

                if (error) throw error;

                if (data) {
                    const newRates = {
                        selic: data.find(d => d.ticker === 'SELIC')?.preco_atual || 0,
                        cdi: data.find(d => d.ticker === 'CDI')?.preco_atual || 0,
                        ipca: data.find(d => d.ticker === 'IPCA')?.preco_atual || 0,
                        poupanca: data.find(d => d.ticker === 'POUPANCA')?.preco_atual || 0,
                    };
                    setRates(newRates);
                }
            } catch (error) {
                console.error("Erro ao carregar taxas de mercado:", error);
                // Fallback defaults
                setRates({
                    selic: 10.75,
                    cdi: 10.65,
                    ipca: 4.5,
                    poupanca: 6.17
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchRates();
    }, []);

    return { rates, isLoading };
}
