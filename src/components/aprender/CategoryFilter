import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Definindo os tipos de categoria que teremos
export type Category = "todos" | "indicadores" | "renda_fixa" | "renda_variavel" | "taxas" | "conceitos";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { id: "todos", label: "Ver Tudo" },
  { id: "indicadores", label: "Indicadores" },
  { id: "taxas", label: "Taxas e Impostos" },
  { id: "renda_fixa", label: "Renda Fixa" },
  { id: "renda_variavel", label: "Renda Variável" },
  { id: "conceitos", label: "Conceitos Básicos" },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100"
    >
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.id ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(cat.id as Category)}
          className={`rounded-md text-sm transition-all ${
            selectedCategory === cat.id 
              ? "bg-slate-200 text-slate-900 font-medium" 
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          {cat.label}
        </Button>
      ))}
    </motion.div>
  );
}
