import type { Area } from "../../domain/models/Area";
import type { ServiceAssignment } from "../../domain/models/ServiceAssignment";
import type { ServiceTemplate } from "../../domain/models/ServiceTemplate";

export interface IAreaRepository {
  create(area: Area): Promise<Area>;
  update(id: string, data: Partial<Area>): Promise<Area>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Area | null>;
  listAll(): Promise<Area[]>;
  addMember(areaId: string, personId: string): Promise<void>;
  removeMember(areaId: string, personId: string): Promise<void>;
  addRole(areaId: string, roleId: string): Promise<void>;
}

export interface IServiceAssignmentRepository {
  create(assignment: ServiceAssignment): Promise<ServiceAssignment>;
  updateStatus(id: string, status: string): Promise<void>;
  delete(id: string): Promise<void>;
  listByService(serviceId: string): Promise<ServiceAssignment[]>;
  listByPerson(personId: string): Promise<ServiceAssignment[]>;
  listByServiceAndArea(serviceId: string, areaId: string): Promise<ServiceAssignment[]>;
}

export interface ITemplateRepository {
  create(template: ServiceTemplate): Promise<ServiceTemplate>;
  update(id: string, data: Partial<ServiceTemplate>): Promise<ServiceTemplate>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<ServiceTemplate | null>;
  listAll(): Promise<ServiceTemplate[]>;
}