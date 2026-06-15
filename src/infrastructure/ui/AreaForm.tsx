import { useState } from "react";
import type { Area, AreaColor, AreaIcon } from "../../domain/models/Area";

const COLORS: { value: AreaColor; bg: string; label: string }[] = [
  { value: "purple", bg: "bg-purple-500", label: "Púrpura" },
  { value: "yellow", bg: "bg-yellow-500", label: "Amarillo" },
  { value: "orange", bg: "bg-orange-500", label: "Naranja" },
  { value: "green", bg: "bg-green-500", label: "Verde" },
  { value: "blue", bg: "bg-blue-500", label: "Azul" },
  { value: "red", bg: "bg-red-500", label: "Rojo" },
  { value: "pink", bg: "bg-pink-500", label: "Rosa" },
];

const ICONS: AreaIcon[] = ["music", "mic", "video", "lightbulb", "user", "settings", "heart"];

export function AreaForm({
  onSubmit,
  initial,
}: {
  onSubmit: (data: { name: string; description: string; color: AreaColor; icon: AreaIcon }) => void;
  initial?: Partial<Area>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [color, setColor] = useState<AreaColor>(initial?.color ?? "purple");
  const [icon, setIcon] = useState<AreaIcon>(initial?.icon ?? "music");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) { setErrors({ name: "El nombre es requerido" }); return; }
    onSubmit({ name, description, color, icon });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="areaName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre</label>
        <input id="areaName" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="areaDesc" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción</label>
        <input id="areaDesc" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
      </div>
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</span>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map((c) => (
            <button key={c.value} type="button" onClick={() => setColor(c.value)}
              className={`w-10 h-10 rounded-full ${c.bg} ${color === c.value ? "ring-2 ring-offset-2 ring-slate-900 dark:ring-white" : ""}`}
              aria-label={c.label} />
          ))}
        </div>
      </div>
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Icono</span>
        <div className="flex gap-2 flex-wrap">
          {ICONS.map((i) => (
            <button key={i} type="button" onClick={() => setIcon(i)}
              className={`px-3 py-2 rounded-lg text-sm ${icon === i ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
              {i}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
        Guardar
      </button>
    </form>
  );
}