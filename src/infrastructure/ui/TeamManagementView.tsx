import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { useState } from "react";
import { TeamForm } from "./TeamForm";
import { createTeam } from "../../domain/models/Team";

export function TeamManagementView() {
  const { teams, addTeam } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950 pb-20">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <Link to="/app" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-base font-semibold flex-1">Equipos</h1>
        <button onClick={() => setShowForm(true)} className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
        </button>
      </header>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold p-4 border-b border-slate-200 dark:border-slate-800">Nuevo Equipo</h3>
            <TeamForm onSubmit={(data) => {
              addTeam(createTeam({
                name: data.name,
                roles: data.roles.map((r, i) => ({ id: `r-${i}`, name: r.name })),
              }));
              setShowForm(false);
            }} />
          </div>
        </div>
      )}

      <div className="p-4">
        {teams.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">No hay equipos. Creá el primero.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {teams.map((team) => (
              <div key={team.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <h3 className="text-sm font-semibold">{team.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {team.roles.map((role) => (
                    <span key={role.id} className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}