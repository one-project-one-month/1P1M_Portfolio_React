import { useEffect, useState } from 'react';
import { useViewMode } from '../../../../hooks/use-view-mode';
import IdeaCreateForm from '../components/idea-create-form';
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

  const [modals, setModals] = useState({
    create: false,
    edit: false,
  });

  useEffect(() => {
    localStorage.setItem('idea-management-view-mode', viewMode);
  }, [viewMode]);

  return (
    <div>
      <ProjectIdeaHeaderSection
        viewMode={viewMode}
        filter={filter}
        setFilter={setFilter}
        setViewMode={setViewMode}
        onCreate={() => setModals({ ...modals, create: true })}
      />
      <ProjectIdeaContainer
        view={viewMode}
        filter={filter}
        setFilter={setFilter}
        currentPage={pagination.currentPage}
        pageSize={PAGE_SIZE}
        onPageChange={(page) =>
          setPagination({ ...pagination, currentPage: page })
        }
        onEdit={(isEdit) => setModals({ ...modals, edit: isEdit })}
      />
      <IdeaCreateForm
        isOpen={modals.create}
        onClose={() => setModals({ ...modals, create: false })}
      />
    </div>
  );
};

export default IdeaManagement;
