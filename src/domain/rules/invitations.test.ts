import { describe, it, expect } from "vitest";
import { canSendInvitation } from "./invitations";

describe("canSendInvitation", () => {
  const teamMembers = ["p1", "p2", "p3"];

  it("allows inviting a team member", () => {
    expect(canSendInvitation("p1", teamMembers)).toBe(true);
  });

  it("rejects inviting a non-member", () => {
    expect(canSendInvitation("p4", teamMembers)).toBe(false);
  });

  it("rejects empty personId", () => {
    expect(canSendInvitation("", teamMembers)).toBe(false);
  });
});