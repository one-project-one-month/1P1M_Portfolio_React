import { getTimelineData } from '@/app/features/timeline-management/services/timeline-service';
import type { StatusOption } from '@/app/features/timeline-management/services/types.ts';
import { useMemo, useState } from 'react';

export const useTimeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    StatusOption | undefined
  >();
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list');
  const [curPage, setCurPage] = useState(0);

  const allData = getTimelineData() || [];

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus =
        !selectedStatus || item.status === selectedStatus.name;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

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
  };
};
