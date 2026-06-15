import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AreaForm } from "./AreaForm";

describe("AreaForm", () => {
  it("renders form fields", () => {
    render(<AreaForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("validates name is required", () => {
    render(<AreaForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
  });

  it("submits with valid data", () => {
    const onSubmit = vi.fn();
    render(<AreaForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Alabanza" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: "Alabanza" }));
  });
});