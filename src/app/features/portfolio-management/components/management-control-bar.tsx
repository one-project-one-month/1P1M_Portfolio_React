import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Search } from 'lucide-react';
import { useState } from 'react';
import {
  OrderFilterDropdown,
  type OrderFilterOption,
  StatusFilterDropdown,
  type StatusFilterOption,
} from './status-filter-dropdown';

interface ManagementControlBarProps {
  title?: string;
  onSearch?: (query: string) => void;
  viewMode?: 'list' | 'gallery';
  onChangeViewMode?: (mode: 'list' | 'gallery') => void;
  onCreateProject?: () => void;
  onFilterByStatus?: (status: StatusFilterOption) => void;
  onFilterByOrder?: (order: OrderFilterOption) => void;
}

const ManagementControlBar = ({
  onSearch,
  viewMode = 'list',
  onChangeViewMode,
  onCreateProject,
  onFilterByStatus,
  onFilterByOrder,
}: ManagementControlBarProps) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('All');
  const [orderFilter, setOrderFilter] = useState<OrderFilterOption>('All');

  const handleStatusFilter = (status: StatusFilterOption) => {
    setStatusFilter(status);
    onFilterByStatus?.(status);
  };

  const handleOrderFilter = (order: OrderFilterOption) => {
    setOrderFilter(order);
    onFilterByOrder?.(order);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="w-[585px] h-12 px-4 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.09)] flex items-center gap-1.5">
          <Search className="w-5 h-5 text-[#6A7282]" />
          <input
            type="text"
            placeholder="Search by Name"
            className="flex-1 bg-transparent text-[#6A7282] text-sm outline-none placeholder:text-[#6A7282]"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="p-1" onClick={() => onChangeViewMode?.('list')}>
              <List
                className={`w-6 h-6 ${viewMode === 'list' ? 'text-[#D1A4FE]' : 'text-[#6A7282]'}`}
              />
            </button>
            <button
              className="p-1"
              onClick={() => onChangeViewMode?.('gallery')}
            >
              <LayoutGrid
                className={`w-6 h-6 ${viewMode === 'gallery' ? 'text-[#D1A4FE]' : 'text-[#6A7282]'}`}
              />
            </button>
          </div>
          <OrderFilterDropdown
            value={orderFilter}
            onChange={handleOrderFilter}
          />

          <StatusFilterDropdown
            value={statusFilter}
            onChange={handleStatusFilter}
          />

          <Button variant="primary" size="primary" onClick={onCreateProject}>
            Create Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagementControlBar;
