import { useState } from "react";
import { Search, Plus, Users } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { PersonForm } from "./PersonForm";
import { createPerson } from "../../domain/models/Person";

export function PeopleView() {
  const { people, addPerson } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = query
    ? people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : people;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar persona..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
        <button onClick={() => setShowForm(true)} className="p-2.5 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <PersonForm onSubmit={(data) => {
              const p = createPerson(data);
              addPerson(p);
              setShowForm(false);
            }} />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">
            {people.length === 0 ? "No hay personas. Agregá la primera." : "Sin resultados."}
          </p>
          {people.length === 0 && (
            <button onClick={() => setShowForm(true)} className="mt-4 text-sm text-indigo-600 font-medium">Agregar persona</button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{p.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.email}</p>
              </div>
              {p.teamRoles.length > 0 && (
                <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {p.teamRoles[0].roleName}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}