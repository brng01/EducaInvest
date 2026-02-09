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
