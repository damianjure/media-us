import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarView } from "./CalendarView";

describe("CalendarView", () => {
  it("renders month header", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    expect(screen.getByText("Junio 2026")).toBeInTheDocument();
  });

  it("renders week day labels", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    expect(screen.getByText("Dom")).toBeInTheDocument();
    expect(screen.getByText("Lun")).toBeInTheDocument();
  });

  it("renders days", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});