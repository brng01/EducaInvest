import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

// --- TIPAGEM DA AULA ---
export interface Aula {
  id: number;
  titulo: string;         
  tituloCompleto: string;
  nivel: Level;
  duracao: string;
  descricao: string;
  transcricaoCompleta: string;
}

// --- TIPAGEM DO TERMO ---
export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string;
  explicacaoSimplificada: string;
  exemplo: string;
  dicaComoComecar?: string;
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
  aulaAssociadaId?: number;
}

export const aulas: Aula[] = [];

export const listaCompletaTermos: Termo[] = [];
