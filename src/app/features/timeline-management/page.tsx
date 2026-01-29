import SearchBox from '@/app/features/timeline-management/components/search-box.tsx';
import { useTimeline } from '@/app/features/timeline-management/hooks/use-timeline.ts';
import type { StatusOption } from '@/app/features/timeline-management/services/types.ts';
import FilterAssets from '@/components/ui/filter-assets.tsx';
import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
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

    curPage,
    setCurPage,
  } = useTimeline();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const totalPages = 99;

  const statusOptions: StatusOption[] = [
    { id: '1', name: 'Active' },
    { id: '2', name: 'Upcoming' },
    { id: '3', name: 'Finished' },
  ];

  const handleCreate = () => {
    setIsOpen((val) => !val);
    console.log('Create Project Clicked...');
    console.log(isOpen);
  };

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

      <TimelineForm isOpen={isOpen} setIsOpen={setIsOpen} />
      {/*-------- End Filter Bar --------*/}

      {/*-------- Start Listing Timeline --------*/}

      {/* <div className="grow overflow-y-auto">
        {filteredData.length > 0 ? (
          currentLayout === 'grid' ? (
            <TimelineGrid data={filteredData} />
          ) : (
            <TimelineList data={filteredData} />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p>No timelines found matching your criteria.</p>
          </div>
        )}
      </div> */}

      {/*-------- End Listing Timeline --------*/}

      {/*-------- End Pagination --------*/}
      <div className="w-full flex justify-between items-baseline border-t border-white/10 pt-4">
        {/* Left Side: Total Count */}
        <p className="text-[#FFBA00] text-sm font-medium">
          Total - {totalPages}
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
