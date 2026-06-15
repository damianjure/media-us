import { describe, it, expect } from "vitest";
import { createTemplate } from "./ServiceTemplate";

describe("ServiceTemplate", () => {
  it("creates a template with areas and order items", () => {
    const t = createTemplate({
      name: "Domingo Mañana",
      areaIds: ["a1", "a2"],
      orderItems: [{ id: "i1", type: "song", label: "Bienvenida", order: 0 }],
    });
    expect(t.id).toBeDefined();
    expect(t.areaIds).toHaveLength(2);
  });

  it("throws if name is empty", () => {
    expect(() => createTemplate({ name: "", areaIds: [] })).toThrow("name is required");
  });
});