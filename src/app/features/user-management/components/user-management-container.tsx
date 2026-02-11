import UserManagementTable from '@/app/features/user-management/components/user-management-table';
import type { UserManagementContainerPropsType } from '@/app/features/user-management/types/user-management.types';
import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { useGetUserManagement } from '../hook/use-user-management';

const UserManagementContainer = ({
  filter,
  currentPage,
  pageSize,
  onPageChange,
}: UserManagementContainerPropsType) => {
  const { data, isPending, isError } = useGetUserManagement({
    page: currentPage,
    size: pageSize,
    keyword: filter?.search,
    sortField: filter?.status,
    // status: filter?.status,
    // sortDirection:
    //   filter?.order === 'asc'
    //     ? 'oldest'
    //     : filter?.order === 'desc'
    //       ? 'newest'
    //       : undefined,
  });

  if (isPending) return <div className="text-slate-400">Loading ideas...</div>;

  if (isError) return <div className="text-rose-400">Failed to load users</div>;

  // Ensure children always receive an array (empty when no data).
  const items = data?.data ?? [];
  const totalItems = data?.meta?.totalItems ?? 0;
  const totalPages = data?.meta?.totalPages ?? 0;

  return (
    <div>
      <UserManagementTable data={items} />

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

export default UserManagementContainer;
