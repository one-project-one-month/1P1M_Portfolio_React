import UserManagementContainer from '@/app/features/user-management/components/user-management-container';
import { UserManagementHeaderSection } from '@/app/features/user-management/components/user-management-header-section';
import { useState } from 'react';
import type { FilterType } from '../types/user-management.types';

const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_STATUS = 'ALL';

const UserManagement = () => {
  const [filter, setFilter] = useState<FilterType>({
    order: 'desc',
    status: DEFAULT_STATUS,
    search: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
  });

  return (
    <div>
      <UserManagementHeaderSection filter={filter} setFilter={setFilter} />
      <UserManagementContainer
        filter={filter}
        currentPage={pagination.currentPage}
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChange={(page) =>
          setPagination({ ...pagination, currentPage: page })
        }
      />
    </div>
  );
};

export default UserManagement;
