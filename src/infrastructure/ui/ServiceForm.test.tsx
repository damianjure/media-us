import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServiceForm } from "./ServiceForm";

describe("ServiceForm", () => {
  it("renders form fields", () => {
    render(<ServiceForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Fecha")).toBeInTheDocument();
    expect(screen.getByLabelText("Hora")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de servicio")).toBeInTheDocument();
    expect(screen.getByLabelText("Notas")).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const onSubmit = vi.fn();
    render(<ServiceForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(await screen.findByText("La fecha es requerida")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with valid data", async () => {
    const onSubmit = vi.fn();
    render(<ServiceForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Fecha"), { target: { value: "2026-06-15" } });
    fireEvent.change(screen.getByLabelText("Hora"), { target: { value: "10:00" } });
    fireEvent.change(screen.getByLabelText("Tipo de servicio"), { target: { value: "Domingo" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(onSubmit).toHaveBeenCalledWith({
      date: "2026-06-15",
      time: "10:00",
      typeId: "Domingo",
      notes: "",
    });
  });
});