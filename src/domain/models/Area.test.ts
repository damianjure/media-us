import { describe, it, expect } from "vitest";
import { createArea } from "./Area";

describe("Area", () => {
  it("creates an area with name and color", () => {
    const a = createArea({ name: "Alabanza", color: "purple", icon: "music" });
    expect(a.id).toBeDefined();
    expect(a.name).toBe("Alabanza");
    expect(a.color).toBe("purple");
    expect(a.icon).toBe("music");
  });

  it("defaults to empty members and roles", () => {
    const a = createArea({ name: "Audio" });
    expect(a.memberIds).toEqual([]);
    expect(a.roleIds).toEqual([]);
  });

  it("throws if name is empty", () => {
    expect(() => createArea({ name: "" })).toThrow("name is required");
  });
});