import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TemplatesView } from "./TemplatesView";
import { useAppStore } from "./useAppStore";
import { createTemplate } from "../../domain/models/ServiceTemplate";

describe("TemplatesView", () => {
  it("shows empty state when no templates", () => {
    useAppStore.setState({ templates: [], areas: [] });
    render(<MemoryRouter><TemplatesView /></MemoryRouter>);
    expect(screen.getByText("No hay templates")).toBeInTheDocument();
  });

  it("renders templates from store", () => {
    useAppStore.setState({
      templates: [createTemplate({ name: "Domingo Mañana", areaIds: ["a1"] })],
      areas: [],
    });
    render(<MemoryRouter><TemplatesView /></MemoryRouter>);
    expect(screen.getByText("Domingo Mañana")).toBeInTheDocument();
  });
});