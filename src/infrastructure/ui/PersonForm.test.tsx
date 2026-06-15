import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PersonForm } from "./PersonForm";

describe("PersonForm", () => {
  it("renders form fields", () => {
    render(<PersonForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("validates email", async () => {
    const onSubmit = vi.fn();
    render(<PersonForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(await screen.findByText("Email inválido")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with valid data", async () => {
    const onSubmit = vi.fn();
    render(<PersonForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "María" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "maria@test.com" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "María",
      email: "maria@test.com",
    });
  });
});