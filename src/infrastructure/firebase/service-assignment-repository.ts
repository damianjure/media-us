import type { IServiceAssignmentRepository } from "../../application/ports/extended-repositories";
import type { ServiceAssignment } from "../../domain/models/ServiceAssignment";

export class ServiceAssignmentRepository implements IServiceAssignmentRepository {
  private store = new Map<string, ServiceAssignment>();

  async create(assignment: ServiceAssignment): Promise<ServiceAssignment> {
    this.store.set(assignment.id, { ...assignment });
    return assignment;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    const a = this.store.get(id);
    if (!a) throw new Error("Assignment not found");
    this.store.set(id, { ...a, status: status as ServiceAssignment["status"] });
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async listByService(serviceId: string): Promise<ServiceAssignment[]> {
    return Array.from(this.store.values()).filter((a) => a.serviceId === serviceId);
  }

  async listByPerson(personId: string): Promise<ServiceAssignment[]> {
    return Array.from(this.store.values()).filter((a) => a.personId === personId);
  }

  async listByServiceAndArea(serviceId: string, areaId: string): Promise<ServiceAssignment[]> {
    return Array.from(this.store.values()).filter(
      (a) => a.serviceId === serviceId && a.areaId === areaId,
    );
  }
}