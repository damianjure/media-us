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
    const getStore = () => useAppStore.getState();

    // 1. Create areas
    const alabanza = createArea({ name: "Alabanza", color: "purple", icon: "music" });
    const audio = createArea({ name: "Audio", color: "green", icon: "mic" });
    getStore().addArea(alabanza);
    getStore().addArea(audio);
    expect(getStore().areas).toHaveLength(2);

    // 2. Create people
    const maria = createPerson({ name: "María García", email: "maria@test.com" });
    const carlos = createPerson({ name: "Carlos López", email: "carlos@test.com" });
    getStore().addPerson(maria);
    getStore().addPerson(carlos);
    expect(getStore().people).toHaveLength(2);

    // 3. Create template
    const tpl = createTemplate({
      name: "Domingo Mañana",
      areaIds: [alabanza.id, audio.id],
      orderItems: [
        { id: "it1", type: "header", label: "Bienvenida", order: 0 },
        { id: "it2", type: "song", label: "Grande es Dios", order: 1 },
      ],
    });
    getStore().addTemplate(tpl);
    expect(getStore().templates).toHaveLength(1);

    // 4. Create service with template's areas
    const s = createService({
      date: "2026-07-05", time: "10:00", endTime: "12:00",
      typeId: "Domingo", location: "Auditorio Principal", areaIds: tpl.areaIds,
    });
    getStore().addService(s);
    expect(getStore().services).toHaveLength(1);

    // 5. Assign people to areas
    getStore().addAssignment(createAssignment({
      serviceId: s.id, areaId: alabanza.id, personId: maria.id, roleId: "vocalista",
    }));
    expect(getStore().assignments.filter((a) => a.serviceId === s.id)).toHaveLength(1);

    // 6. Clone
    const nextWeek = new Date(s.date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    getStore().addService(createService({
      date: nextWeek.toISOString().slice(0, 10), time: s.time, endTime: s.endTime,
      typeId: s.typeId, location: s.location, areaIds: s.areaIds, notes: s.notes,
    }));
    expect(getStore().services).toHaveLength(2);

    // 7. Create order for clone
    getStore().saveOrder(createServiceOrder({ serviceId: getStore().services[1].id, items: tpl.orderItems }));
    expect(getStore().getOrder(getStore().services[1].id)).toBeDefined();
  });
});