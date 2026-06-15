import type { IServiceRepository, ITeamRepository, IInvitationRepository } from "../ports/repositories";

interface MatrixResult {
  teams: { id: string; name: string }[];
  dates: string[];
  cells: { teamId: string; date: string; personId: string | null; status: string | null }[];
}

export class GetServiceMatrix {
  private serviceRepo: IServiceRepository;
  private teamRepo: ITeamRepository;
  private invitationRepo: IInvitationRepository;

  constructor(
    serviceRepo: IServiceRepository,
    teamRepo: ITeamRepository,
    invitationRepo: IInvitationRepository,
  ) {
    this.serviceRepo = serviceRepo;
    this.teamRepo = teamRepo;
    this.invitationRepo = invitationRepo;
  }

  async execute(start: string, end: string): Promise<MatrixResult> {
    const teams = await this.teamRepo.listAll();
    const services = await this.serviceRepo.listByDateRange(start, end);
    const dates = [...new Set(services.map((s) => s.date))].sort();

    const cells: MatrixResult["cells"] = [];
    for (const team of teams) {
      for (const date of dates) {
        const service = services.find((s) => s.date === date);
        if (!service) {
          cells.push({ teamId: team.id, date, personId: null, status: null });
          continue;
        }

        const invitations = await this.invitationRepo.listByService(service.id);
        const teamInvite = invitations[0] ?? null;

        cells.push({
          teamId: team.id,
          date,
          personId: teamInvite?.personId ?? null,
          status: teamInvite?.status ?? null,
        });
      }
    }

    return { teams: teams.map((t) => ({ id: t.id, name: t.name })), dates, cells };
  }
}