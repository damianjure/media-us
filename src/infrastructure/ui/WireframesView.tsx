import { useState } from "react";
import { CrearNuevoServicioWireframe } from "../../wireframes/CrearNuevoServicio.wireframe";
import { GestionarEquipoWireframe } from "../../wireframes/GestionarEquipo.wireframe";
import { NuevoElementoServicioWireframe } from "../../wireframes/NuevoElementoServicio.wireframe";

type FlowKey = "crear-servicio" | "gestionar-equipo" | "nuevo-elemento";

export function WireframesView() {
  const [active, setActive] = useState<FlowKey>("crear-servicio");
  const [show, setShow] = useState(true);

  const tabs: { id: FlowKey; label: string; description: string }[] = [
    { id: "crear-servicio", label: "Crear Nuevo Servicio", description: "Wizard 2 pasos con tipo, fecha/hora, ubicación, banner" },
    { id: "gestionar-equipo", label: "Gestionar Equipo", description: "Tabs miembros/invitaciones/config + KPIs + tabla" },
    { id: "nuevo-elemento", label: "Nuevo Elemento de Servicio", description: "Modal con duración, tipo, nombre, notas" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Control bar */}
      <div className="sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <h1 className="text-sm font-bold text-zinc-400">WIREFRAMES LO-FI</h1>
          <div className="flex-1 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setShow(true); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  active === t.id ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShow(!show)}
            className="px-3 py-1.5 rounded-md text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          >
            {show ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <p className="max-w-7xl mx-auto text-xs text-zinc-500 mt-2">{tabs.find((t) => t.id === active)?.description}</p>
      </div>

      {/* Active wireframe */}
      {show && active === "crear-servicio" && <CrearNuevoServicioWireframe />}
      {show && active === "gestionar-equipo" && <GestionarEquipoWireframe />}
      {show && active === "nuevo-elemento" && <NuevoElementoServicioWireframe />}
    </div>
  );
}