import type { Service } from "../models/Service";

interface ExistingAssignment {
  serviceId: string;
  date: string;
  time: string;
}

export function canAssignPerson(
  service: Service,
  existing: ExistingAssignment[],
): boolean {
  return !existing.some(
    (a) => a.date === service.date && a.time === service.time,
  );
}