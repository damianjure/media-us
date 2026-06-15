import type { ITemplateRepository } from "../../application/ports/extended-repositories";
import type { ServiceTemplate } from "../../domain/models/ServiceTemplate";

export class TemplateRepository implements ITemplateRepository {
  private store = new Map<string, ServiceTemplate>();

  async create(template: ServiceTemplate): Promise<ServiceTemplate> {
    this.store.set(template.id, { ...template });
    return template;
  }

  async update(id: string, data: Partial<ServiceTemplate>): Promise<ServiceTemplate> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Template not found");
    const updated = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async getById(id: string): Promise<ServiceTemplate | null> {
    return this.store.get(id) ?? null;
  }

  async listAll(): Promise<ServiceTemplate[]> {
    return Array.from(this.store.values());
  }
}