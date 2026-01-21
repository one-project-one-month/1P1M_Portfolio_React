import { useEffect, useState } from 'react';
import IdeaCreateForm from '../components/idea-create-form';
import ProjectIdeaContainer from '../components/project-idea-container';
import ProjectIdeaHeaderSection from '../components/project-idea-header-section';

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
      />

      <IdeaCreateForm
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
};

export default IdeaManagement;
