import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { memo } from 'react';
import type {
  IdeaContainerPropsType,
  IdeaType,
} from '../../shared/types/project-idea.types';
import { useGetIdeaManagement } from '../hooks/use-idea-management';
import IdeaManagementGrid from './grid-view';
import IdeaManagementTable from './list-view';

const IdeaContainer = ({
  view,
  filter,
  currentPage,
  pageSize,
  onPageChange,
}: IdeaContainerPropsType) => {
  const { data, isLoading, isError } = useGetIdeaManagement({
    keyword: filter?.search,
    page: currentPage,
    size: pageSize,
    status: filter?.status,
    sortOrder: filter?.order,
  });

  if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;

  if (isError || !data?.success)
    return <div className="text-rose-400">Failed to load ideas</div>;

  // Ensure children always receive an array (empty when no data).
  const items = (data?.data ?? []) as (IdeaType & {
    isAlreadyReacted: boolean;
  })[];
  const totalItems = data?.meta?.totalItems;
  const totalPages = data?.meta?.totalItems
    ? Math.ceil(data.meta.totalItems / pageSize)
    : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable data={items} />
      ) : (
        <IdeaManagementGrid data={items} />
      )}

      <div className="flex items-center justify-between mt-14">
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

export default memo(IdeaContainer);
