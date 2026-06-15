import { describe, it, expect, beforeEach } from "vitest";
import { CreateServiceFromTemplate } from "./CreateServiceFromTemplate";
import { ServiceRepository } from "../../infrastructure/firebase/service-repository";
import { TemplateRepository } from "../../infrastructure/firebase/template-repository";
import { createTemplate } from "../../domain/models/ServiceTemplate";

describe("CreateServiceFromTemplate", () => {
  let serviceRepo: ServiceRepository;
  let templateRepo: TemplateRepository;
  let useCase: CreateServiceFromTemplate;

  beforeEach(() => {
    serviceRepo = new ServiceRepository();
    templateRepo = new TemplateRepository();
    useCase = new CreateServiceFromTemplate(serviceRepo, templateRepo);
  });

  it("creates a service with template's areas and order", async () => {
    const t = await templateRepo.create(createTemplate({
      name: "Domingo Mañana",
      areaIds: ["a1", "a2"],
      orderItems: [{ id: "i1", type: "song", label: "Bienvenida", order: 0 }],
    }));

    const result = await useCase.execute({
      templateId: t.id,
      date: "2026-06-15",
      time: "10:00",
    });

    expect(result.service.areaIds).toEqual(["a1", "a2"]);
    expect(result.order.items).toHaveLength(1);
  });

  it("throws if template not found", async () => {
    await expect(useCase.execute({ templateId: "missing", date: "2026-06-15", time: "10:00" }))
      .rejects.toThrow("Template not found");
  });
});