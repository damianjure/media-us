import { useState } from "react";

type Tab = "miembros" | "invitaciones" | "configuracion";

export function GestionarEquipoWireframe() {
  const [tab, setTab] = useState<Tab>("miembros");
  const [buscar, setBuscar] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestionar Equipo</h1>
          <p className="text-zinc-400 text-sm mt-1">Administra miembros e invitaciones de Damian Jure (Personal)</p>
        </div>

        {/* Tabs */}
        <div className="border border-zinc-800 rounded-lg p-1 grid grid-cols-3">
          <button onClick={() => setTab("miembros")} className={`py-2 rounded flex items-center justify-center gap-2 ${tab === "miembros" ? "bg-zinc-800" : ""}`}>
            <span>👥</span> Miembros
          </button>
          <button onClick={() => setTab("invitaciones")} className={`py-2 rounded flex items-center justify-center gap-2 ${tab === "invitaciones" ? "bg-zinc-800" : ""}`}>
            <span>✉️</span> Invitaciones
          </button>
          <button onClick={() => setTab("configuracion")} className={`py-2 rounded flex items-center justify-center gap-2 ${tab === "configuracion" ? "bg-zinc-800" : ""}`}>
            <span>⚙️</span> Configuración
          </button>
        </div>

        {/* Role banner */}
        <div className="border border-orange-900/50 bg-orange-950/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-orange-900/50 flex items-center justify-center text-orange-400">ⓘ</span>
            <p className="text-sm">
              <span className="font-bold">Tu rol: Propietario</span> <span className="text-zinc-400">- Control total de la organización</span>
            </p>
          </div>
          <button className="text-sm text-zinc-300 hover:text-white">Ver permisos</button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Miembros", value: 1, color: "orange" },
            { label: "Miembros Activos", value: 1, color: "green" },
            { label: "Invitaciones Pendientes", value: 0, color: "yellow" },
            { label: "Cursos Completados", value: 0, color: "blue" },
          ].map((k) => (
            <div key={k.label} className="border border-zinc-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">{k.label}</p>
                <p className="text-3xl font-bold mt-1">{k.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-md bg-${k.color}-900/40 flex items-center justify-center text-${k.color}-400`}>
                [icon]
              </div>
            </div>
          ))}
        </div>

        {/* Section */}
        <div className="border border-zinc-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Miembros de la organización</h2>
              <p className="text-sm text-zinc-400 mt-1">Gestiona los miembros y sus roles en la organización</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 border border-zinc-800 rounded-md flex items-center justify-center">[☰]</button>
              <button className="w-10 h-10 border border-zinc-800 rounded-md flex items-center justify-center">[⊞</button>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold flex items-center gap-2">
                <span>+</span> Invitar miembro
              </button>
            </div>
          </div>

          {/* Search + filters */}
          <div className="space-y-3">
            <div className="border border-zinc-800 rounded-md px-3 py-2 flex items-center gap-2">
              <span className="text-zinc-500">🔍</span>
              <input
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="flex-1 bg-transparent text-zinc-100 outline-none placeholder-zinc-500"
              />
            </div>
            <div className="grid grid-cols-5 gap-3">
              {["Rol", "Estado", "Área de servicio", "Progreso de cursos", "Nombre"].map((f) => (
                <div key={f} className="border border-zinc-800 rounded-md px-3 py-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>{f}</span>
                  <span>▾</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="mt-4">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-xs uppercase text-zinc-500 border-b border-zinc-800 pb-2 px-2">
              <span>MIEMBRO</span>
              <span>ROL</span>
              <span>ÁREAS</span>
              <span>SERVICIOS</span>
              <span>CURSOS</span>
              <span>ACTIVIDAD</span>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center text-sm py-4 px-2 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">[avatar]</div>
                <div>
                  <p className="font-semibold">Damian Jure</p>
                  <p className="text-xs text-zinc-500">damianjure@gmail.com</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full border border-orange-700 text-orange-400 text-xs w-fit">Propietario</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-orange-500" />
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-green-400">✓ 0</span>
                <span className="text-red-400">✗ 0</span>
                <span className="text-yellow-400">⏳ 0</span>
              </div>
              <span className="text-zinc-500">—</span>
              <span className="text-zinc-500 text-xs">hace alrededor d...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}