import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Copy } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { createService } from "../../domain/models/Service";
import { ServiceWizard } from "./ServiceWizard";

export function ProximosServiciosView() {
  const { services, addService } = useAppStore();
  const [showWizard, setShowWizard] = useState(false);

  const sorted = [...services].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const handleClone = (source: typeof services[0]) => {
    const nextWeek = new Date(source.date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const newDate = nextWeek.toISOString().slice(0, 10);
    addService(createService({
      date: newDate,
      time: source.time,
      endTime: source.endTime,
      typeId: source.typeId,
      location: source.location,
      bannerUrl: source.bannerUrl,
      areaIds: source.areaIds,
      notes: source.notes,
    }));
  };

  return (
    <div className="p-4">
      {showWizard && (
        <ServiceWizard
          onClose={() => setShowWizard(false)}
          onSubmit={(s) => { addService(s); setShowWizard(false); }}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Próximos Servicios</h2>
          <p className="text-xs text-slate-500">{sorted.length} servicios programados</p>
        </div>
        <button onClick={() => setShowWizard(true)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium">
          + Nuevo
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No hay servicios próximos</p>
          <button onClick={() => setShowWizard(true)} className="mt-4 text-sm text-indigo-600 font-medium">Crear el primero</button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((s) => (
            <Link key={s.id}
              to={`/service/${s.id}`}
              className="block bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-indigo-300 dark:hover:ring-indigo-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{s.typeId}</span>
                <span className="text-xs text-slate-400">{s.date} · {s.time}</span>
              </div>
              {s.location && (
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                  <MapPin className="w-3 h-3" /> {s.location}
                </div>
              )}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button onClick={(e) => { e.preventDefault(); handleClone(s); }}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                  <Copy className="w-3 h-3" /> Clonar
                </button>
                <button onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 ml-auto">
                  Ver →
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}