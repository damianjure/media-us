import { describe, it, expect, beforeEach } from "vitest";
import { ServiceRepository } from "./service-repository";
import { createService } from "../../domain/models/Service";

describe("ServiceRepository", () => {
  let repo: ServiceRepository;

  beforeEach(() => {
    repo = new ServiceRepository();
  });

  it("creates and retrieves a service", async () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    const created = await repo.create(service);
    expect(created.id).toBe(service.id);

    const found = await repo.getById(service.id);
    expect(found).toBeDefined();
    expect(found!.date).toBe("2026-06-15");
  });

  it("lists services by date range", async () => {
    await repo.create(createService({ date: "2026-06-01", time: "10:00", typeId: "t1" }));
    await repo.create(createService({ date: "2026-06-15", time: "10:00", typeId: "t1" }));
    await repo.create(createService({ date: "2026-07-01", time: "10:00", typeId: "t1" }));

    const june = await repo.listByDateRange("2026-06-01", "2026-06-30");
    expect(june).toHaveLength(2);
  });

  it("updates a service", async () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    await repo.create(service);

    const updated = await repo.update(service.id, { notes: "Updated" });
    expect(updated.notes).toBe("Updated");
  });

  it("deletes a service", async () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    await repo.create(service);
    await repo.delete(service.id);

    const found = await repo.getById(service.id);
    expect(found).toBeNull();
  });
});