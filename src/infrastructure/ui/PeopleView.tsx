import { Search, Plus } from "lucide-react";

const people = [
  { name: "María García", role: "Vocalista", team: "Alabanza" },
  { name: "Carlos Rodríguez", role: "Director", team: "Alabanza" },
  { name: "Juan Pérez", role: "Guitarra", team: "Músicos" },
  { name: "Diego Sánchez", role: "Sonido", team: "Audio" },
];

export function PeopleView() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar persona..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
        <button className="p-2.5 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {people.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{p.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{p.role} · {p.team}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {p.team}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}