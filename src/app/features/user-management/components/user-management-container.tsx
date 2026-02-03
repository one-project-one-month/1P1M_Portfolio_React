import UserManagement from '@/app/features/user-management/components/user-management-table';
import type {
  UserManagementContainePropsType,
  UserManagementType,
} from '@/app/features/user-management/types/user-management.types';
import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { useEffect } from 'react';
import { useGetUserManagement } from '../hook/use-user-management';
const UserManagementContainer = ({
  searchQuery,
  selectedFilter,
  page,
  size,
  onPageChange,
  totalUser,
  onTotalChange,
}: UserManagementContainePropsType) => {
  const { data } = useGetUserManagement({
    page,
    size,
    keyword: searchQuery,
    sortField: selectedFilter,
  });
  console.log(data);

  useEffect(() => {
    if (data?.meta?.totalItems && onTotalChange) {
      onTotalChange(data.meta.totalItems);
    }
  }, [data?.meta?.totalItems, onTotalChange]);

  const handleEdit = (id: number) => {
    console.log(id);
  };
  const handleBanned = (id: number) => {
    console.log(id);
  };

  const handleRestored = (id: number) => {
    console.log(id);
  };
  const handleViewDetail = (id: number) => {
    console.log(id);
  };

  const items = (data?.data ?? []).filter((user: UserManagementType) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Banned')
      return user.status?.toLowerCase() === 'banned';
    if (selectedFilter === 'Approved')
      return user.status?.toLowerCase() === 'active';
    return true;
  });
  const totalPages = data?.meta ? Math.ceil(data.meta.totalItems / size) : 0;

  return (
    <div>
      <UserManagement
        data={items}
        handleEdit={handleEdit}
        handleViewDetail={handleViewDetail}
        handleBanned={handleBanned}
        handleRestore={handleRestored}
        userId={0}
      />

      <div className="flex items-center justify-between mt-14">
        {/* Total Count */}
        <span className={`text-[${COLORS.secondary}] font-semibold`}>
          Total - {totalUser}
        </span>
        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagementContainer;
