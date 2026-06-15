import { describe, it, expect } from "vitest";
import { createTeam, type Team } from "./Team";
import { createPerson, assignRoleToPerson } from "./Person";

describe("Team model", () => {
  it("creates a team with name", () => {
    const team = createTeam({ name: "Alabanza" });
    expect(team.id).toBeDefined();
    expect(team.name).toBe("Alabanza");
    expect(team.roles).toEqual([]);
  });

  it("creates a team with roles", () => {
    const team = createTeam({
      name: "Músicos",
      roles: [
        { id: "r1", name: "Guitarra" },
        { id: "r2", name: "Bajo" },
      ],
    });
    expect(team.roles).toHaveLength(2);
    expect(team.roles[0].name).toBe("Guitarra");
  });

  it("throws if name is empty", () => {
    expect(() => createTeam({ name: "" })).toThrow("name is required");
  });
});

describe("Person model", () => {
  it("creates a person with name and email", () => {
    const person = createPerson({ name: "María García", email: "maria@test.com" });
    expect(person.id).toBeDefined();
    expect(person.name).toBe("María García");
    expect(person.email).toBe("maria@test.com");
    expect(person.teamRoles).toEqual([]);
  });

  it("throws if name is empty", () => {
    expect(() => createPerson({ name: "", email: "a@b.com" })).toThrow("name is required");
  });

  it("throws if email is invalid", () => {
    expect(() => createPerson({ name: "A", email: "" })).toThrow("email is required");
    expect(() => createPerson({ name: "A", email: "notanemail" })).toThrow("invalid email");
  });
});

describe("assignRoleToPerson", () => {
  it("assigns a team role to a person", () => {
    const person = createPerson({ name: "Juan", email: "juan@test.com" });
    const team: Team = {
      id: "t1",
      name: "Músicos",
      roles: [{ id: "r1", name: "Guitarra" }],
    };

    const updated = assignRoleToPerson(person, team.id, team.roles[0]);
    expect(updated.teamRoles).toHaveLength(1);
    expect(updated.teamRoles[0]).toEqual({ teamId: "t1", roleId: "r1", roleName: "Guitarra" });
  });

  it("does not duplicate existing assignments", () => {
    const person = createPerson({ name: "Juan", email: "juan@test.com" });
    const team: Team = { id: "t1", name: "Músicos", roles: [{ id: "r1", name: "Guitarra" }] };

    const withRole = assignRoleToPerson(person, team.id, team.roles[0]);
    const again = assignRoleToPerson(withRole, team.id, team.roles[0]);
    expect(again.teamRoles).toHaveLength(1);
  });
});