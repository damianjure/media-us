import type { IServiceRepository } from "../ports/repositories";
import { createService, type Service } from "../../domain/models/Service";

export class CreateService {
  private repo: IServiceRepository;

  constructor(repo: IServiceRepository) {
    this.repo = repo;
  }

  async execute(input: {
    date: string;
    time: string;
    typeId: string;
    notes?: string;
  }): Promise<Service> {
    const service = createService(input);
    return this.repo.create(service);
  }
}