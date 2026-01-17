import { useEffect, useState } from 'react';
import HeaderSection from '../components/header-section';
import IdeaCreateForm from '../components/idea-create-form';
import ProjectIdeaContainer from '../components/project-idea-container';

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

  // Save view mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('idea-management-view-mode', viewMode);
  }, [viewMode]);

  return (
    <div>
      <HeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalIdeas={totalIdeas}
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
      />

      <IdeaCreateForm
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      {/* <ProjectIdeaDetailDialog/> */}
    </div>
  );
};

export default IdeaManagement;
