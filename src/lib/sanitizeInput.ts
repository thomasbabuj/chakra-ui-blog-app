// utils/sanitizeInput.ts

import xss from "xss";

export function sanitizeInput(input: string): string {
  // Use the xss library to sanitize the input
  return xss(input);
}
