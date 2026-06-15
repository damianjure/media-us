import { describe, it, expect, beforeEach } from "vitest";
import { CloneService } from "./CloneService";
import { ServiceRepository } from "../../infrastructure/firebase/service-repository";
import { ServiceOrderRepository } from "../../infrastructure/firebase/service-order-repository";
import { createService } from "../../domain/models/Service";
import { createServiceOrder } from "../../domain/models/ServiceOrder";

describe("CloneService", () => {
  let serviceRepo: ServiceRepository;
  let orderRepo: ServiceOrderRepository;
  let useCase: CloneService;

  beforeEach(() => {
    serviceRepo = new ServiceRepository();
    orderRepo = new ServiceOrderRepository();
    useCase = new CloneService(serviceRepo, orderRepo);
  });

  it("clones a service with all attributes", async () => {
    const original = await serviceRepo.create(createService({
      date: "2026-06-15", time: "10:00", endTime: "12:00",
      typeId: "Domingo", location: "Auditorio", areaIds: ["a1", "a2"], notes: "Original",
    }));
    await orderRepo.save(createServiceOrder({
      serviceId: original.id,
      items: [{ id: "i1", type: "song", label: "Bienvenida", order: 0 }],
    }));

    const cloned = await useCase.execute(original.id, "2026-06-22");
    expect(cloned.date).toBe("2026-06-22");
    expect(cloned.typeId).toBe("Domingo");
    expect(cloned.location).toBe("Auditorio");
    expect(cloned.areaIds).toEqual(["a1", "a2"]);
  });

  it("throws if source service not found", async () => {
    await expect(useCase.execute("missing", "2026-06-22")).rejects.toThrow("Service not found");
  });
});