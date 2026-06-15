import { useState } from "react";

interface ServiceFormData {
  date: string;
  time: string;
  typeId: string;
  notes: string;
}

export function ServiceForm({
  onSubmit,
  initial,
}: {
  onSubmit: (data: ServiceFormData) => void;
  initial?: Partial<ServiceFormData>;
}) {
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [typeId, setTypeId] = useState(initial?.typeId ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!date) newErrors.date = "La fecha es requerida";
    if (!time) newErrors.time = "La hora es requerida";
    if (!typeId) newErrors.typeId = "El tipo es requerido";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit({ date, time, typeId, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fecha</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hora</label>
        <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de servicio</label>
        <select id="type" value={typeId} onChange={(e) => setTypeId(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          <option value="">Seleccionar...</option>
          <option value="Domingo">Domingo</option>
          <option value="Especial">Especial</option>
          <option value="Conferencia">Conferencia</option>
        </select>
        {errors.typeId && <p className="text-red-500 text-xs mt-1">{errors.typeId}</p>}
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notas</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
        Guardar
      </button>
    </form>
  );
}