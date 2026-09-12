import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge conditional class names and resolve Tailwind conflicts.
 * Standard shadcn/Care UI helper. Every component uses this for className.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
