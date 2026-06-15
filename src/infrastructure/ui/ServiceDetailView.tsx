import { useState } from "react";
import { Reorder } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, GripVertical, Music, Pause, Type, Film } from "lucide-react";

const typeIcons = { song: Music, space: Pause, header: Type, media: Film };

interface OrderItem {
  id: string;
  type: "song" | "space" | "header" | "media";
  label: string;
}

const initialItems: OrderItem[] = [
  { id: "1", type: "header", label: "Bienvenida" },
  { id: "2", type: "song", label: "Grande es Dios" },
  { id: "3", type: "song", label: "Rey de Gloria" },
  { id: "4", type: "space", label: "Anuncios" },
  { id: "5", type: "song", label: "Santo Espíritu" },
  { id: "6", type: "header", label: "Predicación" },
];

export function ServiceDetailView() {
  const [items, setItems] = useState<OrderItem[]>(initialItems);

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950 pb-20">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <Link to="/app/services" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-slate-900 dark:text-white">Domingo 15 Jun</h1>
          <p className="text-xs text-slate-500">10:00 · Confirmado</p>
        </div>
      </header>

      <div className="p-4 flex gap-3">
        {[
          { label: "Aceptados", value: "8", color: "text-emerald-600" },
          { label: "Declinados", value: "1", color: "text-red-500" },
          { label: "Pendientes", value: "3", color: "text-amber-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex-1 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-medium mb-1">{label}</p>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Orden del Servicio</h2>
          <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
            <Plus className="w-3.5 h-3.5" /> Agregar
          </button>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-1.5">
          {items.map((item) => {
            const Icon = typeIcons[item.type];
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