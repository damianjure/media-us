import { describe, it, expect } from "vitest";
import { canAssignPerson } from "./scheduling";
import { createService } from "../models/Service";

describe("canAssignPerson", () => {
  it("allows assignment if no conflicts", () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    const existing = [
      { serviceId: "other", date: "2026-06-15", time: "18:00" },
    ];
    expect(canAssignPerson(service, existing)).toBe(true);
  });

  it("rejects assignment if person already has service at same time", () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    const existing = [
      { serviceId: "other", date: "2026-06-15", time: "10:00" },
    ];
    expect(canAssignPerson(service, existing)).toBe(false);
  });

  it("allows assignment on same date but different time", () => {
    const service = createService({ date: "2026-06-15", time: "14:00", typeId: "t1" });
    const existing = [
      { serviceId: "other", date: "2026-06-15", time: "10:00" },
    ];
    expect(canAssignPerson(service, existing)).toBe(true);
  });

  it("allows assignment on different date", () => {
    const service = createService({ date: "2026-06-22", time: "10:00", typeId: "t1" });
    const existing = [
      { serviceId: "other", date: "2026-06-15", time: "10:00" },
    ];
    expect(canAssignPerson(service, existing)).toBe(true);
  });

  it("allows assignment with empty existing", () => {
    const service = createService({ date: "2026-06-15", time: "10:00", typeId: "t1" });
    expect(canAssignPerson(service, [])).toBe(true);
  });
});