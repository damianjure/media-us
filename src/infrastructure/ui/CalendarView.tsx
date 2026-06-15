import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "./useAppStore";
import { ServiceWizard } from "./ServiceWizard";

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const weekDays = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

export function CalendarView() {
  const { services, addService } = useAppStore();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5); // June
  const [showWizard, setShowWizard] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const servicesOnDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return services.filter((s) => s.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setShowWizard(true);
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  return (
    <div className="p-4 pb-20">
      {showWizard && (
        <ServiceWizard
          defaultDate={selectedDate}
          onClose={() => setShowWizard(false)}
          onSubmit={(s) => { addService(s); setShowWizard(false); }}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {MONTHS[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-slate-400 dark:text-slate-500 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
        {days.map((day) => {
          const svcs = servicesOnDate(day);
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm cursor-pointer transition-colors ${
                svcs.length > 0
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium ring-1 ring-indigo-200 dark:ring-indigo-800"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {day}
              {svcs.length > 0 && (
                <span className="text-[10px] text-indigo-400 dark:text-indigo-500">{svcs.length}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}