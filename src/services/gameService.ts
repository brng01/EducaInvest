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
    },

    async addUserXP(userId: string, amount: number) {
        if (!userId || amount <= 0) return;

        // Fetch current XP
        const { data: profile, error: fetchError } = await supabase
            .from('perfis')
            .select('xp_total')
            .eq('id', userId)
            .single();

        if (fetchError) {
            console.error("Error fetching user XP for game:", fetchError);
            return;
        }

        const newTotal = (profile?.xp_total || 0) + amount;

        // Update XP
        const { error: updateError } = await supabase
            .from('perfis')
            .update({ xp_total: newTotal })
            .eq('id', userId);

        if (updateError) {
            console.error("Error updating user XP for game:", updateError);
        } else {
            // Emit event for UI updates (e.g. sidebar XP counter)
            window.dispatchEvent(new CustomEvent('educainvest_xp_updated'));
        }
    },

    async resetUserProgress(userId: string) {
        if (!userId) return;

        try {
            // 1. Reset Profile XP and Level
            const { error: profileError } = await supabase
                .from('perfis')
                .update({
                    xp_total: 0,
                    current_level: 'Iniciante'
                })
                .eq('id', userId);

            if (profileError) throw profileError;

            // 2. Clear Lesson Progress
            const { error: progressError } = await supabase
                .from('user_progress')
                .delete()
                .eq('user_id', userId);

            if (progressError) throw progressError;

            // 3. Notify UI
            window.dispatchEvent(new CustomEvent('educainvest_xp_updated'));
            return { success: true };
        } catch (error) {
            console.error("Error resetting user progress:", error);
            return { success: false, error };
        }
    }
};
