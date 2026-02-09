import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatED(value: number) {
  return `ED$ ${formatNumber(Math.floor(value))}`;
}

export const LEVELS = [
  { min: 0, name: "Iniciante", color: "text-blue-400" },
  { min: 101, name: "Aprendiz", color: "text-cyan-400" },
  { min: 301, name: "Investidor", color: "text-emerald-400" },
  { min: 601, name: "Estrategista", color: "text-amber-400" },
  { min: 1001, name: "Mestre das Finanças", color: "text-purple-400" },
];

export function saveXP(gain: number) {
  const current = Number(localStorage.getItem('totalXP') || '0');
  localStorage.setItem('totalXP', (current + gain).toString());
}

export function getTotalXP(): number {
  return Number(localStorage.getItem('totalXP') || '0');
}

export function getLevelInfo(xp: number) {
  const level = [...LEVELS].reverse().find(l => xp >= l.min) || LEVELS[0];
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1] || null;
  return { ...level, nextLevel };
}
