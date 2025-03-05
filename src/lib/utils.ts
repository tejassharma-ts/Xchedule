import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// just to make it feel like we are actually interactive with server
export async function delay(duration = 2000) {
  await new Promise((res) => setTimeout(res, duration));
}
