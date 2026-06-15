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
  endTime: string;
  typeId: string;
  status: ServiceStatus;
  location: string;
  bannerUrl: string;
  areaIds: string[];
  notes: string;
}

export function createService(input: {
  date: string;
  time: string;
  endTime?: string;
  typeId: string;
  location?: string;
  bannerUrl?: string;
  areaIds?: string[];
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
    endTime: input.endTime ?? "",
    typeId: input.typeId,
    status: input.status ?? ServiceStatus.Draft,
    location: input.location ?? "",
    bannerUrl: input.bannerUrl ?? "",
    areaIds: input.areaIds ?? [],
    notes: input.notes ?? "",
  };
}