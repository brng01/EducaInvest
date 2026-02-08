export interface UserProfile {
    id: string;
    email?: string;
    full_name?: string;
    avatar_url?: string;
    xp_total: number;
    current_level?: string;
    created_at?: string;
}

export interface Lesson {
    id: number;
    title_short: string; // db column
    title_full: string; // db column
    level: string;
    duration: string;
    description: string;
    transcript_html?: string;
    order_index?: number;
    // Computed properties for UI if needed, or mapped from DB
    titulo?: string;
    tituloCompleto?: string;
    nivel?: string;
    duracao?: string;
    descricao?: string;
    transcricaoCompleta?: string;
}

export interface Term {
    id: number;
    lesson_id: number;
    acronym: string;
    name: string;
    explanation_full: string;
    explanation_simple: string;
    example: string;
    tip: string;
    category: string;
    // Mapped properties
    sigla?: string;
    nome?: string;
    explicacaoCompleta?: string;
    explicacaoSimplificada?: string;
    exemplo?: string;
    dicaComoComecar?: string;
    nivelId?: string;
    aulaAssociadaId?: number;
}

export interface UserProgress {
    user_id: string;
    lesson_id: number;
    is_completed: boolean;
    completed_at?: string;
    updated_at?: string;
}

export interface MarketRates {
    selic: number;
    cdi: number;
    ipca: number;
    poupanca: number;
}
