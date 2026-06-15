import type { IPersonRepository } from "../../application/ports/repositories";

interface StoredPerson {
  id: string; name: string; email: string;
  teamRoles: { teamId: string; roleId: string; roleName: string }[];
}

export class PersonRepository implements IPersonRepository {
  private store = new Map<string, StoredPerson>();

  async create(person: StoredPerson): Promise<StoredPerson> {
    this.store.set(person.id, { ...person });
    return person;
  }

  async update(id: string, data: Partial<StoredPerson>): Promise<StoredPerson> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Person not found");
    const updated = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async getById(id: string): Promise<StoredPerson | null> {
    return this.store.get(id) ?? null;
  }

  async listAll(): Promise<StoredPerson[]> {
    return Array.from(this.store.values());
  }

  async searchByName(query: string): Promise<StoredPerson[]> {
    const lower = query.toLowerCase();
    return Array.from(this.store.values()).filter((p) =>
      p.name.toLowerCase().includes(lower),
    );
  }
}