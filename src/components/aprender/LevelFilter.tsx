import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Level = "iniciante" | "intermediario" | "avancado";

interface LevelFilterProps {
  selectedLevel: Level | null;
  onLevelChange: (level: Level | null) => void;
}

const levels = [
  { id: "iniciante" as Level, label: "Iniciante", emoji: "🌱" },
  { id: "intermediario" as Level, label: "Intermediário", emoji: "🌿" },
  { id: "avancado" as Level, label: "Avançado", emoji: "🌳" },
];

export function LevelFilter({ selectedLevel, onLevelChange }: LevelFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      <Button
        variant={selectedLevel === null ? "default" : "outline"}
        onClick={() => onLevelChange(null)}
        className="rounded-full"
      >
        Todos
      </Button>
      {levels.map((level) => (
        <Button
          key={level.id}
          variant={selectedLevel === level.id ? "default" : "outline"}
          onClick={() => onLevelChange(level.id)}
          className="rounded-full"
        >
          <span className="mr-2">{level.emoji}</span>
          {level.label}
        </Button>
      ))}
    </motion.div>
  );
}
