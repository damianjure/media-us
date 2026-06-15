import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MatrixView } from "./MatrixView";
import { useAppStore } from "./useAppStore";
import { createArea } from "../../domain/models/Area";
import { createService } from "../../domain/models/Service";
import { createPerson } from "../../domain/models/Person";

describe("MatrixView", () => {
  beforeEach(() => {
    useAppStore.setState({ areas: [], services: [], assignments: [], people: [], invitations: [] });
  });

  it("shows empty state when no services", () => {
    render(<MemoryRouter><MatrixView /></MemoryRouter>);
    expect(screen.getByText("No hay servicios programados")).toBeInTheDocument();
  });

  it("renders areas and service dates", () => {
    const area = createArea({ name: "Alabanza" });
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo", areaIds: [area.id] });
    useAppStore.setState({ areas: [area], services: [s], people: [] });
    render(<MemoryRouter><MatrixView /></MemoryRouter>);
    expect(screen.getByText("Alabanza")).toBeInTheDocument();
  });

  it("shows assigned person name", () => {
    const area = createArea({ name: "Alabanza" });
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo", areaIds: [area.id] });
    const p = createPerson({ name: "María", email: "m@t.com" });
    useAppStore.setState({
      areas: [area], services: [s], people: [p],
      assignments: [{ id: "a1", serviceId: s.id, areaId: area.id, personId: p.id, roleId: "r1", status: "accepted" }],
    });
    render(<MemoryRouter><MatrixView /></MemoryRouter>);
    expect(screen.getByText("María")).toBeInTheDocument();
  });
});