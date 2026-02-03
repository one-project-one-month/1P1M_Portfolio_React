import { timelineService } from '@/app/features/timeline-management/services/timeline-service.ts';
import type { StatusOption } from '@/app/features/timeline-management/services/types.ts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const useTimeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    StatusOption | undefined
  >();
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list');
  const [curPage, setCurPage] = useState(1);

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['timelines', curPage, searchTerm, selectedStatus?.name],
    queryFn: () => timelineService.getAllTimeline(curPage),
    placeholderData: (previousData) => previousData,
  });

  const filteredData = useMemo(() => {
    const list = apiResponse?.data || [];
    return list.filter((item: any) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus =
        !selectedStatus || item.status === selectedStatus.name;
      return matchesSearch && matchesStatus;
    });
  }, [apiResponse, searchTerm, selectedStatus]);

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
    paginationMeta: apiResponse?.meta,
    isLoading,
    error,
  };
};
