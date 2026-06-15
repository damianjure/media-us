import { describe, it, expect, beforeEach } from "vitest";
import { CreateService } from "./CreateService";
import { ServiceRepository } from "../../infrastructure/firebase/service-repository";

describe("CreateService", () => {
  let repo: ServiceRepository;
  let useCase: CreateService;

  beforeEach(() => {
    repo = new ServiceRepository();
    useCase = new CreateService(repo);
  });

  it("creates and persists a service", async () => {
    const input = { date: "2026-06-15", time: "10:00", typeId: "t1" };
    const result = await useCase.execute(input);
    expect(result.id).toBeDefined();
    expect(result.date).toBe("2026-06-15");

    const found = await repo.getById(result.id);
    expect(found).toBeDefined();
  });

  it("throws if date is missing", async () => {
    await expect(
      useCase.execute({ date: "", time: "10:00", typeId: "t1" }),
    ).rejects.toThrow("date is required");
  });
});