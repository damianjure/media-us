import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ServiceDetailView } from "./ServiceDetailView";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";

describe("ServiceDetailView", () => {
  beforeEach(() => {
    useAppStore.setState({ services: [], invitations: [], orders: new Map() });
  });

  it("shows not found when service missing", () => {
    render(
      <MemoryRouter initialEntries={["/service/nonexistent"]}>
        <Routes>
          <Route path="/service/:id" element={<ServiceDetailView />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Servicio no encontrado")).toBeInTheDocument();
  });

  it("renders service info from store", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo" });
    useAppStore.setState({ services: [s] });

    render(
      <MemoryRouter initialEntries={[`/service/${s.id}`]}>
        <Routes>
          <Route path="/service/:id" element={<ServiceDetailView />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Domingo/)).toBeInTheDocument();
    expect(screen.getByText("Orden del Servicio")).toBeInTheDocument();
  });

  it("renders counters", () => {
    const s = createService({ date: "2026-06-15", time: "10:00", typeId: "Domingo" });
    useAppStore.setState({ services: [s] });

    render(
      <MemoryRouter initialEntries={[`/service/${s.id}`]}>
        <Routes>
          <Route path="/service/:id" element={<ServiceDetailView />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Aceptados")).toBeInTheDocument();
    expect(screen.getByText("Declinados")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
  });
});