import { describe, it, expect } from "vitest";
import { hasTimeConflict } from "./assignment-rules";
import type { Service } from "../models/Service";

const makeService = (id: string, date: string, time: string, endTime = ""): Service => ({
  id,
  date, time, endTime,
  typeId: "Domingo",
  status: "draft" as const,
  location: "",
  bannerUrl: "",
  areaIds: [],
  notes: "",
});

describe("hasTimeConflict", () => {
  it("no conflict on different dates", () => {
    const a = makeService("a", "2026-06-15", "10:00");
    const b = makeService("b", "2026-06-22", "10:00");
    expect(hasTimeConflict(a, [b])).toBe(false);
  });

  it("no conflict on same date but different times", () => {
    const a = makeService("a", "2026-06-15", "10:00");
    const b = makeService("b", "2026-06-15", "18:00");
    expect(hasTimeConflict(a, [b])).toBe(false);
  });

  it("conflict on exact same date and time", () => {
    const a = makeService("a", "2026-06-15", "10:00");
    const b = makeService("b", "2026-06-15", "10:00");
    expect(hasTimeConflict(a, [b])).toBe(true);
  });

  it("no conflict on same date with non-overlapping ranges", () => {
    const a = makeService("a", "2026-06-15", "10:00", "11:00");
    const b = makeService("b", "2026-06-15", "11:30", "12:30");
    expect(hasTimeConflict(a, [b])).toBe(false);
  });

  it("conflict on overlapping ranges", () => {
    const a = makeService("a", "2026-06-15", "10:00", "12:00");
    const b = makeService("b", "2026-06-15", "11:00", "13:00");
    expect(hasTimeConflict(a, [b])).toBe(true);
  });
});