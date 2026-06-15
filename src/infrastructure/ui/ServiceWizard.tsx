import { useState } from "react";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";

interface ServiceWizardProps {
  onSubmit: (data: ReturnType<typeof createService>) => void;
  onClose: () => void;
  defaultDate?: string;
}

const TIPOS = ["Domingo", "Especial", "Conferencia", "Vigilia", "Ensayo"];

export function ServiceWizard({ onSubmit, onClose, defaultDate }: ServiceWizardProps) {
  const { areas } = useAppStore();
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(defaultDate ?? "");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (id: string) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (!fecha || !desde) {
      // validation handled elsewhere - create with defaults
    }
    const s = createService({
      date: fecha || new Date().toISOString().slice(0, 10),
      time: desde || "10:00",
      endTime: hasta,
      typeId: tipo || "Domingo",
      location: ubicacion,
      areaIds: selectedAreas,
      notes: nombre,
    });
    onSubmit(s);
    onClose();
  };

  const colorClass: Record<string, string> = {
    purple: "bg-purple-500", yellow: "bg-yellow-500", orange: "bg-orange-500",
    green: "bg-green-500", blue: "bg-blue-500", red: "bg-red-500", pink: "bg-pink-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl max-h-[90vh] overflow-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl z-10">×</button>

        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">Crear Nuevo Servicio</h1>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-zinc-700 text-slate-500"}`}>1</div>
            <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-indigo-600" : "bg-slate-200 dark:bg-zinc-700"}`} />
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-zinc-700 text-slate-500"}`}>2</div>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-zinc-800">
                <div>
                  <label htmlFor="wiz-tipo" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Tipo</label>
                  <select id="wiz-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm">
                    <option value="">Tipo</option>
                    {TIPOS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="wiz-nombre" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Nombre</label>
                  <input id="wiz-nombre" placeholder="Ej: Servicio Domingo" value={nombre} onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>📅</span> Fecha y hora
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="wiz-fecha" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Fecha</label>
                    <input id="wiz-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="wiz-desde" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">De</label>
                    <input id="wiz-desde" type="time" value={desde} onChange={(e) => setDesde(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="wiz-hasta" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">A</label>
                    <input id="wiz-hasta" type="time" value={hasta} onChange={(e) => setHasta(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="wiz-ubic" className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Ubicación</label>
                <input id="wiz-ubic" placeholder="Ej: Auditorio Principal" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800">
                <div className="font-semibold text-sm mb-2">Banner <span className="text-slate-400 font-normal">(opcional)</span></div>
                <p className="text-xs text-slate-400 mb-3">Elige una plantilla del catálogo (1920×400 px)</p>
                <button className="border border-slate-200 dark:border-zinc-700 rounded-md px-4 py-2 text-sm flex items-center gap-2 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                  🖼️ Elegir banner
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-700">
                <button className="px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-md text-sm flex items-center gap-2 text-slate-400" disabled>
                  ‹ Anterior
                </button>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)}
                    className="px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-md text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    Añadir áreas ›
                  </button>
                  <button onClick={handleSubmit}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold">
                    Crear servicio
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold mb-3">Seleccionar áreas</h3>
                <p className="text-xs text-slate-400 mb-4">Selecciona las áreas que van a participar en este servicio</p>
                {areas.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">No hay áreas creadas. <br />Creá áreas primero desde /areas</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {areas.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => toggleArea(area.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                          selectedAreas.includes(area.id)
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                            : "border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${colorClass[area.color] || "bg-slate-400"} flex items-center justify-center text-white text-xs`}>
                          {area.icon?.slice(0, 3) || area.name[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{area.name}</p>
                          <p className="text-xs text-slate-400">{area.memberIds?.length ?? 0} miembros</p>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedAreas.includes(area.id) ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 dark:border-zinc-600"}`}>
                          {selectedAreas.includes(area.id) && "✓"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-700">
                <button onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-md text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800">
                  ‹ Anterior
                </button>
                <button onClick={handleSubmit}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold">
                  Crear servicio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}