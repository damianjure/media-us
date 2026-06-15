import type { IServiceOrderRepository } from "../../application/ports/repositories";

interface StoredOrder {
  id: string; serviceId: string;
  items: { id: string; type: string; label: string; order: number }[];
}

export class ServiceOrderRepository implements IServiceOrderRepository {
  private store = new Map<string, StoredOrder>();

  async save(order: StoredOrder): Promise<void> {
    this.store.set(order.serviceId, { ...order });
  }

  async getByService(serviceId: string): Promise<StoredOrder | null> {
    return this.store.get(serviceId) ?? null;
  }
}