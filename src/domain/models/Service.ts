import { nanoid } from "./nanoid";

export const ServiceStatus = {
  Draft: "draft",
  Pending: "pending",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
} as const;

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];

export interface Service {
  id: string;
  date: string;
  time: string;
  typeId: string;
  status: ServiceStatus;
  notes: string;
}

export function createService(input: {
  date: string;
  time: string;
  typeId: string;
  notes?: string;
  status?: ServiceStatus;
}): Service {
  if (!input.date) throw new Error("date is required");
  if (!input.time) throw new Error("time is required");
  if (!input.typeId) throw new Error("typeId is required");

  return {
    id: nanoid(),
    date: input.date,
    time: input.time,
    typeId: input.typeId,
    status: input.status ?? ServiceStatus.Draft,
    notes: input.notes ?? "",
  };
}