import { useMemo, useState } from 'react';

interface TableOption<T> {
  data: T[];
}

export default function useTable<T extends Record<string, any>>({
  data,
}: TableOption<T>) {
  const [search, setSearch] = useState('');
  const [sorted, setSorted] = useState<keyof T | null>(null);
  const [sortOrder, setSortedOrder] = useState<'asc' | 'desc'>('asc');

  const filterdData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sorted) return filterdData;
    return [...filterdData].sort((a, b) => {
      const AValue = a[sorted];
      const Bvalue = b[sorted];
      if (AValue < Bvalue) return sortOrder === 'asc' ? -1 : 1;
      if (AValue > Bvalue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filterdData, sorted, sortOrder]);

  return {
    data: sortedData,
    search,
    setSearch,
    sorted,
    setSorted,
    sortOrder,
    setSortedOrder,
  };
}
