import type { ITeamRepository } from "../../application/ports/repositories";

interface StoredTeam {
  id: string; name: string; roles: { id: string; name: string }[];
}

export class TeamRepository implements ITeamRepository {
  private store = new Map<string, StoredTeam>();

  async create(team: StoredTeam): Promise<StoredTeam> {
    this.store.set(team.id, { ...team });
    return team;
  }

  async update(id: string, data: Partial<StoredTeam>): Promise<StoredTeam> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Team not found");
    const updated = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async getById(id: string): Promise<StoredTeam | null> {
    return this.store.get(id) ?? null;
  }

  async listAll(): Promise<StoredTeam[]> {
    return Array.from(this.store.values());
  }
}