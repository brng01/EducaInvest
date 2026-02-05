import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Ghost } from "lucide-react"; // Adicionado ícone Ghost
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { LevelFilter, Level } from "@/components/aprender/LevelFilter";
import { CategoryFilter, Category } from "@/components/aprender/CategoryFilter";
import { TermCard } from "@/components/aprender/TermCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Importando Button
import { listaCompletaTermos } from "@/lib/termosData";

export default function Aprender() {
  // Estados
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica de Filtragem Unificada
  const filteredTerms = useMemo(() => {
    return listaCompletaTermos.filter((term) => {
      // 1. Filtro de Nível
      const matchesLevel = selectedLevel ? term.nivelId === selectedLevel : true;

      // 2. Filtro de Categoria
      const matchesCategory = selectedCategory === "todos" ? true : term.categoria === selectedCategory;

      // 3. Filtro de Busca (Nome ou Sigla)
      const matchesSearch = searchQuery
        ? term.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (term.sigla?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;

      return matchesLevel && matchesCategory && matchesSearch;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  // Função auxiliar para resetar categoria ao mudar de nível (Melhora UX)
  const handleLevelChange = (level: Level | null) => {
    setSelectedLevel(level);
    setSelectedCategory("todos");
  };

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Biblioteca do Investidor</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Aprenda os termos financeiros
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sem jargões complicados. Aqui você encontra explicações simples, 
              exemplos práticos e pode até ouvir em áudio.
            </p>
          </motion.div>

          {/* Podcast Card */}
          <div className="mb-10">
            <PodcastCard />
          </div>

          {/* Área de Filtros e Busca */}
          <div className="flex flex-col gap-6 mb-8">
            
            {/* Linha 1: Nível e Busca */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <LevelFilter 
                selectedLevel={selectedLevel} 
                onLevelChange={handleLevelChange} 
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-full md:w-72"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar termo (ex: Selic)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border" // Ajustado para tema escuro
                />
              </motion.div>
            </div>

            {/* Linha 2: Categorias (Abaixo do Nível) */}
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Grid de Cards (Termos) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TermCard term={term} /> 
              </motion.div>
            ))}
          </div>

          {/* Estado Vazio (Visual Novo e Escuro) */}
          {filteredTerms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-muted bg-muted/5 flex flex-col items-center justify-center"
            >
              <div className="bg-muted/20 p-4 rounded-full mb-4">
                <Ghost className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ops! Nenhum termo encontrado
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Não encontramos nada com esses filtros. Tente mudar a categoria ou buscar por outra palavra.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel(null);
                  setSelectedCategory("todos");
                }}
              >
                Limpar filtros e ver tudo
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
