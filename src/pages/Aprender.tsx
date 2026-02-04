import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PodcastCard } from "@/components/aprender/PodcastCard";
import { LevelFilter } from "@/components/aprender/LevelFilter";
import { TermCard, financialTerms, Term } from "@/components/aprender/TermCard";
import { Input } from "@/components/ui/input";

type Level = "iniciante" | "intermediario" | "avancado";

export default function Aprender() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    return financialTerms.filter((term) => {
      const matchesLevel = selectedLevel ? term.level === selectedLevel : true;
      const matchesSearch = searchQuery
        ? term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (term.acronym?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;
      return matchesLevel && matchesSearch;
    });
  }, [selectedLevel, searchQuery]);

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
          <PodcastCard />

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <LevelFilter 
              selectedLevel={selectedLevel} 
              onLevelChange={setSelectedLevel} 
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full md:w-64"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar termo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </motion.div>
          </div>

          {/* Terms Grid */}
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

          {/* Empty State */}
          {filteredTerms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                Nenhum termo encontrado. Tente outra busca ou filtro.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
