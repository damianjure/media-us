import type { IInvitationRepository } from "../../application/ports/repositories";

interface StoredInvitation {
  id: string; personId: string; serviceId: string; status: string;
}

export class InvitationRepository implements IInvitationRepository {
  private store = new Map<string, StoredInvitation>();

  async create(invitation: StoredInvitation): Promise<StoredInvitation> {
    this.store.set(invitation.id, { ...invitation });
    return invitation;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Invitation not found");
    this.store.set(id, { ...existing, status });
  }

  async listByService(serviceId: string): Promise<StoredInvitation[]> {
    return Array.from(this.store.values()).filter(
      (i) => i.serviceId === serviceId,
    );
  }

  async deleteByService(serviceId: string): Promise<void> {
    for (const [id, inv] of this.store) {
      if (inv.serviceId === serviceId) this.store.delete(id);
    }
  }
}