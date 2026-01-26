import { useEffect, useState } from 'react';
import { type ProjectData, type ProjectStatus } from '../constants/data';
import { mapApiToProjectData } from '../utils/helpers';
import { useDeleteProject, useGetAllProjects } from './use-portfolio-query';

const ITEMS_PER_PAGE = 10; // Matched with default API size

export const usePortfolioManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [portfolioData, setPortfolioData] = useState<ProjectData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllProjects(currentPage, ITEMS_PER_PAGE, 'desc', searchQuery);

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

  const updateProjectStatus = (id: number, newStatus: ProjectStatus) => {
    setPortfolioData((prevData) =>
      prevData.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project,
      ),
    );
  };

  const resetData = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setCurrentPage(0);

    refetch();
  };

  return {
    paginatedData: portfolioData,
    totalCount,
    totalPages,
    currentPage,
    searchQuery,
    statusFilter,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    clearStatusFilter,
    deleteProject,
    updateProject,
    updateProjectStatus,
    resetData,
    isLoading,
  };
};
