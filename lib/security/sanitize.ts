export function sanitizeText(value: string, maxLength = 3000) {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeOptional(value?: string, maxLength = 3000) {
  return value ? sanitizeText(value, maxLength) : undefined;
}
