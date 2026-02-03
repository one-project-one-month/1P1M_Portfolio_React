import { timelineService } from '@/app/features/timeline-management/services/timeline-service.ts';
import type { StatusOption } from '@/app/features/timeline-management/services/types.ts';
import { useDebounce } from '@/hooks/use-debounce.ts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useTimeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    StatusOption | undefined
  >();
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list');
  const [curPage, setCurPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['timelines', curPage, debouncedSearchTerm, selectedStatus],
    queryFn: () =>
      timelineService.getAllTimelines({
        searchTerm: debouncedSearchTerm,
        selectedStatus,
        curPage,
      }),
    placeholderData: (previousData) => previousData,
  });

  const displayData = apiResponse?.data ?? [];

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurPage(1);
  };

  const handleStatusChange = (status: StatusOption | undefined) => {
    setSelectedStatus(status);
    setCurPage(1);
  };

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedStatus,
    setSelectedStatus: handleStatusChange,
    currentLayout,
    setCurrentLayout,
    curPage,
    setCurPage,
    displayData,
    paginationMeta: apiResponse?.meta,
    isLoading,
    error,
  };
};
