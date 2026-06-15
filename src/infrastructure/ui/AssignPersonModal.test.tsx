import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AssignPersonModal } from "./AssignPersonModal";

const members = [
  { id: "p1", name: "María García" },
  { id: "p2", name: "Carlos Rodríguez" },
];

describe("AssignPersonModal", () => {
  it("renders team members list", () => {
    render(<AssignPersonModal open={true} onClose={vi.fn()} onAssign={vi.fn()} members={members} />);
    expect(screen.getByText("María García")).toBeInTheDocument();
    expect(screen.getByText("Carlos Rodríguez")).toBeInTheDocument();
  });

  it("shows empty state when no members", () => {
    render(<AssignPersonModal open={true} onClose={vi.fn()} onAssign={vi.fn()} members={[]} />);
    expect(screen.getByText("Sin miembros en este equipo")).toBeInTheDocument();
  });

  it("calls onAssign with person id and closes", () => {
    const onAssign = vi.fn();
    const onClose = vi.fn();
    render(<AssignPersonModal open={true} onClose={onClose} onAssign={onAssign} members={members} />);
    fireEvent.click(screen.getByText("María García"));
    expect(onAssign).toHaveBeenCalledWith("p1", "María García");
  });

  it("does not render when closed", () => {
    render(<AssignPersonModal open={false} onClose={vi.fn()} onAssign={vi.fn()} members={members} />);
    expect(screen.queryByText("María García")).not.toBeInTheDocument();
  });

  it("has unassign option", () => {
    render(<AssignPersonModal open={true} onClose={vi.fn()} onAssign={vi.fn()} members={members} />);
    expect(screen.getByText("Desasignar")).toBeInTheDocument();
  });
});