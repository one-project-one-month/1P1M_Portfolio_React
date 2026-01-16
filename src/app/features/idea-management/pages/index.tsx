import { useState } from 'react';
import HeaderSection from '../components/header-section';
import ProjectIdeaContainer from '../components/project-idea-container';

const IdeaManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const pageSize = 6;

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

      {/* <Pagination
        currentPage={CURRENT_PAGE}
        totalPages={TOTAL_PAGES}
        onPageChange={onPageChange}
      /> */}
    </div>
  );
};

export default IdeaManagement;
