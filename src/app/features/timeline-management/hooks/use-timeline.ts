import { getTimelineData } from '@/app/features/timeline-management/services/timeline-service';
import type {
  StatusOption,
  Timeline,
} from '@/app/features/timeline-management/services/types.ts';
import { useEffect, useMemo, useState } from 'react';

export const useTimeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    StatusOption | undefined
  >();
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list');
  const [curPage, setCurPage] = useState(0);

  const [allData, setAllData] = useState<Timeline[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTimelineData();
        setAllData(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
        setAllData([]);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus =
        !selectedStatus || item.status === selectedStatus.name;
      return matchesSearch && matchesStatus;
    });
  }, [allData, searchTerm, selectedStatus]);

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    currentLayout,
    setCurrentLayout,
    curPage,
    setCurPage,
    filteredData,
    error,
  };
};
