import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PeopleView } from "./PeopleView";

describe("PeopleView", () => {
  it("renders search input", () => {
    render(<MemoryRouter><PeopleView /></MemoryRouter>);
    expect(screen.getByPlaceholderText("Buscar persona...")).toBeInTheDocument();
  });

  it("renders people list", () => {
    render(<MemoryRouter><PeopleView /></MemoryRouter>);
    expect(screen.getByText("María García")).toBeInTheDocument();
  });
});