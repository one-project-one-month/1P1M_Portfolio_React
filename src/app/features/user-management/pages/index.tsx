import UserManagementContainer from '@/app/features/user-management/components/user-management-container';
import { UserManagementHeaderSection } from '@/app/features/user-management/components/user-management-header-section';
import { useState } from 'react';

const UserManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const pageSize = 10;

  return (
    <div>
      <UserManagementHeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <UserManagementContainer
        totalUser={totalUser}
        searchQuery={searchQuery}
        onTotalChange={setTotalUser}
        selectedFilter={selectedFilter}
        page={currentPage}
        size={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserManagement;
