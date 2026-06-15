import type { Service } from "../models/Service";

const toMinutes = (time: string): number => {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function hasTimeConflict(
  service: Service,
  existing: Service[],
): boolean {
  return existing.some((other) => {
    if (other.id === service.id) return false;
    if (other.date !== service.date) return false;

    const aStart = toMinutes(service.time);
    const aEnd = service.endTime ? toMinutes(service.endTime) : aStart + 60;
    const bStart = toMinutes(other.time);
    const bEnd = other.endTime ? toMinutes(other.endTime) : bStart + 60;

    return aStart < bEnd && bStart < aEnd;
  });
}