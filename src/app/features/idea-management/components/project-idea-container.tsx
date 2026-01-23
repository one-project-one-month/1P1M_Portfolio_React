import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { useGetProjectIdea } from '../hooks/use-project-ideas';
import type { ProjectIdeaContainerPropsType } from '../types/project-idea.types';
import IdeaManagementGrid from './grid-view';
import IdeaManagementTable from './list-view';

const ProjectIdeaContainer = ({
  view,
  filter,
  currentPage,
  pageSize,
  onPageChange,
}: ProjectIdeaContainerPropsType) => {
  const { data, isLoading, isError } = useGetProjectIdea({
    page: currentPage,
    size: pageSize,
    keyword: filter.search,
    sortField: filter.status,
  });

  const handleViewDetail = (id: number) => {
    console.log(id);
  };

  const handleStatusChange = (status: 'PENDING' | 'APPROVED' | 'ARCHIVED') => {
    console.log(status);
  };

  // if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;

  // if (isError || !data?.success)
  //   return <div className="text-rose-400">Failed to load ideas</div>;

  // Ensure children always receive an array (empty when no data).
  const items = data?.data ?? [];
  const totalItems = data?.meta?.totalItems;
  const totalPages = data?.meta
    ? Math.ceil(data.meta.totalItems / pageSize)
    : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable
          // data={items}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
        />
      ) : (
        <IdeaManagementGrid
          // data={items}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
        />
      )}

      <div className="flex items-center justify-between mt-14">
        {/* Total Count */}
        <span className={`text-[${COLORS.secondary}] font-semibold`}>
          Total - {totalItems}
        </span>
        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectIdeaContainer;
