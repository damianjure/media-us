import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TeamForm } from "./TeamForm";

describe("TeamForm", () => {
  it("renders form fields", () => {
    render(<TeamForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Nombre del equipo")).toBeInTheDocument();
  });

  it("can add and remove roles", async () => {
    render(<TeamForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText("Agregar rol"));
    fireEvent.click(screen.getByText("Agregar rol"));
    const inputs = screen.getAllByPlaceholderText("Nombre del rol");
    expect(inputs).toHaveLength(2);
    fireEvent.click(screen.getAllByText("✕")[0]);
    expect(screen.getAllByPlaceholderText("Nombre del rol")).toHaveLength(1);
  });

  it("calls onSubmit with team data", async () => {
    const onSubmit = vi.fn();
    render(<TeamForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Nombre del equipo"), { target: { value: "Alabanza" } });
    fireEvent.click(screen.getByText("Agregar rol"));
    fireEvent.change(screen.getByPlaceholderText("Nombre del rol"), { target: { value: "Vocalista" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Alabanza",
      roles: [{ name: "Vocalista" }],
    });
  });
});