import { useState } from "react";

interface PersonFormData {
  name: string;
  email: string;
}

export function PersonForm({
  onSubmit,
  initial,
}: {
  onSubmit: (data: PersonFormData) => void;
  initial?: Partial<PersonFormData>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "El nombre es requerido";
    if (!email) newErrors.email = "El email es requerido";
    else if (!email.includes("@")) newErrors.email = "Email inválido";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors active:scale-[0.98]">
        Guardar
      </button>
    </form>
  );
}