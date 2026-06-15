import { describe, it, expect } from "vitest";
import { createService } from "./Service";

describe("Service (extended)", () => {
  it("creates service with full fields", () => {
    const s = createService({
      date: "2026-06-15",
      time: "10:00",
      endTime: "12:00",
      typeId: "Domingo",
      location: "Auditorio Principal",
      bannerUrl: "https://...",
      areaIds: ["a1", "a2"],
      notes: "Test",
    });

    expect(s.endTime).toBe("12:00");
    expect(s.location).toBe("Auditorio Principal");
    expect(s.areaIds).toEqual(["a1", "a2"]);
  });

  it("defaults endTime to empty", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo" });
    expect(s.endTime).toBe("");
    expect(s.location).toBe("");
    expect(s.areaIds).toEqual([]);
  });

  it("endTime is optional", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo", endTime: "" });
    expect(s.endTime).toBe("");
  });
});