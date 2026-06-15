import { motion, AnimatePresence } from "framer-motion";

interface Member {
  id: string;
  name: string;
}

export function AssignPersonModal({
  open,
  onClose,
  onAssign,
  members,
}: {
  open: boolean;
  onClose: () => void;
  onAssign: (personId: string | null, personName?: string) => void;
  members: Member[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[60vh] overflow-auto p-4"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
              Asignar persona
            </h3>

            {members.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                Sin miembros en este equipo
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                {members.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onAssign(m.id, m.name)}
                    className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}

            <hr className="my-3 border-slate-200 dark:border-slate-700" />

            <button
              onClick={() => onAssign(null)}
              className="w-full py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              Desasignar
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 mt-1 rounded-xl text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancelar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}