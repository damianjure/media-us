import { useState } from "react";

interface TeamFormData {
  name: string;
  roles: { name: string }[];
}

export function TeamForm({
  onSubmit,
  initial,
}: {
  onSubmit: (data: TeamFormData) => void;
  initial?: Partial<TeamFormData>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [roles, setRoles] = useState(initial?.roles ?? []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRole = () => setRoles([...roles, { name: "" }]);
  const removeRole = (i: number) => setRoles(roles.filter((_, idx) => idx !== i));
  const updateRole = (i: number, value: string) => {
    const updated = [...roles];
    updated[i] = { name: value };
    setRoles(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) { setErrors({ name: "El nombre es requerido" }); return; }
    onSubmit({ name, roles: roles.filter((r) => r.name) });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre del equipo</label>
        <input id="teamName" type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Roles</span>
          <button type="button" onClick={addRole} className="text-xs text-indigo-600 font-medium">Agregar rol</button>
        </div>
        {roles.map((role, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="Nombre del rol" value={role.name}
              onChange={(e) => updateRole(i, e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
            <button type="button" onClick={() => removeRole(i)} className="px-2 text-red-400 hover:text-red-600">✕</button>
          </div>
        ))}
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
        Guardar
      </button>
    </form>
  );
}