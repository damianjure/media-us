import { describe, it, expect } from "vitest";
import { InvitationRepository } from "./invitation-repository";
import { ServiceOrderRepository } from "./service-order-repository";

describe("InvitationRepository", () => {
  it("lists invitations by service", async () => {
    const repo = new InvitationRepository();
    await repo.create({ id: "i1", personId: "p1", serviceId: "s1", status: "pending" });
    await repo.create({ id: "i2", personId: "p2", serviceId: "s1", status: "pending" });
    await repo.create({ id: "i3", personId: "p3", serviceId: "s2", status: "pending" });

    const s1 = await repo.listByService("s1");
    expect(s1).toHaveLength(2);
  });

  it("updates invitation status", async () => {
    const repo = new InvitationRepository();
    await repo.create({ id: "i1", personId: "p1", serviceId: "s1", status: "pending" });
    await repo.updateStatus("i1", "accepted");

    const list = await repo.listByService("s1");
    expect(list[0].status).toBe("accepted");
  });

  it("deletes by service", async () => {
    const repo = new InvitationRepository();
    await repo.create({ id: "i1", personId: "p1", serviceId: "s1", status: "pending" });
    await repo.deleteByService("s1");

    const list = await repo.listByService("s1");
    expect(list).toHaveLength(0);
  });
});

describe("ServiceOrderRepository", () => {
  it("saves and retrieves a service order", async () => {
    const repo = new ServiceOrderRepository();
    await repo.save({
      id: "so1",
      serviceId: "s1",
      items: [{ id: "it1", type: "song", label: "Test", order: 0 }],
    });

    const found = await repo.getByService("s1");
    expect(found).toBeDefined();
    expect(found!.items).toHaveLength(1);
    expect(found!.items[0].label).toBe("Test");
  });

  it("returns null for non-existent order", async () => {
    const repo = new ServiceOrderRepository();
    const found = await repo.getByService("nonexistent");
    expect(found).toBeNull();
  });
});