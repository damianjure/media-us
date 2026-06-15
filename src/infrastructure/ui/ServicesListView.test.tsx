import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ServicesListView } from "./ServicesListView";

describe("ServicesListView", () => {
  it("renders title", () => {
    render(<MemoryRouter><ServicesListView /></MemoryRouter>);
    expect(screen.getByText("Servicios")).toBeInTheDocument();
  });

  it("renders service cards", () => {
    render(<MemoryRouter><ServicesListView /></MemoryRouter>);
    const cards = screen.getAllByText(/Domingo/);
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });
});