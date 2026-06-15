import { useAppStore } from "./useAppStore";
import { AssignPersonModal } from "./AssignPersonModal";
import { useState } from "react";

const colorClass: Record<string, string> = {
  purple: "bg-purple-500", yellow: "bg-yellow-500", orange: "bg-orange-500",
  green: "bg-green-500", blue: "bg-blue-500", red: "bg-red-500", pink: "bg-pink-500",
};

export function MatrixView() {
  const { areas, services, assignments } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [cellData, setCellData] = useState<{ areaId: string; date: string } | null>(null);

  const dates = [...new Set(services.map((s) => s.date))].sort().slice(0, 5);
  if (dates.length === 0) {
    return (
      <div className="p-4 text-center py-16">
        <p className="text-slate-400 text-sm">No hay servicios programados</p>
        <p className="text-xs text-slate-500 mt-1">Crea servicios desde el calendario o la lista</p>
      </div>
    );
  }

  const getAssignment = (areaId: string, date: string) => {
    const service = services.find((s) => s.date === date);
    if (!service) return null;
    return assignments.find((a) => a.serviceId === service.id && a.areaId === areaId) ?? null;
  };

  const getPersonName = (personId: string) => {
    return useAppStore.getState().people.find((p) => p.id === personId)?.name ?? personId;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Matriz de Servicios</h2>

      {modalOpen && cellData && (
        <AssignPersonModal
          open={true}
          onClose={() => setModalOpen(false)}
          onAssign={(personId) => {
            if (personId) {
              const service = services.find((s) => s.date === cellData.date);
              if (service) {
                const store = useAppStore.getState();
                store.addAssignment({
                  id: crypto.randomUUID(),
                  serviceId: service.id,
                  areaId: cellData.areaId,
                  personId,
                  roleId: "default",
                  status: "pending",
                });
              }
            }
            setModalOpen(false);
          }}
          members={useAppStore.getState().people.map((p) => ({ id: p.id, name: p.name }))}
        />
      )}

      <div className="overflow-x-auto -mx-4 px-4 overscroll-x-contain">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-50 dark:bg-slate-950 p-2 text-left text-xs font-medium text-slate-400 w-28">Área</th>
              {dates.map((date) => (
                <th key={date} className="p-2 text-center text-xs font-medium text-slate-400 min-w-24">{date.slice(5)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id}>
                <td className="sticky left-0 bg-slate-50 dark:bg-slate-950 p-2 text-sm font-medium text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colorClass[area.color] || "bg-slate-400"}`} />
                    {area.name}
                  </div>
                </td>
                {dates.map((date) => {
                  const assign = getAssignment(area.id, date);
                  return (
                    <td key={date} className="p-1 border-t border-slate-100 dark:border-slate-800">
                      {assign ? (
                        <div className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs rounded-lg px-2 py-1.5 text-center cursor-pointer ring-1 ring-indigo-200 dark:ring-indigo-800">
                          {getPersonName(assign.personId)}
                        </div>
                      ) : (
                        <div
                          onClick={() => setCellData({ areaId: area.id, date })}
                          className="border border-dashed border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 dark:text-slate-600 text-center cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700"
                        >
                          Asignar
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center sm:hidden">← deslizá para ver más →</p>
    </div>
  );
}