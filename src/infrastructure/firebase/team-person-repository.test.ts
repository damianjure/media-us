import { describe, it, expect } from "vitest";
import { TeamRepository } from "./team-repository";
import { PersonRepository } from "./person-repository";

describe("TeamRepository", () => {
  it("creates and lists teams", async () => {
    const repo = new TeamRepository();
    await repo.create({ id: "t1", name: "Alabanza", roles: [] });
    await repo.create({ id: "t2", name: "Músicos", roles: [{ id: "r1", name: "Guitarra" }] });

    const all = await repo.listAll();
    expect(all).toHaveLength(2);
    expect(all[0].name).toBe("Alabanza");
  });

  it("deletes a team", async () => {
    const repo = new TeamRepository();
    await repo.create({ id: "t1", name: "Alabanza", roles: [] });
    await repo.delete("t1");

    const found = await repo.getById("t1");
    expect(found).toBeNull();
  });
});

describe("PersonRepository", () => {
  it("searches by name", async () => {
    const repo = new PersonRepository();
    await repo.create({ id: "p1", name: "María García", email: "maria@test.com", teamRoles: [] });
    await repo.create({ id: "p2", name: "Carlos López", email: "carlos@test.com", teamRoles: [] });

    const results = await repo.searchByName("mar");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("María García");
  });

  it("creates and retrieves a person", async () => {
    const repo = new PersonRepository();
    const created = await repo.create({
      id: "p1", name: "Juan", email: "juan@test.com", teamRoles: [],
    });
    expect(created.name).toBe("Juan");

    const found = await repo.getById("p1");
    expect(found!.email).toBe("juan@test.com");
  });
});