import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const sampleServices = [3, 9, 16, 23, 30];

export function CalendarView() {
  return (
    <div className="p-4 pb-20">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Junio 2026
        </h2>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-slate-400 dark:text-slate-500 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for alignment */}
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const hasService = sampleServices.includes(day);
          return (
            <motion.div
              key={day}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm cursor-pointer transition-colors ${
                hasService
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium ring-1 ring-indigo-200 dark:ring-indigo-800"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {day}
              {hasService && (
                <span className="text-[10px] text-indigo-400 dark:text-indigo-500">
                  Servicio
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* FAB */}
      <Link
        to="/service/new"
        className="fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
}