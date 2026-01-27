import { useEffect, useState } from 'react';
import { useViewMode } from '../../../../hooks/use-view-mode';
import ProjectIdeaContainer from '../components/project-idea-container';
import ProjectIdeaHeaderSection from '../components/project-idea-header-section';

const PAGE_SIZE = 6;
const DEFAULT_FILTER = 'All';

const IdeaManagement = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [filter, setFilter] = useState({
    status: DEFAULT_FILTER,
    search: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
  });

  useEffect(() => {
    if (localStorage.getItem('idea-management-view-mode') !== viewMode) {
      localStorage.setItem('idea-management-view-mode', viewMode);
    }
  }, [viewMode]);

  return (
    <div>
      <ProjectIdeaHeaderSection
        viewMode={viewMode}
        setViewMode={setViewMode}
        filter={filter}
        setFilter={setFilter}
      />
      <ProjectIdeaContainer
        view={viewMode}
        filter={filter}
        currentPage={pagination.currentPage}
        pageSize={PAGE_SIZE}
        onPageChange={(page) =>
          setPagination({ ...pagination, currentPage: page })
        }
      />
    </div>
  );
};

export default IdeaManagement;
