import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../infrastructure/ui/useAppStore";
import { createArea } from "../domain/models/Area";
import { createPerson } from "../domain/models/Person";
import { createTemplate } from "../domain/models/ServiceTemplate";
import { createService } from "../domain/models/Service";
import { createAssignment } from "../domain/models/ServiceAssignment";
import { createServiceOrder } from "../domain/models/ServiceOrder";

describe("E2E — Full happy path (store-level)", () => {
  beforeEach(() => {
    useAppStore.setState({
      services: [], areas: [], people: [], invitations: [],
      assignments: [], templates: [], orders: new Map(), teams: [],
    });
  });

  it("complete flow: areas → template → service → assign → clone → order", () => {
    const store = useAppStore.getState();

    // 1. Create areas
    const alabanza = createArea({ name: "Alabanza", color: "purple", icon: "music" });
    const audio = createArea({ name: "Audio", color: "green", icon: "mic" });
    store.addArea(alabanza);
    store.addArea(audio);
    expect(store.areas).toHaveLength(2);

    // 2. Create people
    const maria = createPerson({ name: "María García", email: "maria@test.com" });
    const carlos = createPerson({ name: "Carlos López", email: "carlos@test.com" });
    store.addPerson(maria);
    store.addPerson(carlos);
    expect(store.people).toHaveLength(2);

    // 3. Create template
    const tpl = createTemplate({
      name: "Domingo Mañana",
      areaIds: [alabanza.id, audio.id],
      orderItems: [
        { id: "it1", type: "header", label: "Bienvenida", order: 0 },
        { id: "it2", type: "song", label: "Grande es Dios", order: 1 },
      ],
    });
    store.addTemplate(tpl);
    expect(store.templates).toHaveLength(1);

    // 4. Create service with template's areas
    const s = createService({
      date: "2026-07-05",
      time: "10:00",
      endTime: "12:00",
      typeId: "Domingo",
      location: "Auditorio Principal",
      areaIds: tpl.areaIds,
    });
    store.addService(s);
    expect(store.services).toHaveLength(1);
    expect(store.services[0].areaIds).toEqual([alabanza.id, audio.id]);

    // 5. Assign people to areas
    const assign1 = createAssignment({
      serviceId: s.id,
      areaId: alabanza.id,
      personId: maria.id,
      roleId: "vocalista",
    });
    store.addAssignment(assign1);
    expect(store.assignments.filter((a) => a.serviceId === s.id && a.areaId === alabanza.id)).toHaveLength(1);

    // 6. Clone service
    const nextWeek = new Date(s.date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const cloned = createService({
      date: nextWeek.toISOString().slice(0, 10),
      time: s.time,
      endTime: s.endTime,
      typeId: s.typeId,
      location: s.location,
      areaIds: s.areaIds,
      notes: s.notes,
    });
    store.addService(cloned);
    expect(store.services).toHaveLength(2);

    // 7. Create service order for the clone
    const order = createServiceOrder({
      serviceId: cloned.id,
      items: tpl.orderItems,
    });
    store.saveOrder(order);
    const saved = store.getOrder(cloned.id);
    expect(saved).toBeDefined();
    expect(saved!.items).toHaveLength(2);

    // 8. Verify cross-entity invariants
    expect(store.areas.filter((a) => s.areaIds.includes(a.id))).toHaveLength(2);
    expect(store.assignments.filter((a) => a.serviceId === s.id)).toHaveLength(1);
    expect(store.templates[0].areaIds).toEqual([alabanza.id, audio.id]);
  });
});