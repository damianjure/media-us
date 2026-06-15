import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ServicesListView } from "./ServicesListView";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";

describe("ServicesListView", () => {
  beforeEach(() => {
    useAppStore.setState({ services: [], invitations: [] });
  });

  it("renders title", () => {
    render(<MemoryRouter><ServicesListView /></MemoryRouter>);
    expect(screen.getByText("Servicios")).toBeInTheDocument();
  });

  it("shows empty state when no services", () => {
    render(<MemoryRouter><ServicesListView /></MemoryRouter>);
    expect(screen.getByText("No hay servicios. Creá tu primer servicio.")).toBeInTheDocument();
  });

  it("renders service cards when data exists", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo" });
    useAppStore.setState({ services: [s], invitations: [] });
    render(<MemoryRouter><ServicesListView /></MemoryRouter>);
    expect(screen.getByText("Domingo")).toBeInTheDocument();
  });
});