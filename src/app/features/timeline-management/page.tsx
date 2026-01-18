import SearchBox from '@/app/features/timeline-management/components/search-box.tsx';
import TimelineGrid from '@/app/features/timeline-management/components/timeline-gird.tsx';
import TimelineList from '@/app/features/timeline-management/components/timeline-list.tsx';
import FilterAssets from '@/components/ui/filter-assets.tsx';
import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
import { useState } from 'react';

const TimelineManagement = () => {
  const [curPage, setCurPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list');
  const [selectedStatus, setSelectedStatus] = useState<
    StatusOption | undefined
  >();

  const totalPages = 99;

  interface StatusOption {
    id: string;
    name: string;
  }

  const statusOptions: StatusOption[] = [
    { id: '1', name: 'Active' },
    { id: '2', name: 'Upcoming' },
    { id: '3', name: 'Finished' },
  ];

  const handleLayoutChange = (layout: 'list' | 'grid') => {
    console.log(`Layout changed to: ${layout}`);
    setCurrentLayout(layout);
  };

  const handleCreate = () => {
    console.log('Create Project Clicked...');
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
            onChangeLayout={handleLayoutChange}
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
      {/*-------- End Filter Bar --------*/}

      {/*-------- Start Listing Timeline --------*/}

      <div className="grow">
        {currentLayout === 'grid' ? <TimelineGrid /> : <TimelineList />}
      </div>

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
