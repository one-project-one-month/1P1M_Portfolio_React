import UserManagementContainer from '@/app/features/user-management/components/user-management-container';
import { UserManagementHeaderSection } from '@/app/features/user-management/components/user-management-header-section';
import { useState } from 'react';
import {
  UserManagementStatus,
  type FilterType,
} from '../types/user-management.types';

const DEFAULT_PAGE_SIZE = 5;

const UserManagement = () => {
  const [filter, setFilter] = useState<FilterType>({
    order: 'desc',
    status: UserManagementStatus.ALL,
    search: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
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
