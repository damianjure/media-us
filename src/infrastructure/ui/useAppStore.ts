import { create } from "zustand";
import type { Service } from "../../domain/models/Service";
import type { Person } from "../../domain/models/Person";
import type { Team } from "../../domain/models/Team";
import type { Invitation, InvitationStatus } from "../../domain/models/Invitation";
import type { ServiceOrder } from "../../domain/models/ServiceOrder";

interface AppState {
  services: Service[];
  people: Person[];
  teams: Team[];
  invitations: Invitation[];
  orders: Map<string, ServiceOrder>;

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
}

export const useAppStore = create<AppState>((set, get) => ({
  services: [],
  people: [],
  teams: [],
  invitations: [],
  orders: new Map(),

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
}));