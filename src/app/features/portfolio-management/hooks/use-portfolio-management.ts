import { useDebounce } from '@/hooks/use-debounce';
import { useEffect, useState } from 'react';
import type { OrderFilterOption } from '../components/status-filter-dropdown';
import { type ProjectData, type ProjectStatus } from '../constants/data';
import { updateProjectStatus as updateProjectStatusApi } from '../services/portfolio-management-service';
import { mapApiToProjectData } from '../utils/helpers';
import { mapFrontendToBackendStatus } from '../utils/status-mapping';
import { useDeleteProject, useGetAllProjects } from './use-portfolio-query';

const ITEMS_PER_PAGE = 10;

const getOrderParams = (
  order: OrderFilterOption,
): { sortField?: string; sortDirection: string } => {
  switch (order) {
    case 'Newest':
      return { sortDirection: 'desc' };
    case 'Oldest':
      return { sortDirection: 'asc' };
    case 'Popular':
    default:
      return { sortDirection: 'desc' };
  }
};

const getBackendStatus = (status: ProjectStatus | null): string | undefined => {
  if (!status) return undefined;
  return mapFrontendToBackendStatus(status);
};

export const usePortfolioManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderFilterOption>('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [portfolioData, setPortfolioData] = useState<ProjectData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useDebounce(searchQuery, 400);
  const { sortField, sortDirection } = getOrderParams(orderFilter);
  const backendStatus = getBackendStatus(statusFilter);

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllProjects(
    currentPage,
    ITEMS_PER_PAGE,
    sortDirection,
    debouncedSearch,
    sortField,
    backendStatus,
  );

  const deleteProjectMutation = useDeleteProject();

  useEffect(() => {
    if (response && response.success === 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = response.data.map((item: any) =>
        mapApiToProjectData(item),
      );
      setPortfolioData(mappedData);
      setTotalCount(response.meta.totalItems);
      setTotalPages(response.meta.totalPages);
    }
  }, [response]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleStatusFilter = (status: ProjectStatus | 'All') => {
    if (status === 'All') {
      setStatusFilter(null);
    } else {
      setStatusFilter(status);
    }
    setCurrentPage(0);
  };

  const handleOrderFilter = (order: OrderFilterOption) => {
    setOrderFilter(order);
    setCurrentPage(0);
  };

  const clearStatusFilter = () => {
    setStatusFilter(null);
    setCurrentPage(0);
  };

  const deleteProject = async (id: number) => {
    try {
      await deleteProjectMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const updateProject = () => {};

  const updateProjectStatus = async (id: number, newStatus: ProjectStatus) => {
    setPortfolioData((prevData) =>
      prevData.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project,
      ),
    );

    try {
      const backendSt = mapFrontendToBackendStatus(newStatus);
      await updateProjectStatusApi(id, backendSt);
    } catch (error) {
      console.error('Failed to update project status:', error);
      refetch();
    }
  };

  const resetData = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setOrderFilter('All');
    setCurrentPage(0);

    refetch();
  };

  const sortedData =
    orderFilter === 'Popular'
      ? [...portfolioData].sort(
          (a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0),
        )
      : portfolioData;

  return {
    paginatedData: sortedData,
    totalCount,
    totalPages,
    currentPage,
    searchQuery,
    statusFilter,
    orderFilter,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    handleOrderFilter,
    clearStatusFilter,
    deleteProject,
    updateProject,
    updateProjectStatus,
    resetData,
    isLoading,
  };
};
