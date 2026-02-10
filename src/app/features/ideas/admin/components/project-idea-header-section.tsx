import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import Title from '@/components/ui/title';
import { useDebounce } from '@/hooks/use-debounce';
import { buttonVariants } from '@/styles/button-variants';
import { Dialog } from '@radix-ui/themes';
import { Check, LayoutGrid, List, ListFilter, Search } from 'lucide-react';
import { memo, useCallback, useEffect, useState } from 'react';
import { IdeaCreateForm } from '../../shared/components';
import { FILTER_OPTIONS, ORDER_LIST } from '../../shared/constants';
import { useCreateIdea } from '../../shared/hooks';
import type { IdeaHeaderPropsType } from '../../shared/types/project-idea.types';

const ProjectIdeaHeaderSection = ({
  viewMode,
  setViewMode,
  filter,
  setFilter,
}: IdeaHeaderPropsType) => {
  const [inputValue, setInputValue] = useState(filter.search);
  const [open, setOpen] = useState({
    order: false,
    filter: false,
    create: false,
  });
  const debouncedSearch = useDebounce(inputValue, 800);

  // Use the shared create idea hook
  const { form, handleCreate, isPending } = useCreateIdea(() => {
    setOpen({ ...open, create: false });
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
  const handleOrder = (order: 'popular' | 'newest' | 'oldest') => {
    setFilter({ ...filter, order });
    setOpen({ ...open, create: false });
  };

  // Status
  const handleStatus = (
    status:
      | ''
      | 'REJECTED'
      | 'APPROVED'
      | 'IN_PROGRESS'
      | 'COMPLETED'
      | 'DELETED'
      | 'PENDING',
  ) => {
    setFilter({ ...filter, status });
    setOpen({ ...open, create: false });
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col gap-y-6 mb-6">
        <Title showSearch={false} showFilter={false} title="Idea List" />

        {/* Total Count and Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          {/* Search Box */}
          <div className="relative w-full md:w-96 lg:w-100">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

            <InputField
              type="text"
              placeholder="Search by Idea Title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-12"
            />
          </div>

          {/* View Controls and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* View Mode Toggles */}
            <div className="flex items-center gap-2 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'text-[#6F28B3]' : 'text-white'}`}
                title="List View"
              >
                <List className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'text-[#6F28B3]' : 'text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
            </div>

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
                <div className="absolute left-0 mt-1 w-full min-w-40 flex flex-col gap-1 z-10">
                  {ORDER_LIST.map((order) => (
                    <button
                      key={order.value}
                      onClick={() =>
                        handleOrder(
                          order.value as 'popular' | 'newest' | 'oldest',
                        )
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
                <div className="absolute left-0 mt-1 w-full min-w-40 flex flex-col gap-1 z-10">
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleStatus(
                          option.value as
                            | ''
                            | 'REJECTED'
                            | 'APPROVED'
                            | 'IN_PROGRESS'
                            | 'COMPLETED'
                            | 'DELETED'
                            | 'PENDING',
                        )
                      }
                      className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        {filter.status === option.value && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Create button */}
            <Dialog.Root
              open={open.create}
              onOpenChange={(value) => setOpen({ ...open, create: value })}
            >
              <Dialog.Trigger>
                <Button
                  type="button"
                  className={buttonVariants({ variant: 'primary' })}
                  onClick={() => setOpen({ ...open, create: !open.create })}
                >
                  Create Idea
                </Button>
              </Dialog.Trigger>

              <IdeaCreateForm
                form={form}
                handleCreate={handleCreate}
                isPending={isPending}
              />
            </Dialog.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProjectIdeaHeaderSection);
