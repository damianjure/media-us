import { describe, it, expect } from "vitest";
import { createAssignment } from "./ServiceAssignment";

describe("ServiceAssignment", () => {
  it("creates an assignment with pending status", () => {
    const a = createAssignment({
      serviceId: "s1",
      areaId: "a1",
      personId: "p1",
      roleId: "r1",
    });
    expect(a.id).toBeDefined();
    expect(a.status).toBe("pending");
  });

  it("throws if serviceId missing", () => {
    expect(() => createAssignment({ serviceId: "", areaId: "a1", personId: "p1", roleId: "r1" })).toThrow("serviceId is required");
  });
});