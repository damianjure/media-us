import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Plus, Copy } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { ServiceWizard } from "./ServiceWizard";
import { createService } from "../../domain/models/Service";

export function ServicesListView() {
  const { services, addService, invitations } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const handleClone = (source: typeof services[0]) => {
    const nextWeek = new Date(source.date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    addService(createService({
      date: nextWeek.toISOString().slice(0, 10),
      time: source.time,
      endTime: source.endTime,
      typeId: source.typeId,
      location: source.location,
      areaIds: source.areaIds,
      notes: source.notes,
    }));
  };

  const statusColors: Record<string, string> = {
    draft: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    cancelled: "bg-red-100 text-red-600",
  };

  const statusLabel: Record<string, string> = {
    draft: "Borrador",
    pending: "Pendiente",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
  };

  const getCounts = (serviceId: string) => {
    const invs = invitations.filter((i) => i.serviceId === serviceId);
    return {
      accepted: invs.filter((i) => i.status === "accepted").length,
      declined: invs.filter((i) => i.status === "declined").length,
      pending: invs.filter((i) => i.status === "pending").length,
    };
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Servicios</h2>
        <button onClick={() => setShowForm(true)} className="p-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 transition-transform" aria-label="Crear servicio">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && <ServiceWizard onClose={() => setShowForm(false)} onSubmit={(s) => { addService(s); setShowForm(false); }} />}

      {services.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-12">No hay servicios. Creá tu primer servicio.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {[...services].reverse().map((s) => {
            const cnt = getCounts(s.id);
            return (
              <Link
                key={s.id}
                to={`/service/${s.id}`}
                className="block bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-indigo-300 dark:hover:ring-indigo-700 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {s.typeId}
                    </span>
                    <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[s.status]}`}>
                      {statusLabel[s.status]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {s.date} • {s.time}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-medium text-emerald-600">{cnt.accepted} ✓</span>
                  <span className="text-xs font-medium text-red-500">{cnt.declined} ✗</span>
                  <span className="text-xs font-medium text-amber-500">{cnt.pending} ⏳</span>
                </div>
                <button onClick={(e) => { e.preventDefault(); handleClone(s); }}
                  className="mt-2 flex items-center gap-1 text-xs text-indigo-600 font-medium">
                  <Copy className="w-3 h-3" /> Clonar
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}