import { motion } from "framer-motion";

const teams = ["Alabanza", "Músicos", "Audio", "Multimedia", "Anfitriones"];
const dates = ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"];

const assignments: Record<string, Record<string, string>> = {
  Alabanza: { "Jun 8": "María G.", "Jun 22": "Carlos R." },
  Músicos: { "Jun 1": "Juan P.", "Jun 15": "Pedro L.", "Jun 29": "Ana M." },
  Audio: { "Jun 15": "Diego S." },
  Multimedia: { "Jun 8": "Lucía F." },
  Anfitriones: { "Jun 1": "Sofía A.", "Jun 29": "Martín D." },
};

export function MatrixView() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Matriz de Servicios
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-50 dark:bg-slate-950 p-2 text-left text-xs font-medium text-slate-400 w-28">
                Equipo
              </th>
              {dates.map((date) => (
                <th
                  key={date}
                  className="p-2 text-center text-xs font-medium text-slate-400 min-w-24"
                >
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team}>
                <td className="sticky left-0 bg-slate-50 dark:bg-slate-950 p-2 text-sm font-medium text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  {team}
                </td>
                {dates.map((date) => {
                  const person = assignments[team]?.[date];
                  return (
                    <td
                      key={date}
                      className="p-1 border-t border-slate-100 dark:border-slate-800"
                    >
                      {person ? (
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs rounded-lg px-2 py-1.5 text-center cursor-pointer ring-1 ring-indigo-200 dark:ring-indigo-800"
                        >
                          {person}
                        </motion.div>
                      ) : (
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className="border border-dashed border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 dark:text-slate-600 text-center cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700"
                        >
                          Asignar
                        </motion.div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Tocá una celda para asignar o cambiar persona
      </p>
    </div>
  );
}