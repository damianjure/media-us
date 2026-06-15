import { nanoid } from "./nanoid";

export const AssignmentStatus = {
  Pending: "pending",
  Accepted: "accepted",
  Declined: "declined",
} as const;

export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus];

export interface ServiceAssignment {
  id: string;
  serviceId: string;
  areaId: string;
  personId: string;
  roleId: string;
  status: AssignmentStatus;
}

export function createAssignment(input: {
  serviceId: string;
  areaId: string;
  personId: string;
  roleId: string;
  status?: AssignmentStatus;
}): ServiceAssignment {
  if (!input.serviceId) throw new Error("serviceId is required");
  if (!input.areaId) throw new Error("areaId is required");
  if (!input.personId) throw new Error("personId is required");
  if (!input.roleId) throw new Error("roleId is required");

  return {
    id: nanoid(),
    serviceId: input.serviceId,
    areaId: input.areaId,
    personId: input.personId,
    roleId: input.roleId,
    status: input.status ?? AssignmentStatus.Pending,
  };
}