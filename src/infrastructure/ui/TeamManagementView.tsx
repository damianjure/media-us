import { Link } from "react-router-dom";
import { ArrowLeft, Plus, ChevronRight } from "lucide-react";

const teams = [
  { name: "Alabanza", members: 4, roles: ["Vocalista", "Director"] },
  { name: "Músicos", members: 5, roles: ["Guitarra", "Bajo", "Batería", "Teclado"] },
  { name: "Audio", members: 2, roles: ["Sonido", "Monitor"] },
  { name: "Multimedia", members: 2, roles: ["Proyección", "Iluminación"] },
  { name: "Anfitriones", members: 3, roles: ["Anfitrión", "Coordinador"] },
];

export function TeamManagementView() {
  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950 pb-20">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <Link to="/app" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-base font-semibold text-slate-900 dark:text-white flex-1">Equipos</h1>
        <button className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
        </button>
      </header>
      <div className="p-4 flex flex-col gap-3">
        {teams.map((team) => (
          <div
            key={team.name}
            className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 flex items-center justify-between cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{team.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{team.members} miembros · {team.roles.length} roles</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {team.roles.map((role) => (
                  <span key={role} className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}