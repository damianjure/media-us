import { useState } from "react";

type Step = 1 | 2;

export function CrearNuevoServicioWireframe() {
  const [step, setStep] = useState<Step>(1);
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 text-zinc-100 rounded-2xl w-full max-w-3xl p-8 relative">
        <button className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 text-2xl">×</button>

        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Servicio</h1>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-orange-500 text-white" : "bg-zinc-700"}`}>1</div>
          <div className="flex-1 h-0.5 bg-zinc-700" />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-orange-500 text-white" : "bg-zinc-700"}`}>2</div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="border border-zinc-700 rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">[icon]</div>
              <div className="flex-1">
                <label className="text-sm text-zinc-400 block mb-1">Tipo*</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100">
                  <option value="">Tipo</option>
                  <option value="domingo">Domingo</option>
                  <option value="especial">Especial</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm text-zinc-400 block mb-1">Nombre*</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Servicio Domingo" className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100" />
              </div>
            </div>

            <div className="border border-zinc-700 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-5 h-5 bg-zinc-800 rounded">[📅]</span>
                <span className="font-semibold">Fecha y hora</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 block mb-1">Fecha*</label>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 flex items-center justify-between text-zinc-500">
                    <span>dd/mm/aaaa</span>
                    <span>[📅]</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-400 block mb-1">De*</label>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 flex items-center justify-between text-zinc-500">
                    <span>--:-- --</span>
                    <span>[🕐]</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-400 block mb-1">A*</label>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 flex items-center justify-between text-zinc-500">
                    <span>--:-- --</span>
                    <span>[🕐]</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span>[🕐]</span>
                <span>Usar último horario de este tipo</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">Ubicación</label>
              <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ej: Auditorio Principal" className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100" />
            </div>

            <div className="border border-zinc-700 rounded-xl p-6 space-y-3">
              <div className="font-semibold">Banner <span className="text-zinc-500 font-normal">(opcional)</span></div>
              <p className="text-sm text-zinc-400">Elige una plantilla del catálogo o sube tu propia imagen (~1920×400 px).</p>
              <button className="border border-zinc-700 rounded-md px-4 py-2 text-zinc-300 flex items-center gap-2 hover:bg-zinc-800">
                <span>[🖼️]</span>
                Elegir banner
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
              <button onClick={() => setStep(1)} className="px-4 py-2 border border-zinc-700 rounded-md flex items-center gap-2 text-zinc-300">
                <span>‹</span> Anterior
              </button>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-4 py-2 border border-zinc-700 rounded-md flex items-center gap-2 text-zinc-300">
                  Añadir áreas <span>›</span>
                </button>
                <button onClick={() => alert("Crear servicio")} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold">
                  Crear servicio
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-zinc-400">Paso 2: Seleccionar áreas que van a participar (placeholder).</p>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
              <button onClick={() => setStep(1)} className="px-4 py-2 border border-zinc-700 rounded-md flex items-center gap-2 text-zinc-300">
                <span>‹</span> Anterior
              </button>
              <button onClick={() => alert("Crear servicio")} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold">
                Crear servicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}