import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Layers, ChevronRight } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { ServiceWizard } from "./ServiceWizard";
import { createTemplate, type ServiceTemplate } from "../../domain/models/ServiceTemplate";

export function TemplatesView() {
  const { templates, areas, addTemplate, addService } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<ServiceTemplate | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const handleCreateTemplate = () => {
    if (!name) return;
    addTemplate(createTemplate({ name, areaIds: areas.slice(0, 2).map((a) => a.id) }));
    setName("");
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Templates</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Plantillas para crear servicios rápidamente</p>
        </div>
        <button onClick={() => setShowForm(true)} className="p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Nuevo Template</h3>
            <input
              placeholder="Nombre del template"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm text-slate-500">Cancelar</button>
              <button onClick={handleCreateTemplate} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">Crear</button>
            </div>
          </div>
        </div>
      )}

      {showWizard && selectedTemplate && (
        <ServiceWizard
          defaultDate={new Date().toISOString().slice(0, 10)}
          selectedAreaIds={selectedTemplate.areaIds}
          onClose={() => { setShowWizard(false); setSelectedTemplate(null); }}
          onSubmit={(s) => { addService(s); setShowWizard(false); setSelectedTemplate(null); }}
        />
      )}

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <Layers className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No hay templates. Creá uno para agilizar la creación de servicios.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {templates.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.areaIds.length} áreas · {t.orderItems.length} items
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedTemplate(t); setShowWizard(true); }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900"
                >
                  Usar template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}