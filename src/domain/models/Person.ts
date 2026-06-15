import { nanoid } from "./nanoid";
import type { Role } from "./Team";

export interface TeamRole {
  teamId: string;
  roleId: string;
  roleName: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  teamRoles: TeamRole[];
}

export function createPerson(input: {
  name: string;
  email: string;
  teamRoles?: TeamRole[];
}): Person {
  if (!input.name) throw new Error("name is required");
  if (!input.email) throw new Error("email is required");
  if (!input.email.includes("@")) throw new Error("invalid email");

  return {
    id: nanoid(),
    name: input.name,
    email: input.email,
    teamRoles: input.teamRoles ?? [],
  };
}

export function assignRoleToPerson(
  person: Person,
  teamId: string,
  role: Role,
): Person {
  const exists = person.teamRoles.some(
    (tr) => tr.teamId === teamId && tr.roleId === role.id,
  );

  if (exists) return person;

  return {
    ...person,
    teamRoles: [
      ...person.teamRoles,
      { teamId, roleId: role.id, roleName: role.name },
    ],
  };
}