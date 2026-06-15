import { describe, it, expect } from "vitest";
import {
  createInvitation,
  InvitationStatus,
} from "./Invitation";
import {
  createServiceOrder,
  reorderItems,
  type ServiceOrderItem,
} from "./ServiceOrder";

describe("Invitation model", () => {
  it("creates an invitation with pending status", () => {
    const inv = createInvitation({
      personId: "p1",
      serviceId: "s1",
    });

    expect(inv.id).toBeDefined();
    expect(inv.personId).toBe("p1");
    expect(inv.serviceId).toBe("s1");
    expect(inv.status).toBe(InvitationStatus.Pending);
  });

  it("throws if personId is missing", () => {
    expect(() => createInvitation({ personId: "", serviceId: "s1" })).toThrow(
      "personId is required",
    );
  });

  it("throws if serviceId is missing", () => {
    expect(() => createInvitation({ personId: "p1", serviceId: "" })).toThrow(
      "serviceId is required",
    );
  });
});

describe("ServiceOrder model", () => {
  const sampleItems: ServiceOrderItem[] = [
    { id: "i1", type: "header", label: "Bienvenida", order: 0 },
    { id: "i2", type: "song", label: "Grande es Dios", order: 1 },
    { id: "i3", type: "space", label: "Anuncios", order: 2 },
  ];

  it("creates a service order with items", () => {
    const order = createServiceOrder({ serviceId: "s1", items: sampleItems });
    expect(order.id).toBeDefined();
    expect(order.serviceId).toBe("s1");
    expect(order.items).toHaveLength(3);
    expect(order.items[0].type).toBe("header");
  });

  it("creates an empty service order", () => {
    const order = createServiceOrder({ serviceId: "s1" });
    expect(order.items).toEqual([]);
  });

  it("reorders items", () => {
    const order = createServiceOrder({ serviceId: "s1", items: sampleItems });
    const reordered = reorderItems(order, 0, 2);
    expect(reordered.items[0].id).toBe("i2");
    expect(reordered.items[0].order).toBe(0);
    expect(reordered.items[1].id).toBe("i3");
    expect(reordered.items[1].order).toBe(1);
    expect(reordered.items[2].id).toBe("i1");
    expect(reordered.items[2].order).toBe(2);
  });

  it("reordering is idempotent on same position", () => {
    const order = createServiceOrder({ serviceId: "s1", items: sampleItems });
    const same = reorderItems(order, 1, 1);
    expect(same.items).toEqual(order.items);
  });
});