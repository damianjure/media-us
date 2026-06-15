import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, GripVertical, Music, Pause, Type, Film } from "lucide-react";
import { Reorder } from "framer-motion";
import { useAppStore } from "./useAppStore";
import { createAssignment } from "../../domain/models/ServiceAssignment";
import { createServiceOrder } from "../../domain/models/ServiceOrder";

const typeIcons: Record<string, typeof Music> = { song: Music, space: Pause, header: Type, media: Film };
const colorClass: Record<string, string> = {
  purple: "bg-purple-500", yellow: "bg-yellow-500", orange: "bg-orange-500",
  green: "bg-green-500", blue: "bg-blue-500", red: "bg-red-500", pink: "bg-pink-500",
};

export function ServiceDetailView() {
  const { id } = useParams<{ id: string }>();
  const { services, areas, people, assignments, addAssignment, updateAssignmentStatus, saveOrder, getOrder } = useAppStore();

  const service = services.find((s) => s.id === id);
  if (!service) return <div className="p-8 text-center"><p className="text-slate-400">Servicio no encontrado</p><Link to="/app/services" className="text-indigo-600 text-sm mt-2 block">Volver</Link></div>;

  const serviceAreas = areas.filter((a) => service.areaIds.includes(a.id));
  const serviceAssignments = assignments.filter((a) => a.serviceId === service.id);
  const order = getOrder(service.id) ?? createServiceOrder({ serviceId: service.id, items: [] });

  const getAreaAssignments = (areaId: string) => serviceAssignments.filter((a) => a.areaId === areaId);

  const handleAssign = (areaId: string, personId: string) => {
    const a = createAssignment({ serviceId: service.id, areaId, personId, roleId: "default" });
    addAssignment(a);
  };

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950 pb-20">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <Link to="/app/services" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-semibold">{service.typeId} - {service.date}</h1>
          <p className="text-xs text-slate-500">{service.time}{service.endTime ? ` → ${service.endTime}` : ""}{service.location ? ` · ${service.location}` : ""}</p>
        </div>
      </header>

      {/* Area sections with assignments */}
      {serviceAreas.length > 0 && (
        <div className="p-4 space-y-3">
          {serviceAreas.map((area) => {
            const areaAssigns = getAreaAssignments(area.id);
            const confirmed = areaAssigns.filter((a) => a.status === "accepted").length;
            return (
              <div key={area.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full ${colorClass[area.color] || "bg-slate-400"} flex items-center justify-center text-white text-xs`}>
                    {area.icon?.slice(0, 3) || area.name[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{area.name}</h3>
                    <p className="text-xs text-slate-400">{confirmed}/{areaAssigns.length} confirmados</p>
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleAssign(area.id, e.target.value);
                    }}
                    value=""
                    className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 bg-white dark:bg-zinc-800"
                  >
                    <option value="">+ Asignar</option>
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                {areaAssigns.length > 0 ? (
                  <div className="flex flex-col gap-1 pl-11">
                    {areaAssigns.map((a) => {
                      const person = people.find((p) => p.id === a.personId);
                      return (
                        <div key={a.id} className="flex items-center justify-between text-xs">
                          <span>{person?.name ?? a.personId}</span>
                          <select
                            value={a.status}
                            onChange={(e) => updateAssignmentStatus(a.id, e.target.value)}
                            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-1 py-0.5"
                          >
                            <option value="pending">⏳ Pendiente</option>
                            <option value="accepted">✓ Confirmado</option>
                            <option value="declined">✗ Declinado</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 pl-11">Sin asignaciones</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Order of service */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Orden del Servicio</h2>
          <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
            <Plus className="w-3.5 h-3.5" /> Agregar
          </button>
        </div>
        <Reorder.Group axis="y" values={order.items} onReorder={(items) => saveOrder({ ...order, items })} className="flex flex-col gap-1.5">
          {order.items.map((item) => {
            const Icon = typeIcons[item.type] ?? Music;
            return (
              <Reorder.Item key={item.id} value={item} className="list-none">
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm flex-1">{item.label}</span>
                  <span className="text-[10px] text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{item.type}</span>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    </div>
  );
}