import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProximosServiciosView } from "./ProximosServiciosView";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";

describe("ProximosServiciosView", () => {
  beforeEach(() => {
    useAppStore.setState({ services: [], invitations: [], people: [], areas: [], assignments: [], templates: [] });
  });

  it("shows empty state", () => {
    render(<MemoryRouter><ProximosServiciosView /></MemoryRouter>);
    expect(screen.getByText(/No hay servicios próximos/)).toBeInTheDocument();
  });

  it("renders services sorted by date", () => {
    const s1 = createService({ date: "2026-06-22", time: "10:00", typeId: "Domingo" });
    const s2 = createService({ date: "2026-06-15", time: "18:00", typeId: "Especial" });
    useAppStore.setState({ services: [s1, s2] });
    render(<MemoryRouter><ProximosServiciosView /></MemoryRouter>);
    expect(screen.getByText("Especial")).toBeInTheDocument();
  });

  it("clones a service", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo", location: "Auditorio", areaIds: ["a1"] });
    useAppStore.setState({ services: [s] });
    const addService = vi.fn();
    render(<MemoryRouter><ProximosServiciosView /></MemoryRouter>);
    fireEvent.click(screen.getByText("Clonar"));
    expect(useAppStore.getState().services.length).toBeGreaterThanOrEqual(2);
  });
});