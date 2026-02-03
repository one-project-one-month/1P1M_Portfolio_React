import SearchBox from '@/app/features/timeline-management/components/search-box.tsx';
import TimelineGrid from '@/app/features/timeline-management/components/timeline-grid.tsx';
import TimelineList from '@/app/features/timeline-management/components/timeline-list.tsx';
import { useTimeline } from '@/app/features/timeline-management/hooks/use-timeline.ts';
import type {
  StatusOption,
  Timeline,
} from '@/app/features/timeline-management/services/types.ts';
import FilterAssets from '@/components/ui/filter-assets.tsx';
import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import TimelineForm from './components/timeline-form';

const TimelineManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    currentLayout,
    setCurrentLayout,
    displayData,
    isLoading,
    error,
    curPage,
    setCurPage,
    paginationMeta,
  } = useTimeline();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | null>(
    null,
  );

  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.totalItems ?? 0;

  const statusOptions: StatusOption[] = [
    { id: '1', name: 'Active' },
    { id: '2', name: 'Upcoming' },
    { id: '3', name: 'Finished' },
  ];

  const handleCreate = () => {
    setSelectedTimeline(null);
    setIsOpen((val) => !val);
    console.log('Create Project Clicked...');
    console.log(isOpen);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['timelines'],
      exact: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-[80vh] gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-700 rounded mb-4" />{' '}
        {/* Title Skeleton */}
        <div className="flex justify-between gap-4">
          <div className="h-12 w-1/2 bg-gray-800 rounded" />{' '}
          {/* Search Skeleton */}
          <div className="h-12 w-1/3 bg-gray-800 rounded" />{' '}
          {/* Filter Skeleton */}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-500">Error loading data: {error.message}</div>
    );

  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* -------- Start Title Bar --------*/}
      <Title showSearch={false} showFilter={false} title="Timeline List" />
      {/*-------- End Title Bar --------*/}

      {/*-------- Start Filter Bar --------*/}
      <div className="flex justify-between items-center gap-18">
        {/* search box */}
        <div className="w-1/2">
          <SearchBox value={searchTerm} onChange={setSearchTerm} />
        </div>

        {/* filter option */}
        <div className="min-w-96">
          <FilterAssets<StatusOption>
            // button show or not option - default is false
            showFilter={true}
            showCreateButton={true}
            showLayout={true}
            // Layout Props
            viewLayout={currentLayout}
            onChangeLayout={setCurrentLayout}
            // Dropdown Props
            filterOption={statusOptions}
            selectedFilter={selectedStatus}
            onFilterSelect={setSelectedStatus}
            getOptionLabel={(cat) => cat.name}
            // Action Props
            createButtonText="Create New" // optional default - Create a project
            onCreateClick={handleCreate}
          />
        </div>
      </div>

      <TimelineForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={selectedTimeline}
        onSuccess={handleSuccess}
      />
      {/*-------- End Filter Bar --------*/}

      {/*-------- Start Listing Timeline --------*/}

      <div className="grow overflow-y-auto">
        {displayData.length > 0 ? (
          currentLayout === 'grid' ? (
            <TimelineGrid data={displayData} />
          ) : (
            <TimelineList data={displayData} refreshData={handleSuccess} />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
            <div className="p-4 bg-gray-800 rounded-full text-4xl">🔍</div>
            <p className="text-lg font-semibold">No results found</p>
            <p className="text-sm">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus(undefined);
              }}
              className="text-[#FFBA00] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/*-------- End Listing Timeline --------*/}

      {/*-------- End Pagination --------*/}
      <div className="w-full flex justify-between items-baseline border-t border-white/10 pt-4">
        {/* Left Side: Total Count */}
        <p className="text-[#FFBA00] text-sm font-medium">
          Total - {totalItems}
        </p>

        {/* Right Side: Pagination */}
        <Pagination
          currentPage={curPage}
          totalPages={totalPages}
          onPageChange={setCurPage}
        />
      </div>
      {/*-------- End Pagination --------*/}
    </div>
  );
};

export default TimelineManagement;
