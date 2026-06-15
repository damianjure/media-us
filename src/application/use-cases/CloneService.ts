import type { IServiceRepository, IServiceOrderRepository } from "../ports/repositories";
import { createService, type Service } from "../../domain/models/Service";
import { createServiceOrder, type ServiceOrder } from "../../domain/models/ServiceOrder";

export class CloneService {
  private serviceRepo: IServiceRepository;
  private orderRepo: IServiceOrderRepository;

  constructor(serviceRepo: IServiceRepository, orderRepo: IServiceOrderRepository) {
    this.serviceRepo = serviceRepo;
    this.orderRepo = orderRepo;
  }

  async execute(sourceId: string, newDate: string): Promise<Service> {
    const source = await this.serviceRepo.getById(sourceId);
    if (!source) throw new Error("Service not found");

    const cloned = createService({
      date: newDate,
      time: source.time,
      endTime: source.endTime,
      typeId: source.typeId,
      location: source.location,
      bannerUrl: source.bannerUrl,
      areaIds: source.areaIds,
      notes: source.notes,
    });
    const created = await this.serviceRepo.create(cloned);

    const order = await this.orderRepo.getByService(sourceId);
    if (order) {
      await this.orderRepo.save(createServiceOrder({
        serviceId: created.id,
        items: order.items as ServiceOrder["items"],
      }));
    }

    return created;
  }
}