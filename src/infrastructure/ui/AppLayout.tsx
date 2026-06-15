import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Calendar, Grid3X3, List, Users, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "./useAuth";

const tabs = [
  { to: "/app", icon: Calendar, label: "Calendario", end: true },
  { to: "/app/matrix", icon: Grid3X3, label: "Matriz" },
  { to: "/app/services", icon: List, label: "Servicios" },
  { to: "/app/people", icon: Users, label: "Personas" },
];

export function AppLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col h-dvh bg-slate-50 dark:bg-slate-950">
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-safe">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          Media Us
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
            DJ
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-xl p-4 rounded-t-2xl max-h-[70vh] overflow-auto"
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Menú
              </h3>
              <nav className="flex flex-col gap-1">
                {[
                  { to: "/teams", label: "Equipos" },
                  { to: "/areas", label: "Áreas" },
                  { to: "/templates", label: "Templates" },
                  { to: "/proximos", label: "Próximos" },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </NavLink>
                ))}
                <hr className="my-2 border-slate-200 dark:border-slate-700" />
                <NavLink
                  to="/app"
                  className="px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Configuración
                </NavLink>
                <button
                  onClick={signOut}
                  className="px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 text-left"
                >
                  Cerrar sesión
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="flex items-center justify-around py-2 px-1 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pb-safe">
        {tabs.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs transition-colors min-h-[44px] justify-center active:scale-95 ${
                  isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 dark:text-slate-500"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}