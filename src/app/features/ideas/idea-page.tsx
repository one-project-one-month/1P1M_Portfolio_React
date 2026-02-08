import Title from '@/components/ui/title';
import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import IdeaCreateForm from '../../../components/ideas/idea-create-form';
import IdeaSectionContainer from './components/idea-section-container';
import { useCreateIdea } from './hooks/use-create-idea';
import { useIdeaFilters } from './hooks/use-idea-filters';

const ORDER_OPTIONS = ['newest', 'oldest', 'popular'];
const FILTER_OPTIONS = [
  { name: 'ALL', value: '' },
  { name: 'Rejected', value: 'REJECTED' },
  { name: 'Approved', value: 'APPROVED' },
  { name: 'In-progress', value: 'IN_PROGRESS' },
  { name: 'Completed', value: 'COMPLETED' },
  { name: 'Deleted', value: 'DELETED' },
  { name: 'Pending', value: 'PENDING' },
];

export default function IdeaPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    search,
    selectedStatus,
    selectedOrder,
    handleSearch,
    handleStatusChange,
    handleOrderChange,
    resetFilters,
  } = useIdeaFilters();

  const { form, handleCreate, isPending } = useCreateIdea(() => {
    setIsCreateDialogOpen(false);
    resetFilters();
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Title
        page="Idea"
        title="Project Idea Lists"
        searchPlaceholder="Search By Ideas"
        onCreate={() => setIsCreateDialogOpen(true)}
        showSearch
        showOrder
        showFilter
        selectedFilter={selectedStatus}
        selectedOrder={selectedOrder}
        orderOptions={ORDER_OPTIONS}
        filterOptions={FILTER_OPTIONS}
        onSearchChange={(e) => handleSearch(e.target.value)}
        onFilterChange={handleStatusChange}
        onOrderChange={handleOrderChange}
      />

      <Dialog.Root
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <IdeaCreateForm
          form={form}
          handleCreate={handleCreate}
          isPending={isPending}
        />
      </Dialog.Root>

      <IdeaSectionContainer
        query={search}
        status={selectedStatus}
        order={selectedOrder}
      />
    </div>
  );
}
