import { useState } from 'react';

type IdeaStatus =
  | ''
  | 'REJECTED'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELETED'
  | 'PENDING';

type IdeaOrder = 'popular' | 'newest' | 'oldest';

export const useIdeaFilters = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus>('');
  const [selectedOrder, setSelectedOrder] = useState<IdeaOrder>('newest');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as IdeaStatus);
  };

  const handleOrderChange = (order: string) => {
    setSelectedOrder(order as IdeaOrder);
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
