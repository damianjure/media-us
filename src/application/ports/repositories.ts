import type { Service } from "../../domain/models/Service";

export interface IServiceRepository {
  create(service: Service): Promise<Service>;
  update(id: string, data: Partial<Service>): Promise<Service>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Service | null>;
  listByDateRange(start: string, end: string): Promise<Service[]>;
}

export interface ITeamRepository {
  create(team: { id: string; name: string; roles: { id: string; name: string }[] }): Promise<{ id: string; name: string; roles: { id: string; name: string }[] }>;
  update(id: string, data: { name?: string; roles?: { id: string; name: string }[] }): Promise<{ id: string; name: string; roles: { id: string; name: string }[] }>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<{ id: string; name: string; roles: { id: string; name: string }[] } | null>;
  listAll(): Promise<{ id: string; name: string; roles: { id: string; name: string }[] }[]>;
}

export interface IPersonRepository {
  create(person: { id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }): Promise<{ id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }>;
  update(id: string, data: Partial<{ name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }>): Promise<{ id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<{ id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] } | null>;
  listAll(): Promise<{ id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }[]>;
  searchByName(query: string): Promise<{ id: string; name: string; email: string; teamRoles: { teamId: string; roleId: string; roleName: string }[] }[]>;
}

export interface IInvitationRepository {
  create(invitation: { id: string; personId: string; serviceId: string; status: string }): Promise<{ id: string; personId: string; serviceId: string; status: string }>;
  updateStatus(id: string, status: string): Promise<void>;
  listByService(serviceId: string): Promise<{ id: string; personId: string; serviceId: string; status: string }[]>;
  deleteByService(serviceId: string): Promise<void>;
}

export interface IServiceOrderRepository {
  getByService(serviceId: string): Promise<{ id: string; serviceId: string; items: { id: string; type: string; label: string; order: number }[] } | null>;
  save(order: { id: string; serviceId: string; items: { id: string; type: string; label: string; order: number }[] }): Promise<void>;
}