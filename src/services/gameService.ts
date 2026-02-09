import { supabase } from "@/integrations/supabase/client";

export interface GameQuestion {
    id: number;
    game_type: 'consultor' | 'termo';
    content: any;
    difficulty: string;
}

export interface EmpireItem {
    id: number;
    name: string;
    type: 'active' | 'passive';
    base_cost: number;
    base_income: number;
    description: string;
}

export const gameService = {
    async getConsultorQuestions() {
        const { data, error } = await supabase
            .from('game_questions')
            .select('*')
            .eq('game_type', 'consultor');

        if (error) throw error;
        return data as GameQuestion[];
    },

    async getTermPairs() {
        const { data, error } = await supabase
            .from('game_questions')
            .select('*')
            .eq('game_type', 'termo');

        if (error) throw error;
        return data as GameQuestion[];
    },

    async getEmpireItems() {
        const { data, error } = await supabase
            .from('empire_items')
            .select('*')
            .order('base_cost', { ascending: true });

        if (error) throw error;
        return data as EmpireItem[];
    }
};
