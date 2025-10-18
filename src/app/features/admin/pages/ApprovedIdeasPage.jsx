import React, { useState } from "react";
import { useApprovedProjects } from "@/hooks/useApprovedProjects";
import ApprovedIdeasHeader from "../components/ApprovedIdeasHeader";
import ApprovedIdeasPagination from "../components/ApprovedIdeasPagination";
import ApprovedIdeasTable from "../components/ApprovedIdeasTable";

function ApprovedIdeasPage() {
  const {
    projects,
    pagination,
    projectTypes,
    loading,
    error,
    currentSearch,
    currentFilter,
    handleSearch,
    handleFilter,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    clearFilters,
    hasFilters,
    isEmpty,
  } = useApprovedProjects();

  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleFilterSelect = (selectedType) => {
    if (selectedType) {
      handleFilter(selectedType.value);
    } else {
      handleFilter("");
    }
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;
    
    // Always show first page
    pages.push(1);
    
    // Add current page and surrounding pages
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="text-white flex flex-col h-full min-h-0">
      <ApprovedIdeasHeader
        searchInput={searchInput}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        pagination={pagination}
        projectTypes={projectTypes}
        onFilterSelect={handleFilterSelect}
      />

      <div className="flex-1 flex flex-col justify-between min-h-0">
        <ApprovedIdeasTable
          projects={projects}
          loading={loading}
          error={error}
          isEmpty={isEmpty}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />

        <ApprovedIdeasPagination
          pagination={pagination}
          pageNumbers={pageNumbers}
          onGoToPage={goToPage}
          onGoToPreviousPage={goToPreviousPage}
          onGoToNextPage={goToNextPage}
        />
      </div>
    </div>
  );
}

export default ApprovedIdeasPage;
