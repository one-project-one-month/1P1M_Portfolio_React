import Pagination from '@/components/ui/pagination';
import { useEffect } from 'react';
import { useProjectIdeaQuery } from '../hooks/use-project-ideas';
import type { ProjectIdeaContainerProps } from '../types/idea-management.types';
import IdeaCard from './idea-card';
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

  if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;
  if (isError || !data?.success)
    return <div className="text-rose-400">Failed to load ideas</div>;

  const totalPages = data?.meta ? Math.ceil(data.meta.totalItems / size) : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable
          data={data.data}
          onEdit={(id) => console.log('Edit', id)}
          onDelete={(id) => console.log('Delete', id)}
          onViewDetail={(id) => console.log('View', id)}
        />
      ) : (
        <section>
          <div className="grid grid-cols-3 auto-rows-fr gap-y-8 gap-x-12">
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
          </div>
        </section>
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
