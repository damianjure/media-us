import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarView } from "./CalendarView";
import { useAppStore } from "./useAppStore";

describe("CalendarView", () => {
  beforeEach(() => {
    useAppStore.setState({ services: [], people: [], invitations: [], areas: [] });
  });

  it("renders month header and week days", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    expect(screen.getByText("Junio 2026")).toBeInTheDocument();
    expect(screen.getByText("Dom")).toBeInTheDocument();
  });

  it("renders days", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("navigates to next month", () => {
    render(<MemoryRouter><CalendarView /></MemoryRouter>);
    const buttons = screen.getAllByRole("button");
    const nextBtn = buttons[1]; // index 1 is ChevronRight (after ChevronLeft)
    fireEvent.click(nextBtn);
    expect(screen.getByText("Julio 2026")).toBeInTheDocument();
  });
});