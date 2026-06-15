import { describe, it, expect, beforeEach } from "vitest";
import { SendInvitations } from "./SendInvitations";
import { InvitationRepository } from "../../infrastructure/firebase/invitation-repository";

describe("SendInvitations", () => {
  let repo: InvitationRepository;
  let useCase: SendInvitations;

  beforeEach(() => {
    repo = new InvitationRepository();
    useCase = new SendInvitations(repo);
  });

  it("creates invitations for team members", async () => {
    const invitations = await useCase.execute({
      serviceId: "s1",
      personIds: ["p1", "p2", "p3"],
    });

    expect(invitations).toHaveLength(3);
    expect(invitations[0].status).toBe("pending");
    expect(invitations[0].serviceId).toBe("s1");
  });

  it("returns empty array for empty members", async () => {
    const invitations = await useCase.execute({
      serviceId: "s1",
      personIds: [],
    });
    expect(invitations).toHaveLength(0);
  });
});