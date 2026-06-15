import { describe, it, expect, beforeEach } from "vitest";
import { CreateArea } from "./CreateArea";
import { AreaRepository } from "../../infrastructure/firebase/area-repository";

describe("CreateArea", () => {
  let repo: AreaRepository;
  let useCase: CreateArea;

  beforeEach(() => {
    repo = new AreaRepository();
    useCase = new CreateArea(repo);
  });

  it("creates and persists area", async () => {
    const a = await useCase.execute({ name: "Alabanza", color: "purple" });
    expect(a.id).toBeDefined();
    expect(a.name).toBe("Alabanza");
    expect((await repo.listAll())).toHaveLength(1);
  });
});