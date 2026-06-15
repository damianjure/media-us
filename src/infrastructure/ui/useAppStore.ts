import { create } from "zustand";
import type { Service } from "../../domain/models/Service";
import type { Person } from "../../domain/models/Person";
import type { Team } from "../../domain/models/Team";
import type { Invitation, InvitationStatus } from "../../domain/models/Invitation";
import type { ServiceOrder } from "../../domain/models/ServiceOrder";
import type { Area } from "../../domain/models/Area";
import type { ServiceAssignment } from "../../domain/models/ServiceAssignment";
import type { ServiceTemplate } from "../../domain/models/ServiceTemplate";

interface AppState {
  services: Service[];
  people: Person[];
  teams: Team[];
  invitations: Invitation[];
  orders: Map<string, ServiceOrder>;
  areas: Area[];
  assignments: ServiceAssignment[];
  templates: ServiceTemplate[];

  addService: (s: Service) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addPerson: (p: Person) => void;
  addTeam: (t: Team) => void;
  addInvitation: (inv: Invitation) => void;
  updateInvitationStatus: (id: string, status: string) => void;
  getInvitationsByService: (serviceId: string) => Invitation[];
  saveOrder: (order: ServiceOrder) => void;
  getOrder: (serviceId: string) => ServiceOrder | null;
  addArea: (a: Area) => void;
  updateArea: (id: string, data: Partial<Area>) => void;
  deleteArea: (id: string) => void;
  addAssignment: (a: ServiceAssignment) => void;
  updateAssignmentStatus: (id: string, status: string) => void;
  deleteAssignment: (id: string) => void;
  addTemplate: (t: ServiceTemplate) => void;
  updateTemplate: (id: string, data: Partial<ServiceTemplate>) => void;
  deleteTemplate: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  services: [],
  people: [],
  teams: [],
  invitations: [],
  orders: new Map(),
  areas: [],
  assignments: [],
  templates: [],

  addService: (s) => set((state) => ({ services: [...state.services, s] })),
  updateService: (id, data) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),
  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
      invitations: state.invitations.filter((i) => i.serviceId !== id),
    })),

  addPerson: (p) => set((state) => ({ people: [...state.people, p] })),
  addTeam: (t) => set((state) => ({ teams: [...state.teams, t] })),

  addInvitation: (inv) =>
    set((state) => ({ invitations: [...state.invitations, inv] })),
  updateInvitationStatus: (id, status: string) =>
    set((state) => ({
      invitations: state.invitations.map((i) =>
        i.id === id ? { ...i, status: status as InvitationStatus } : i,
      ),
    })),

  getInvitationsByService: (serviceId) =>
    get().invitations.filter((i) => i.serviceId === serviceId),

  saveOrder: (order) =>
    set((state) => {
      const next = new Map(state.orders);
      next.set(order.serviceId, order);
      return { orders: next };
    }),
  getOrder: (serviceId) => get().orders.get(serviceId) ?? null,

  addArea: (a) => set((state) => ({ areas: [...state.areas, a] })),
  updateArea: (id, data) =>
    set((state) => ({ areas: state.areas.map((a) => (a.id === id ? { ...a, ...data } : a)) })),
  deleteArea: (id) =>
    set((state) => ({ areas: state.areas.filter((a) => a.id !== id) })),

  addAssignment: (a) => set((state) => ({ assignments: [...state.assignments, a] })),
  updateAssignmentStatus: (id, status: string) =>
    set((state) => ({
      assignments: state.assignments.map((a) =>
        a.id === id ? { ...a, status: status as ServiceAssignment["status"] } : a,
      ),
    })),
  deleteAssignment: (id) =>
    set((state) => ({ assignments: state.assignments.filter((a) => a.id !== id) })),

  addTemplate: (t) => set((state) => ({ templates: [...state.templates, t] })),
  updateTemplate: (id, data) =>
    set((state) => ({ templates: state.templates.map((t) => (t.id === id ? { ...t, ...data } : t)) })),
  deleteTemplate: (id) =>
    set((state) => ({ templates: state.templates.filter((t) => t.id !== id) })),
}));