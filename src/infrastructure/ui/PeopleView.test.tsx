import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PeopleView } from "./PeopleView";
import { useAppStore } from "./useAppStore";
import { createPerson } from "../../domain/models/Person";

describe("PeopleView", () => {
  beforeEach(() => {
    useAppStore.setState({ people: [] });
  });

  it("renders search input", () => {
    render(<MemoryRouter><PeopleView /></MemoryRouter>);
    expect(screen.getByPlaceholderText("Buscar persona...")).toBeInTheDocument();
  });

  it("renders people list from store", () => {
    const p = createPerson({ name: "María García", email: "maria@test.com" });
    useAppStore.setState({ people: [p] });
    render(<MemoryRouter><PeopleView /></MemoryRouter>);
    expect(screen.getByText("María García")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<MemoryRouter><PeopleView /></MemoryRouter>);
    expect(screen.getByText("No hay personas. Agregá la primera.")).toBeInTheDocument();
  });
});