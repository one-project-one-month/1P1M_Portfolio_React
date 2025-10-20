import { useState, useEffect, useCallback } from 'react';
import { 
  fetchApprovedProjects, 
  searchApprovedProjects, 
  filterApprovedProjects,
  getProjectTypes 
} from '@/services/approvedProjectsService';
import { useSearchParams } from 'react-router-dom';

export const useApprovedProjects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
    hasNext: false,
    hasPrevious: false
  });
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentSearch = searchParams.get('search') || '';
  const currentFilter = searchParams.get('filter') || '';

  useEffect(() => {
    const loadProjectTypes = async () => {
      try {
        const response = await getProjectTypes();
        if (response.success) {
          setProjectTypes(response.data);
        }
      } catch (err) {
        console.error('Failed to load project types:', err);
      }
    };

    loadProjectTypes();
  }, []);

  useEffect(() => {
    loadProjects();
  }, [currentPage, currentSearch, currentFilter]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (currentSearch) {
        response = await searchApprovedProjects(currentSearch, {
          page: currentPage,
          limit: 6,
          projectType: currentFilter
        });
      } else if (currentFilter) {
        response = await filterApprovedProjects(currentFilter, {
          page: currentPage,
          limit: 6
        });
      } else {
        response = await fetchApprovedProjects({
          page: currentPage,
          size: 6
        });
      }

      if (response.success) {
        setProjects(response.data.projects);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to load projects');
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err.message || 'Failed to load projects');
      setProjects([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 6,
        hasNext: false,
        hasPrevious: false
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentSearch, currentFilter]);

  const handleSearch = useCallback((searchTerm) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    
    // Reset to first page when searching
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleFilter = useCallback((filterValue) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (filterValue) {
      newParams.set('filter', filterValue);
    } else {
      newParams.delete('filter');
    }
    
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const goToPage = useCallback((page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const goToNextPage = useCallback(() => {
    if (pagination.hasNext) {
      goToPage(pagination.currentPage + 1);
    }
  }, [pagination.hasNext, pagination.currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    if (pagination.hasPrevious) {
      goToPage(pagination.currentPage - 1);
    }
  }, [pagination.hasPrevious, pagination.currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(pagination.totalPages);
  }, [pagination.totalPages, goToPage]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  // Refresh data
  const refresh = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    // Data
    projects,
    pagination,
    projectTypes,
    
    // State
    loading,
    error,
    
    // Current filters
    currentPage,
    currentSearch,
    currentFilter,
    
    // Actions
    handleSearch,
    handleFilter,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    clearFilters,
    refresh,
    
    // Computed values
    hasFilters: !!(currentSearch || currentFilter),
    isEmpty: !loading && projects.length === 0,
    isSearching: !!currentSearch,
    isFiltering: !!currentFilter,
  };
};