import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ServiceDetailView } from "./ServiceDetailView";

describe("ServiceDetailView", () => {
  it("renders service info", () => {
    render(<MemoryRouter><ServiceDetailView /></MemoryRouter>);
    expect(screen.getByText("Domingo 15 Jun")).toBeInTheDocument();
    expect(screen.getByText("Orden del Servicio")).toBeInTheDocument();
  });

  it("renders counters", () => {
    render(<MemoryRouter><ServiceDetailView /></MemoryRouter>);
    expect(screen.getByText("Aceptados")).toBeInTheDocument();
    expect(screen.getByText("Declinados")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
  });
});