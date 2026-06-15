import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const services = [
  { id: 1, date: "Dom 1 Jun", time: "10:00", type: "Domingo", status: "Confirmado", accepted: 8, declined: 1, pending: 3 },
  { id: 2, date: "Dom 8 Jun", time: "10:00", type: "Domingo", status: "Pendiente", accepted: 5, declined: 0, pending: 7 },
  { id: 3, date: "Dom 15 Jun", time: "10:00", type: "Domingo", status: "Confirmado", accepted: 10, declined: 0, pending: 2 },
  { id: 4, date: "Sáb 21 Jun", time: "18:00", type: "Especial", status: "Borrador", accepted: 0, declined: 0, pending: 0 },
];

const statusColors: Record<string, string> = {
  Confirmado: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Pendiente: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Borrador: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

export function ServicesListView() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Servicios</h2>
      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <Link
            key={s.id}
            to={`/service/${s.id}`}
            className="block bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-indigo-300 dark:hover:ring-indigo-700 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{s.type}</span>
                <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[s.status]}`}>
                  {s.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.date} • {s.time}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{s.accepted} ✓</span>
              <span className="text-xs font-medium text-red-500">{s.declined} ✗</span>
              <span className="text-xs font-medium text-amber-500">{s.pending} ⏳</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}