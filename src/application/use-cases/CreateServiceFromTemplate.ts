import type { IServiceRepository } from "../ports/repositories";
import type { ITemplateRepository } from "../ports/extended-repositories";
import { createService, type Service } from "../../domain/models/Service";
import { createServiceOrder, type ServiceOrder } from "../../domain/models/ServiceOrder";

export class CreateServiceFromTemplate {
  private serviceRepo: IServiceRepository;
  private templateRepo: ITemplateRepository;

  constructor(serviceRepo: IServiceRepository, templateRepo: ITemplateRepository) {
    this.serviceRepo = serviceRepo;
    this.templateRepo = templateRepo;
  }

  async execute(input: {
    templateId: string;
    date: string;
    time: string;
    endTime?: string;
    typeId?: string;
  }): Promise<{ service: Service; order: ServiceOrder }> {
    const template = await this.templateRepo.getById(input.templateId);
    if (!template) throw new Error("Template not found");

    const service = createService({
      date: input.date,
      time: input.time,
      endTime: input.endTime,
      typeId: input.typeId ?? template.name,
      areaIds: template.areaIds,
    });
    const created = await this.serviceRepo.create(service);

    const order = createServiceOrder({
      serviceId: created.id,
      items: template.orderItems,
    });

    return { service: created, order };
  }
}