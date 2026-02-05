import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Ghost } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { LevelFilter, Level } from "@/components/aprender/LevelFilter";
import { CategoryFilter, Category } from "@/components/aprender/CategoryFilter";
import { TermCard } from "@/components/aprender/TermCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listaCompletaTermos } from "@/lib/termosData";

export default function Aprender() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    return listaCompletaTermos.filter((term) => {
      const matchesLevel = selectedLevel ? term.nivelId === selectedLevel : true;
      const matchesCategory = selectedCategory === "todos" ? true : term.categoria === selectedCategory;
      const matchesSearch = searchQuery
        ? term.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (term.sigla?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;

      return matchesLevel && matchesCategory && matchesSearch;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const handleLevelChange = (level: Level | null) => {
    setSelectedLevel(level);
    setSelectedCategory("todos");
  };

  return (
    <Layout>
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Header Refinado: Título mais imponente e descrição direta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Biblioteca do Investidor</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
              Domine o vocabulário <br className="hidden md:block" /> do mercado financeiro
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
              Traduzimos o "economês" para você investir com total confiança. 
              Explicações simples, exemplos práticos e aulas em áudio.
            </p>
          </motion.div>

          <div className="mb-10">
            <PodcastCard />
          </div>

          {/* Área de Filtros e Busca */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <LevelFilter 
                  selectedLevel={selectedLevel} 
                  onLevelChange={handleLevelChange} 
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
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
                  className="pl-10 bg-secondary/30 border-border focus:bg-background transition-colors rounded-xl"
                />
              </motion.div>
            </div>

            <div className="overflow-x-auto pb-2 no-scrollbar">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Estado Vazio */}
          {filteredTerms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-6 rounded-2xl border-2 border-dashed border-muted bg-muted/5 flex flex-col items-center justify-center"
            >
              <div className="bg-muted/20 p-5 rounded-full mb-6">
                <Ghost className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ops! Nenhum termo encontrado
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm text-balance">
                Não encontramos resultados para os filtros selecionados. Tente ajustar sua busca ou mudar a categoria.
              </p>
              <Button 
                variant="default"
                size="lg"
                className="rounded-full px-8"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel(null);
                  setSelectedCategory("todos");
                }}
              >
                Ver todos os termos
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
