type StatusItemProps = {
  colorClass: string;
  count: number;
  label: string;
};

export function StatusItem({ colorClass, count, label }: StatusItemProps) {
  return (
    <div className="flex items-center gap-x-1 text-xs text-slate-400">
      <span className={`w-4 h-4 rounded-full ${colorClass}`} />
      <span className="text-white font-bold">{count}</span>
      <span>{label}</span>
    </div>
  );
}

type Status = {
  label: string;
  count: number;
  colorClass: string;
};

type StatusSummaryProps = {
  items: Status[];
  className?: string;
};

export function StatusSummary({ items, className }: StatusSummaryProps) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-x-2 ${className ?? ''}`}
    >
      {items.map((item) => (
        <StatusItem
          key={item.label}
          label={item.label}
          count={item.count}
          colorClass={item.colorClass}
        />
      ))}
    </div>
  );
}
