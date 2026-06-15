import { useState } from "react";

type Tipo = "vacio" | "cancion" | "diapositivas" | "pasaje";

export function NuevoElementoServicioWireframe() {
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [tipo, setTipo] = useState<Tipo>("vacio");
  const [nombre, setNombre] = useState("");
  const [notas, setNotas] = useState("");

  const tipos: { id: Tipo; label: string }[] = [
    { id: "vacio", label: "Vacío" },
    { id: "cancion", label: "Canción" },
    { id: "diapositivas", label: "Diapositivas" },
    { id: "pasaje", label: "Pasaje Bíblico" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 text-2xl">×</button>

        <h2 className="text-xl font-bold mb-6">Nuevo Elemento de Servicio</h2>

        {/* Duración */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-zinc-300 block mb-2">Duración - Minutos</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={minutos}
                onChange={(e) => setMinutos(Number(e.target.value))}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex flex-col">
                <button onClick={() => setMinutos(minutos + 1)} className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded-t">▲</button>
                <button onClick={() => setMinutos(Math.max(0, minutos - 1))} className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded-b">▼</button>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-300 block mb-2">Duración - Segundos</label>
            <input
              type="number"
              min={0}
              max={59}
              value={segundos}
              onChange={(e) => setSegundos(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Tipo segmented control */}
        <div className="mb-6">
          <label className="text-sm text-zinc-300 block mb-2">Tipo</label>
          <div className="grid grid-cols-4 border border-orange-700 rounded-md overflow-hidden">
            {tipos.map((t) => (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={`py-2 text-sm transition-colors ${tipo === t.id ? "bg-orange-500 text-white" : "text-orange-400 hover:bg-zinc-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nombre */}
        <div className="mb-6">
          <label className="text-sm text-zinc-300 block mb-2">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Notas */}
        <div className="mb-6">
          <label className="text-sm text-zinc-300 block mb-2">Notas</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={5}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-700">
          <button onClick={() => alert("cancel")} className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded-md">
            Cancelar
          </button>
          <button onClick={() => alert("guardar")} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}