import type { IInvitationRepository } from "../ports/repositories";
import { createInvitation, type Invitation } from "../../domain/models/Invitation";

export class SendInvitations {
  private repo: IInvitationRepository;

  constructor(repo: IInvitationRepository) {
    this.repo = repo;
  }

  async execute(input: {
    serviceId: string;
    personIds: string[];
  }): Promise<Invitation[]> {
    const invitations: Invitation[] = [];
    for (const personId of input.personIds) {
      const inv = createInvitation({
        personId,
        serviceId: input.serviceId,
      });
      await this.repo.create(inv);
      invitations.push(inv);
    }
    return invitations;
  }
}