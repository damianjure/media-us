import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, GripVertical, Music, Pause, Type, Film, Send } from "lucide-react";
import { Reorder } from "framer-motion";
import { useAppStore } from "./useAppStore";
import { SendInvitations } from "../../application/use-cases/SendInvitations";
import { InvitationRepository } from "../firebase/invitation-repository";
import { createServiceOrder } from "../../domain/models/ServiceOrder";

const typeIcons: Record<string, typeof Music> = { song: Music, space: Pause, header: Type, media: Film };

export function ServiceDetailView() {
  const { id } = useParams<{ id: string }>();
  const { services, invitations, addInvitation, updateInvitationStatus, saveOrder, getOrder, people } = useAppStore();

  const service = services.find((s) => s.id === id);
  const repo = new InvitationRepository();
  const sendInvitations = new SendInvitations(repo);

  if (!service) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400">Servicio no encontrado</p>
        <Link to="/app/services" className="text-indigo-600 text-sm mt-2 block">Volver</Link>
      </div>
    );
  }

  const serviceInvites = invitations.filter((i) => i.serviceId === service.id);
  const accepted = serviceInvites.filter((i) => i.status === "accepted").length;
  const declined = serviceInvites.filter((i) => i.status === "declined").length;
  const pending = serviceInvites.filter((i) => i.status === "pending").length;
  const order = getOrder(service.id) ?? createServiceOrder({ serviceId: service.id, items: [] });

  const handleSendInvites = async () => {
    const personIds = people.slice(0, 3).map((p) => p.id);
    const invs = await sendInvitations.execute({ serviceId: service.id, personIds });
    invs.forEach((inv) => addInvitation(inv));
  };

  const statusLabel: Record<string, string> = {
    draft: "Borrador", pending: "Pendiente", confirmed: "Confirmado", cancelled: "Cancelado",
  };

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950 pb-20">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <Link to="/app/services" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-slate-900 dark:text-white">{service.typeId} - {service.date}</h1>
          <p className="text-xs text-slate-500">{service.time} · {statusLabel[service.status]}</p>
        </div>
      </header>

      <div className="p-4 flex gap-3">
        {[
          { label: "Aceptados", value: String(accepted), color: "text-emerald-600" },
          { label: "Declinados", value: String(declined), color: "text-red-500" },
          { label: "Pendientes", value: String(pending), color: "text-amber-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex-1 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-medium mb-1">{label}</p>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Invitaciones</h3>
            <button onClick={handleSendInvites} className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
              <Send className="w-3 h-3" /> Enviar
            </button>
          </div>
          {serviceInvites.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-2">No hay invitaciones enviadas</p>
          ) : (
            <div className="flex flex-col gap-1">
              {serviceInvites.map((inv) => {
                const person = people.find((p) => p.id === inv.personId);
                return (
                  <div key={inv.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300">{person?.name ?? inv.personId}</span>
                    <select
                      value={inv.status}
                      onChange={(e) => updateInvitationStatus(inv.id, e.target.value)}
                      className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 bg-white dark:bg-slate-800"
                    >
                      <option value="pending">⏳ Pendiente</option>
                      <option value="accepted">✓ Aceptado</option>
                      <option value="declined">✗ Declinado</option>
                    </select>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="px-4">
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
                  <span className="text-sm text-slate-700 dark:text-slate-200 flex-1">{item.label}</span>
                  <span className="text-[10px] text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{item.type}</span>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">Arrastrá los items para reordenar</p>
    </div>
  );
}