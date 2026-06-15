import type { IAreaRepository } from "../ports/extended-repositories";
import { createArea, type Area } from "../../domain/models/Area";

export class CreateArea {
  private repo: IAreaRepository;

  constructor(repo: IAreaRepository) {
    this.repo = repo;
  }

  async execute(input: { name: string; description?: string; color?: Area["color"]; icon?: Area["icon"] }): Promise<Area> {
    const area = createArea(input);
    return this.repo.create(area);
  }
}