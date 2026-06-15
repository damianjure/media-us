import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServiceWizard } from "./ServiceWizard";
import { useAppStore } from "./useAppStore";
import { createArea } from "../../domain/models/Area";

describe("ServiceWizard", () => {
  const onSubmit = vi.fn();

  it("renders step 1 fields", () => {
    useAppStore.setState({ areas: [], services: [], people: [], invitations: [] });
    render(<ServiceWizard onSubmit={onSubmit} onClose={vi.fn()} />);
    expect(screen.getByText("Crear Nuevo Servicio")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByLabelText("De")).toBeInTheDocument();
    expect(screen.getByLabelText("A")).toBeInTheDocument();
  });

  it("navigates to step 2 with areas", () => {
    useAppStore.setState({
      areas: [createArea({ name: "Alabanza", color: "purple" }), createArea({ name: "Audio", color: "green" })],
      services: [], people: [], invitations: [],
    });
    render(<ServiceWizard onSubmit={onSubmit} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText("Añadir áreas ›"));
    expect(screen.getByText("Seleccionar áreas")).toBeInTheDocument();
    expect(screen.getByText("Alabanza")).toBeInTheDocument();
  });

  it("goes back to step 1 from step 2", () => {
    useAppStore.setState({
      areas: [createArea({ name: "Test" })],
      services: [], people: [], invitations: [],
    });
    render(<ServiceWizard onSubmit={onSubmit} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText("Añadir áreas ›"));
    fireEvent.click(screen.getByText("‹ Anterior"));
    expect(screen.getByText("Crear Nuevo Servicio")).toBeInTheDocument();
  });

  it("calls onSubmit with full data", () => {
    useAppStore.setState({
      areas: [createArea({ name: "Alabanza" })],
      services: [], people: [], invitations: [],
    });
    render(<ServiceWizard onSubmit={onSubmit} onClose={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText("Ej: Servicio Domingo"), { target: { value: "Domingo 10AM" } });
    fireEvent.click(screen.getByText("Crear servicio"));
    expect(onSubmit).toHaveBeenCalled();
  });
});