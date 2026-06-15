import type { IServiceAssignmentRepository } from "../ports/extended-repositories";
import { createAssignment, type ServiceAssignment } from "../../domain/models/ServiceAssignment";

export class AssignPersonToService {
  private repo: IServiceAssignmentRepository;

  constructor(repo: IServiceAssignmentRepository) {
    this.repo = repo;
  }

  async execute(input: { serviceId: string; areaId: string; personId: string; roleId: string }): Promise<ServiceAssignment> {
    const assignment = createAssignment(input);
    return this.repo.create(assignment);
  }
}