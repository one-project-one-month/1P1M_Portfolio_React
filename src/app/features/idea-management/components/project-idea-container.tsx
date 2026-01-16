import Pagination from '@/components/ui/pagination';
import { useEffect } from 'react';
import { useProjectIdeaQuery } from '../hooks/use-project-ideas';
import type { ProjectIdeaContainerProps } from '../types/idea-management.types';
import IdeaManagementGrid from './grid-view';
import IdeaManagementTable from './list-view';

const ProjectIdeaContainer = ({
  view,
  searchQuery,
  selectedFilter,
  page,
  size,
  onPageChange,
  onTotalChange,
}: ProjectIdeaContainerProps) => {
  const { data, isLoading, isError } = useProjectIdeaQuery({
    page,
    size,
    keyword: searchQuery,
    sortField: selectedFilter,
  });

  useEffect(() => {
    if (data?.meta?.totalItems && onTotalChange) {
      onTotalChange(data.meta.totalItems);
    }
  }, [data?.meta?.totalItems, onTotalChange]);

  const handleEdit = (id: number) => {
    console.log(id);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };
  const handleViewDetail = (id: number) => {
    console.log(id);
  };
  const handleStatusChange = (status: 'Pending' | 'Approved' | 'Archived') => {
    console.log(status);
  };
  const handleImportPortfolio = (id: number) => {
    console.log(id);
  };

  if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;

  if (isError || !data?.success)
    return <div className="text-rose-400">Failed to load ideas</div>;

  // Ensure children always receive an array (empty when no data).
  const items = data?.data ?? [];
  const totalPages = data?.meta ? Math.ceil(data.meta.totalItems / size) : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable
          data={items}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
          handleImportPortfolio={handleImportPortfolio}
        />
      ) : (
        <IdeaManagementGrid
          data={items}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
          handleImportPortfolio={handleImportPortfolio}
        />
      )}

      {onPageChange && totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectIdeaContainer;
