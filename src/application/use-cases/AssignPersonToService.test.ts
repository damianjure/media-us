import { describe, it, expect, beforeEach } from "vitest";
import { AssignPersonToService } from "./AssignPersonToService";
import { ServiceAssignmentRepository } from "../../infrastructure/firebase/service-assignment-repository";
import { hasTimeConflict } from "../../domain/rules/assignment-rules";
import type { Service } from "../../domain/models/Service";

const makeService = (id: string, date: string, time: string, endTime = ""): Service => ({
  id, date, time, endTime,
  typeId: "Domingo",
  status: "draft" as const,
  location: "", bannerUrl: "", areaIds: [], notes: "",
});

describe("AssignPersonToService", () => {
  let repo: ServiceAssignmentRepository;
  let useCase: AssignPersonToService;

  beforeEach(() => {
    repo = new ServiceAssignmentRepository();
    useCase = new AssignPersonToService(repo);
  });

  it("assigns person to service/area/role", async () => {
    const a = await useCase.execute({
      serviceId: "s1", areaId: "a1", personId: "p1", roleId: "r1",
    });
    expect(a.status).toBe("pending");
  });

  it("rejects if person has time conflict", async () => {
    const s1 = makeService("s1", "2026-06-15", "10:00", "11:00");
    const s2 = makeService("s2", "2026-06-15", "10:30", "11:30");
    await useCase.execute({ serviceId: "s1", areaId: "a1", personId: "p1", roleId: "r1" });
    expect(hasTimeConflict(s2, [s1])).toBe(true);
  });
});