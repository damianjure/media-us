import { nanoid } from "./nanoid";

export interface Role {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  roles: Role[];
}

export function createTeam(input: { name: string; roles?: Role[] }): Team {
  if (!input.name) throw new Error("name is required");

  return {
    id: nanoid(),
    name: input.name,
    roles: input.roles ?? [],
  };
}