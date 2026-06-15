let counter = 0;
export function nanoid(): string {
  counter++;
  return `id-${counter}-${Math.random().toString(36).slice(2, 8)}`;
}