import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ServiceDetailView } from "./ServiceDetailView";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";
import { createArea } from "../../domain/models/Area";
import { createPerson } from "../../domain/models/Person";

describe("ServiceDetailView — areas", () => {
  beforeEach(() => {
    useAppStore.setState({ services: [], areas: [], people: [], invitations: [], assignments: [], orders: new Map() });
  });

  it("shows assigned people in area sections", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo", areaIds: ["a1"] });
    const area = createArea({ name: "Alabanza" });
    area.id = "a1";
    const person = createPerson({ name: "María", email: "m@t.com" });

    useAppStore.setState({
      services: [s],
      areas: [area],
      people: [person],
      assignments: [{ id: "as1", serviceId: s.id, areaId: "a1", personId: person.id, roleId: "r1", status: "accepted" }],
    });

    render(
      <MemoryRouter initialEntries={[`/service/${s.id}`]}>
        <Routes><Route path="/service/:id" element={<ServiceDetailView />} /></Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Alabanza")).toBeInTheDocument();
    expect(screen.getAllByText("María").length).toBeGreaterThanOrEqual(1);
  });
});