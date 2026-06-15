import { describe, it, expect } from "vitest";
import { createService, ServiceStatus } from "./Service";

describe("Service model", () => {
  it("creates a service with required fields", () => {
    const service = createService({
      date: "2026-06-15",
      time: "10:00",
      typeId: "type-1",
    });

    expect(service.id).toBeDefined();
    expect(service.date).toBe("2026-06-15");
    expect(service.time).toBe("10:00");
    expect(service.typeId).toBe("type-1");
    expect(service.status).toBe(ServiceStatus.Draft);
    expect(service.notes).toBe("");
  });

  it("accepts optional notes and status", () => {
    const service = createService({
      date: "2026-06-15",
      time: "10:00",
      typeId: "type-1",
      notes: "Servicio especial",
      status: ServiceStatus.Confirmed,
    });

    expect(service.notes).toBe("Servicio especial");
    expect(service.status).toBe(ServiceStatus.Confirmed);
  });

  it("throws if date is missing", () => {
    expect(() =>
      createService({ date: "", time: "10:00", typeId: "type-1" }),
    ).toThrow("date is required");
  });

  it("throws if time is missing", () => {
    expect(() =>
      createService({ date: "2026-06-15", time: "", typeId: "type-1" }),
    ).toThrow("time is required");
  });

  it("throws if typeId is missing", () => {
    expect(() =>
      createService({ date: "2026-06-15", time: "10:00", typeId: "" }),
    ).toThrow("typeId is required");
  });
});