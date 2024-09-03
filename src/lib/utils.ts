import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function generateSlug(str: string) {
  return slugify(str, { lower: true });
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}
