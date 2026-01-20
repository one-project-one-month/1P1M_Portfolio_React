import Pagination from '@/components/ui/pagination';
import { useState } from 'react';
import PortfolioHeader from './components/portfolio-header';
import PortfolioListView from './components/portfolio-list-view';
import { ProjectCard } from './components/project-card';
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
    updateProjectStatus,
  } = usePortfolioManagement();

  return (
    <div className="flex flex-col w-full h-full px-6 py-8">
      <PortfolioHeader
        onSearch={handleSearch}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onFilterByStatus={handleStatusFilter}
      />

      <div className="flex-1 mt-6 bg-transparent">
        {viewMode === 'list' ? (
          <PortfolioListView
            data={paginatedData}
            onDelete={deleteProject}
            onStatusChange={updateProjectStatus}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
            {paginatedData.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white/50 text-lg">No projects found</p>
              </div>
            ) : (
              paginatedData.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id.toString()}
                  image={project.image}
                  title={project.title}
                  teamLeader={project.leader}
                  members={project.members}
                  status={
                    project.status === 'In Progress'
                      ? 'In-Progress'
                      : (project.status as any)
                  }
                  onDelete={(id) => deleteProject(parseInt(id))}
                />
              ))
            )}
          </div>
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
