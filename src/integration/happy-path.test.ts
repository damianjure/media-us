import { describe, it, expect, beforeEach } from "vitest";
import { CreateService } from "../application/use-cases/CreateService";
import { SendInvitations } from "../application/use-cases/SendInvitations";
import { GetServiceMatrix } from "../application/use-cases/GetServiceMatrix";
import { ReorderServiceItems } from "../application/use-cases/ReorderServiceItems";
import { ServiceRepository } from "../infrastructure/firebase/service-repository";
import { TeamRepository } from "../infrastructure/firebase/team-repository";
import { PersonRepository } from "../infrastructure/firebase/person-repository";
import { InvitationRepository } from "../infrastructure/firebase/invitation-repository";
import { ServiceOrderRepository } from "../infrastructure/firebase/service-order-repository";
import { createPerson } from "../domain/models/Person";
import { createServiceOrder } from "../domain/models/ServiceOrder";
import { canAssignPerson } from "../domain/rules/scheduling";
import { canSendInvitation } from "../domain/rules/invitations";

describe("Integration — happy path", () => {
  let serviceRepo: ServiceRepository;
  let teamRepo: TeamRepository;
  let personRepo: PersonRepository;
  let invitationRepo: InvitationRepository;
  let orderRepo: ServiceOrderRepository;
  let createService: CreateService;
  let sendInvitations: SendInvitations;
  let getMatrix: GetServiceMatrix;
  let reorderItems: ReorderServiceItems;

  beforeEach(() => {
    serviceRepo = new ServiceRepository();
    teamRepo = new TeamRepository();
    personRepo = new PersonRepository();
    invitationRepo = new InvitationRepository();
    orderRepo = new ServiceOrderRepository();
    createService = new CreateService(serviceRepo);
    sendInvitations = new SendInvitations(invitationRepo);
    getMatrix = new GetServiceMatrix(serviceRepo, teamRepo, invitationRepo);
    reorderItems = new ReorderServiceItems(orderRepo);
  });

  it("full flow: create service → invite → respond → matrix → order", async () => {
    await teamRepo.create({ id: "t1", name: "Alabanza", roles: [{ id: "r1", name: "Vocalista" }] });
    await teamRepo.create({ id: "t2", name: "Músicos", roles: [{ id: "r2", name: "Guitarra" }] });
    expect(await teamRepo.listAll()).toHaveLength(2);

    const maria = await personRepo.create(createPerson({ name: "María García", email: "maria@test.com" }));
    const carlos = await personRepo.create(createPerson({ name: "Carlos López", email: "carlos@test.com" }));
    const juan = await personRepo.create(createPerson({ name: "Juan Pérez", email: "juan@test.com" }));
    expect(await personRepo.listAll()).toHaveLength(3);

    const s1 = await createService.execute({ date: "2026-06-07", time: "10:00", typeId: "Domingo" });
    await createService.execute({ date: "2026-06-14", time: "10:00", typeId: "Domingo" });
    expect(await serviceRepo.listByDateRange("2026-06-01", "2026-06-30")).toHaveLength(2);

    const s3 = await createService.execute({ date: "2026-06-07", time: "10:00", typeId: "Especial" });
    const existing = [{ serviceId: s1.id, date: "2026-06-07", time: "10:00" }];
    expect(canAssignPerson(s3, existing)).toBe(false);

    const invs = await sendInvitations.execute({ serviceId: s1.id, personIds: [maria.id, carlos.id] });
    expect(invs).toHaveLength(2);
    expect(invs[0].status).toBe("pending");

    const teamMemberIds = [maria.id, carlos.id];
    expect(canSendInvitation(maria.id, teamMemberIds)).toBe(true);
    expect(canSendInvitation(juan.id, teamMemberIds)).toBe(false);

    await invitationRepo.updateStatus(invs[0].id, "accepted");
    await invitationRepo.updateStatus(invs[1].id, "declined");
    const updatedInvs = await invitationRepo.listByService(s1.id);
    const accepted = updatedInvs.filter((i) => i.status === "accepted").length;
    const declined = updatedInvs.filter((i) => i.status === "declined").length;
    expect(accepted).toBe(1);
    expect(declined).toBe(1);

    const matrix = await getMatrix.execute("2026-06-01", "2026-06-30");
    expect(matrix.teams).toHaveLength(2);
    expect(matrix.dates).toHaveLength(2);
    expect(matrix.cells.length).toBe(4);

    const order = createServiceOrder({
      serviceId: s1.id,
      items: [
        { id: "it1", type: "header", label: "Bienvenida", order: 0 },
        { id: "it2", type: "song", label: "Grande es Dios", order: 1 },
        { id: "it3", type: "space", label: "Anuncios", order: 2 },
      ],
    });
    await orderRepo.save(order);

    const reordered = await reorderItems.execute(s1.id, 2, 0);
    expect(reordered.items[0].id).toBe("it3");
    expect(reordered.items[0].order).toBe(0);
    expect(reordered.items[2].id).toBe("it2");
    expect(reordered.items[2].order).toBe(2);
  });

  it("delete service cleans up invitations", async () => {
    const service = await createService.execute({ date: "2026-07-01", time: "10:00", typeId: "Domingo" });
    await sendInvitations.execute({ serviceId: service.id, personIds: ["p1", "p2"] });
    expect(await invitationRepo.listByService(service.id)).toHaveLength(2);

    await serviceRepo.delete(service.id);
    await invitationRepo.deleteByService(service.id);
    expect(await invitationRepo.listByService(service.id)).toHaveLength(0);
  });
});