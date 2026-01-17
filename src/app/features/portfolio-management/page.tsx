import Pagination from '@/components/ui/pagination';
import { useState } from 'react';
import ManagementControlBar from './components/management-control-bar';
import PortfolioListView from './components/portfolio-list-view';
import { usePortfolioManagement } from './hooks/use-portfolio-management';

const PortfolioManagementPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');

  const {
    paginatedData,
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    deleteProject,
  } = usePortfolioManagement();

  return (
    <div className="flex flex-col w-full h-full px-6 py-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white leading-[48px] mb-1.5">
          Project Portfolio Management
        </h1>
        <div className="w-[157px] h-1.5 bg-[#FFBA00] rounded" />
      </div>
      <ManagementControlBar
        title="Project Portfolio Management"
        onSearch={handleSearch}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onCreateProject={() => console.log('Create Project')}
        onFilterByStatus={handleStatusFilter}
      />

      <div className="flex-1 mt-6 bg-transparent">
        {viewMode === 'list' ? (
          <PortfolioListView data={paginatedData} onDelete={deleteProject} />
        ) : (
          <p className="text-white text-center text-opacity-50">
            Content Placeholder
          </p>
        )}
      </div>

      <div className="flex justify-between items-center pb-8 pt-4 mt-auto">
        <p className="text-base font-semibold leading-6 text-yellow-500">
          <span>Total</span> - <span className="font-normal">{totalCount}</span>
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PortfolioManagementPage;
