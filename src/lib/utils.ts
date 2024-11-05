import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type User = {
  username: string;
  email: string;
  password: string;
  createdat: string;
  address: string;
  id: number;
  role: string;
} | null;
