import { describe, it, expect, beforeEach } from "vitest";
import { ReorderServiceItems } from "./ReorderServiceItems";
import { ServiceOrderRepository } from "../../infrastructure/firebase/service-order-repository";

describe("ReorderServiceItems", () => {
  let repo: ServiceOrderRepository;
  let useCase: ReorderServiceItems;

  beforeEach(() => {
    repo = new ServiceOrderRepository();
    useCase = new ReorderServiceItems(repo);
  });

  it("reorders items and persists", async () => {
    await repo.save({
      id: "so1", serviceId: "s1",
      items: [
        { id: "a", type: "song", label: "A", order: 0 },
        { id: "b", type: "song", label: "B", order: 1 },
        { id: "c", type: "song", label: "C", order: 2 },
      ],
    });

    const updated = await useCase.execute("s1", 0, 2);
    expect(updated.items[0].id).toBe("b");
    expect(updated.items[2].id).toBe("a");
  });

  it("throws if order not found", async () => {
    await expect(useCase.execute("nonexistent", 0, 1)).rejects.toThrow(
      "Service order not found",
    );
  });
});