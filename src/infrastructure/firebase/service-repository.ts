import type { IServiceRepository } from "../../application/ports/repositories";
import type { Service } from "../../domain/models/Service";

export class ServiceRepository implements IServiceRepository {
  private store = new Map<string, Service>();

  async create(service: Service): Promise<Service> {
    this.store.set(service.id, { ...service });
    return service;
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Service not found");
    const updated = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async getById(id: string): Promise<Service | null> {
    return this.store.get(id) ?? null;
  }

  async listByDateRange(start: string, end: string): Promise<Service[]> {
    return Array.from(this.store.values()).filter(
      (s) => s.date >= start && s.date <= end,
    );
  }
}