import { nanoid } from "./nanoid";

export const InvitationStatus = {
  Pending: "pending",
  Accepted: "accepted",
  Declined: "declined",
} as const;

export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];

export interface Invitation {
  id: string;
  personId: string;
  serviceId: string;
  status: InvitationStatus;
}

export function createInvitation(input: {
  personId: string;
  serviceId: string;
}): Invitation {
  if (!input.personId) throw new Error("personId is required");
  if (!input.serviceId) throw new Error("serviceId is required");

  return {
    id: nanoid(),
    personId: input.personId,
    serviceId: input.serviceId,
    status: InvitationStatus.Pending,
  };
}