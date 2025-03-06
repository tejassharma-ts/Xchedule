import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// just to make it feel like we are actually interacting with server
export async function delay(duration = 2000) {
  await new Promise((res) => setTimeout(res, duration));
}

export function getRandomGreeting() {
  const greetings = [
    "Hello",
    "Hey there",
    "Hi",
    "Greetings",
    "Howdy",
    "What's up",
    "Yo",
    "Good to see you",
    "Hola",
    "Ahoy",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
