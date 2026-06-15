import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton, EmptyState, OfflineBadge } from "./ui-states";

describe("Skeleton", () => {
  it("renders with correct class", () => {
    render(<Skeleton />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("animate-pulse");
  });
});

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No hay servicios" description="Creá tu primer servicio" />);
    expect(screen.getByText("No hay servicios")).toBeInTheDocument();
    expect(screen.getByText("Creá tu primer servicio")).toBeInTheDocument();
  });
});

describe("OfflineBadge", () => {
  it("renders offline text", () => {
    render(<OfflineBadge />);
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});