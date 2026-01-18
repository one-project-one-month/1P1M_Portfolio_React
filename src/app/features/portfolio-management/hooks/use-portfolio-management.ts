import { useMemo, useState } from 'react';
import {
  PORTFOLIO_MANAGEMENT_DATA,
  type ProjectData,
  type ProjectStatus,
} from '../constants/data';

const ITEMS_PER_PAGE = 10;

export const usePortfolioManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [portfolioData, setPortfolioData] = useState<ProjectData[]>(
    PORTFOLIO_MANAGEMENT_DATA,
  );

  const filteredData = useMemo(() => {
    let result = portfolioData;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.leader.toLowerCase().includes(query) ||
          project.title.toLowerCase().includes(query),
      );
    }

    if (statusFilter) {
      result = result.filter((project) => project.status === statusFilter);
    }

    return result;
  }, [portfolioData, searchQuery, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleStatusFilter = (status: ProjectStatus) => {
    setStatusFilter(status);
    setCurrentPage(0);
  };

  const clearStatusFilter = () => {
    setStatusFilter(null);
    setCurrentPage(0);
  };

  const deleteProject = (id: number) => {
    setPortfolioData((prevData) =>
      prevData.filter((project) => project.id !== id),
    );

    const newFilteredLength = filteredData.filter(
      (project) => project.id !== id,
    ).length;
    const newTotalPages = Math.ceil(newFilteredLength / ITEMS_PER_PAGE);
    if (currentPage >= newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages - 1);
    }
  };

  const updateProject = (updatedData: Partial<ProjectData>) => {
    if (!updatedData.id) return;

    setPortfolioData((prevData) =>
      prevData.map((project) => {
        if (project.id === updatedData.id) {
          return {
            ...project,
            ...updatedData,
            title:
              updatedData.projectName || updatedData.title || project.title,
          };
        }
        return project;
      }),
    );
  };

  const resetData = () => {
    setPortfolioData(PORTFOLIO_MANAGEMENT_DATA);
    setSearchQuery('');
    setStatusFilter(null);
    setCurrentPage(0);
  };

  return {
    paginatedData,
    totalCount: filteredData.length,
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
    resetData,
  };
};
