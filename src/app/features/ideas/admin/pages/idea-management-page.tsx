import { useViewMode } from '@/hooks/use-view-mode';
import { useEffect, useState } from 'react';
import type { FilterType } from '../../shared/types/project-idea.types';
import IdeaContainer from '../components/project-idea-container';
import ProjectIdeaHeaderSection from '../components/project-idea-header-section';

const PAGE_SIZE = 6;
const DEFAULT_STATUS = '' as const;
const DEFAULT_ORDER = 'newest' as const;

const IdeaManagement = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [filter, setFilter] = useState<FilterType>({
    order: DEFAULT_ORDER,
    status: DEFAULT_STATUS,
    search: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
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
      <IdeaContainer
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
