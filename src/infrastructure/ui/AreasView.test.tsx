import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AreasView } from "./AreasView";
import { useAppStore } from "./useAppStore";
import { createArea } from "../../domain/models/Area";

describe("AreasView", () => {
  it("shows empty state when no areas", () => {
    useAppStore.setState({ areas: [], services: [], invitations: [], people: [], templates: [] });
    render(<MemoryRouter><AreasView /></MemoryRouter>);
    expect(screen.getByText(/No hay áreas/)).toBeInTheDocument();
  });

  it("renders area cards from store", () => {
    useAppStore.setState({
      areas: [createArea({ name: "Alabanza", color: "purple" })],
    });
    render(<MemoryRouter><AreasView /></MemoryRouter>);
    expect(screen.getByText("Alabanza")).toBeInTheDocument();
  });
});