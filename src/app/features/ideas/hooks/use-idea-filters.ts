import { useState } from 'react';

export const useIdeaFilters = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<
    | ''
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED'
    | 'PENDING'
  >('');
  const [selectedOrder, setSelectedOrder] = useState<
    'popular' | 'newest' | 'oldest'
  >('newest');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(
      status as
        | ''
        | 'REJECTED'
        | 'APPROVED'
        | 'IN_PROGRESS'
        | 'COMPLETED'
        | 'DELETED'
        | 'PENDING',
    );
  };

  const handleOrderChange = (order: string) => {
    setSelectedOrder(order as 'popular' | 'newest' | 'oldest');
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedStatus('');
    setSelectedOrder('newest');
  };

  return {
    search,
    selectedStatus,
    selectedOrder,
    handleSearch,
    handleStatusChange,
    handleOrderChange,
    resetFilters,
    setSelectedStatus,
  };
};
