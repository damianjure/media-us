import type { IAreaRepository } from "../../application/ports/extended-repositories";
import type { Area } from "../../domain/models/Area";

export class AreaRepository implements IAreaRepository {
  private store = new Map<string, Area>();

  async create(area: Area): Promise<Area> {
    this.store.set(area.id, { ...area });
    return area;
  }

  async update(id: string, data: Partial<Area>): Promise<Area> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Area not found");
    const updated = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async getById(id: string): Promise<Area | null> {
    return this.store.get(id) ?? null;
  }

  async listAll(): Promise<Area[]> {
    return Array.from(this.store.values());
  }

  async addMember(areaId: string, personId: string): Promise<void> {
    const area = this.store.get(areaId);
    if (!area) throw new Error("Area not found");
    if (!area.memberIds.includes(personId)) {
      this.store.set(areaId, { ...area, memberIds: [...area.memberIds, personId] });
    }
  }

  async removeMember(areaId: string, personId: string): Promise<void> {
    const area = this.store.get(areaId);
    if (!area) return;
    this.store.set(areaId, { ...area, memberIds: area.memberIds.filter((id) => id !== personId) });
  }

  async addRole(areaId: string, roleId: string): Promise<void> {
    const area = this.store.get(areaId);
    if (!area) throw new Error("Area not found");
    if (!area.roleIds.includes(roleId)) {
      this.store.set(areaId, { ...area, roleIds: [...area.roleIds, roleId] });
    }
  }
}