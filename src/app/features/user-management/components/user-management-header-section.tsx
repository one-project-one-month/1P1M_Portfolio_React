import type { UserManagementHeaderType } from '@/app/features/user-management/types/user-management.types';
import InputField from '@/components/ui/input-field';
import Title from '@/components/ui/title';
import { useDebounce } from '@/hooks/use-debounce';
import { Check, ListFilter, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const STATUS_LIST = [
  { value: 'ALL', name: 'All' },
  { value: 'BANNED', name: 'Banned' },
  { value: 'ACTIVE', name: 'Active' },
];

const ORDER_LIST = [
  { value: 'desc', name: 'Newest' },
  { value: 'asc', name: 'Oldest' },
  { value: 'popular', name: 'Popular' },
];

export const UserManagementHeaderSection = ({
  filter,
  setFilter,
}: UserManagementHeaderType) => {
  const [inputValue, setInputValue] = useState(filter.search ?? '');
  const debouncedSearch = useDebounce(inputValue, 800);
  const [open, setOpen] = useState({
    order: false,
    filter: false,
  });

  // Search
  const handleSearch = useCallback(() => {
    setFilter({ ...filter, search: debouncedSearch });
  }, [debouncedSearch, setFilter, filter]);

  useEffect(() => {
    if (debouncedSearch !== filter.search) {
      handleSearch();
    }
  }, [debouncedSearch, filter.search, handleSearch]);

  // Order
  const handleOrder = (order: 'asc' | 'desc' | 'popular') => {
    setFilter({ ...filter, order });
    setOpen({ ...open, filter: false });
  };

  // Status
  const handleStatus = (status: 'ALL' | 'BANNED' | 'ACTIVE') => {
    setFilter({ ...filter, status });
    setOpen({ ...open, order: false });
  };

  return (
    <div className="flex flex-col gap-y-10">
      <Title
        showSearch={false}
        showFilter={false}
        title="Registered User List"
      />

      {/* Total Count and Filters Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        {/* Search Box */}
        <div className="relative w-full md:w-96 lg:w-100">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

          <InputField
            type="text"
            placeholder="Search by project title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-12"
          />
        </div>

        {/* View Controls and Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Filter by Order Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpen({ ...open, order: !open.order, filter: false })
              }
              className="flex items-center gap-2 px-6 py-2 bg-transparent hover:bg-slate-700/40 text-white rounded-4xl border"
            >
              <ListFilter />
              <span>Order</span>
            </button>

            {open.order && (
              <div className="absolute right-0 mt-1 w-full min-w-40 flex flex-col gap-1 z-10">
                {ORDER_LIST.map((order) => (
                  <button
                    key={order.value}
                    onClick={() =>
                      handleOrder(order.value as 'asc' | 'desc' | 'popular')
                    }
                    className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {filter.order === order.value && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{order.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter by Status Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpen({ ...open, filter: !open.filter, order: false })
              }
              className="flex items-center gap-2 px-6 py-2 bg-transparent hover:bg-slate-700/40 text-white rounded-4xl border"
            >
              <ListFilter />
              <span>Status</span>
            </button>

            {open.filter && (
              <div className="absolute right-0 mt-1 w-full min-w-40 flex flex-col gap-1 z-10">
                {STATUS_LIST.map((status) => (
                  <button
                    key={status.value}
                    onClick={() =>
                      handleStatus(status.value as 'ALL' | 'BANNED' | 'ACTIVE')
                    }
                    className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {status.value === filter.status && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{status.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
