import { useEffect, useState } from 'react';
import IdeaCreateForm from '../components/idea-create-form';
import ProjectIdeaContainer from '../components/project-idea-container';
import ProjectIdeaHeaderSection from '../components/project-idea-header-section';

import ProjectIdeaEditDialog, {
  type IdeaEditValues,
} from '../components/project-idea-edit-dialog/index';

const MOCK_EDIT_VALUES: IdeaEditValues = {
  name: 'Smart Order & Booking Management System',
  description:
    'A web-based system that allows customers to book tables and place food orders online...',
  projectTypes: ['Website'],
  leaderId: 1,
  status: 'Approved',
};

const IdeaManagement = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    const storedView = localStorage.getItem('idea-management-view-mode');
    return storedView === 'list' || storedView === 'grid' ? storedView : 'list';
  });
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [createOpen, setCreateOpen] = useState(false); // for idea creation form
  const pageSize = 6;

  const [editOpen, setEditOpen] = useState(false);
  const [editInitialValues, setEditInitialValues] =
    useState<IdeaEditValues>(MOCK_EDIT_VALUES);

  function openMockEdit() {
    setEditInitialValues(MOCK_EDIT_VALUES);
    setEditOpen(true);
  }

  function closeEdit() {
    setEditOpen(false);
  }

  useEffect(() => {
    localStorage.setItem('idea-management-view-mode', viewMode);
  }, [viewMode]);

  return (
    <div>
      <ProjectIdeaHeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreate={() => setCreateOpen(true)}
      />

      <ProjectIdeaContainer
        view={viewMode}
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        page={currentPage}
        size={pageSize}
        onPageChange={setCurrentPage}
        onTotalChange={setTotalIdeas}
        totalIdeas={totalIdeas}
        onEditIdea={openMockEdit}
      />

      <IdeaCreateForm
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <ProjectIdeaEditDialog
        isOpen={editOpen}
        onClose={closeEdit}
        initialValues={editInitialValues}
        onSubmit={(values) => {
          console.log('Mock update payload:', values);
          closeEdit();
        }}
      />
    </div>
  );
};

export default IdeaManagement;
