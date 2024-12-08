import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function base64ToFile(base64String:string, fileName:string, mimeType = "application/octet-stream") {
  // Decode the base64 string
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob
  const blob = new Blob([byteArray], { type: mimeType });

  // Convert Blob to File
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}