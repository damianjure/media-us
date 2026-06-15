import { nanoid } from "./nanoid";

export type AreaColor = "purple" | "yellow" | "orange" | "green" | "blue" | "red" | "pink";
export type AreaIcon = "music" | "mic" | "video" | "lightbulb" | "user" | "settings" | "heart";

export interface Area {
  id: string;
  name: string;
  description: string;
  color: AreaColor;
  icon: AreaIcon;
  memberIds: string[];
  roleIds: string[];
}

export function createArea(input: {
  name: string;
  description?: string;
  color?: AreaColor;
  icon?: AreaIcon;
  memberIds?: string[];
  roleIds?: string[];
}): Area {
  if (!input.name) throw new Error("name is required");

  return {
    id: nanoid(),
    name: input.name,
    description: input.description ?? "",
    color: input.color ?? "purple",
    icon: input.icon ?? "music",
    memberIds: input.memberIds ?? [],
    roleIds: input.roleIds ?? [],
  };
}