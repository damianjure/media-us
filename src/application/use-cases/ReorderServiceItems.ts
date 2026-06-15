import type { IServiceOrderRepository } from "../ports/repositories";
import { reorderItems, type ServiceOrder } from "../../domain/models/ServiceOrder";

export class ReorderServiceItems {
  private repo: IServiceOrderRepository;

  constructor(repo: IServiceOrderRepository) {
    this.repo = repo;
  }

  async execute(serviceId: string, fromIndex: number, toIndex: number): Promise<ServiceOrder> {
    const order = await this.repo.getByService(serviceId);
    if (!order) throw new Error("Service order not found");

    const typed = order as ServiceOrder;
    const reordered = reorderItems(typed, fromIndex, toIndex);
    await this.repo.save(reordered);
    return reordered;
  }
}