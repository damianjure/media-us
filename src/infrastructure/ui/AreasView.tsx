import { useState } from "react";
import { Plus, Users, ChevronRight } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { AreaForm } from "./AreaForm";
import { createArea, type AreaColor } from "../../domain/models/Area";

const colorClass: Record<AreaColor, string> = {
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
};

export function AreasView() {
  const { areas, addArea, people } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  const selectedArea = areas.find((a) => a.id === selectedAreaId);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Áreas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Las partes del servicio (Alabanza, Audio, etc.)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto overscroll-contain" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />
            <h3 className="text-base font-semibold px-4 pt-3">Nueva Área</h3>
            <AreaForm onSubmit={(data) => {
              addArea(createArea(data));
              setShowForm(false);
            }} />
          </div>
        </div>
      )}

      {/* Members modal */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setSelectedAreaId(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[70vh] overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${colorClass[selectedArea.color]}`} />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{selectedArea.name}</h3>
                <p className="text-xs text-slate-500">{selectedArea.memberIds.length} miembros</p>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-slate-500 mb-2">MIEMBROS</h4>
            {people.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No hay personas registradas todavía</p>
            ) : (
              <div className="flex flex-col gap-1">
                {people.map((p) => {
                  const isMember = selectedArea.memberIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (isMember) {
                          // would need to wire addMember/removeMember in the store - simplified for now
                        }
                      }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xs font-semibold text-indigo-600">
                          {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-200">{p.name}</span>
                      </div>
                      <span className={`text-xs ${isMember ? "text-emerald-500" : "text-slate-400"}`}>
                        {isMember ? "Miembro" : "Agregar"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            <button onClick={() => setSelectedAreaId(null)} className="w-full mt-4 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-600">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {areas.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-12">No hay áreas. Creá la primera.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {areas.map((area) => (
            <div key={area.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${colorClass[area.color]} flex items-center justify-center text-white text-xs`}>
                  {area.icon.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{area.name}</h3>
                  {area.description && <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{area.description}</p>}
                </div>
                <button onClick={() => setSelectedAreaId(area.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <Users className="w-3 h-3" /> {area.memberIds.length}
                </button>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}