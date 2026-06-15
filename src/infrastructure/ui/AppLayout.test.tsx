import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";

describe("AppLayout", () => {
  it("renders bottom tabs", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <AppLayout />
      </MemoryRouter>,
    );
    expect(screen.getByText("Calendario")).toBeInTheDocument();
    expect(screen.getByText("Matriz")).toBeInTheDocument();
    expect(screen.getByText("Servicios")).toBeInTheDocument();
    expect(screen.getByText("Personas")).toBeInTheDocument();
  });

  it("renders header with app name", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <AppLayout />
      </MemoryRouter>,
    );
    expect(screen.getByText("Media Us")).toBeInTheDocument();
  });

  it("highlights active tab", () => {
    render(
      <MemoryRouter initialEntries={["/app/matrix"]}>
        <AppLayout />
      </MemoryRouter>,
    );
    const matrixLink = screen.getByText("Matriz").closest("a");
    expect(matrixLink?.className).toContain("indigo");
  });
});