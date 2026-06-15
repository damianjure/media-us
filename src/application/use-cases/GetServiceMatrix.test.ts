import { describe, it, expect } from "vitest";
import { GetServiceMatrix } from "./GetServiceMatrix";
import { ServiceRepository } from "../../infrastructure/firebase/service-repository";
import { TeamRepository } from "../../infrastructure/firebase/team-repository";
import { InvitationRepository } from "../../infrastructure/firebase/invitation-repository";
import { createService } from "../../domain/models/Service";

describe("GetServiceMatrix", () => {
  it("builds matrix structure from data", async () => {
    const serviceRepo = new ServiceRepository();
    const teamRepo = new TeamRepository();
    const invitationRepo = new InvitationRepository();

    await teamRepo.create({ id: "t1", name: "Alabanza", roles: [] });
    await teamRepo.create({ id: "t2", name: "Músicos", roles: [] });

    const s1 = createService({ date: "2026-06-07", time: "10:00", typeId: "type1" });
    const s2 = createService({ date: "2026-06-14", time: "10:00", typeId: "type1" });
    await serviceRepo.create(s1);
    await serviceRepo.create(s2);

    await invitationRepo.create({ id: "i1", personId: "p1", serviceId: s1.id, status: "accepted" });
    await invitationRepo.create({ id: "i2", personId: "p2", serviceId: s2.id, status: "pending" });

    const useCase = new GetServiceMatrix(serviceRepo, teamRepo, invitationRepo);
    const matrix = await useCase.execute("2026-06-01", "2026-06-30");

    expect(matrix.teams).toHaveLength(2);
    expect(matrix.dates).toHaveLength(2);
    expect(matrix.cells.length).toBeGreaterThan(0);
  });
});