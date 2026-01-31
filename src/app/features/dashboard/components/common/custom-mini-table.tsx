import { cn } from '@/lib/utils';

export type Column<T> = {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type CustomMiniTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  emptyText?: string;
};

function CustomMiniTable<T>({
  data,
  columns,
  className,
  headerClassName,
  rowClassName,
  emptyText = 'No data available',
}: CustomMiniTableProps<T>) {
  return (
    <div className={cn('w-full overflow-hidden rounded-md', className)}>
      <table className="w-full text-sm">
        <thead className={cn('bg-slate-700 rounded-full', headerClassName)}>
          <tr>
            {columns.map((col, i) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-3 py-2 text-left font-medium  text-white',
                  i === 0 && 'rounded-l-lg',
                  i === columns.length - 1 && 'rounded-r-lg',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-slate-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-white/5 last:border-b-0',
                  'hover:bg-white/5 transition',
                  rowClassName,
                )}
              >
                {columns.map((col) => {
                  const value = row[col.key];

                  return (
                    <td key={String(col.key)} className="px-3 py-4 text-white">
                      {col.render ? col.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomMiniTable;
