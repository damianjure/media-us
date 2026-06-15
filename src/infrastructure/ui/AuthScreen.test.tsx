import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthScreen } from "./AuthScreen";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("AuthScreen", () => {
  it("renders all login options", () => {
    render(
      <MemoryRouter>
        <AuthScreen />
      </MemoryRouter>,
    );
    expect(screen.getByText("Continuar con Google")).toBeInTheDocument();
    expect(screen.getByText("Continuar con Apple")).toBeInTheDocument();
    expect(screen.getByText("Continuar con Email")).toBeInTheDocument();
  });

  it("renders app name", () => {
    render(
      <MemoryRouter>
        <AuthScreen />
      </MemoryRouter>,
    );
    expect(screen.getByText("Media Us")).toBeInTheDocument();
  });
});