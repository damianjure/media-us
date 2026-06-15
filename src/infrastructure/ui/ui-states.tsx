export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 h-4 ${className}`}
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <span className="text-2xl">📋</span>
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
        {description}
      </p>
      {action}
    </div>
  );
}

export function OfflineBadge() {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium shadow-lg">
      Offline
    </div>
  );
}