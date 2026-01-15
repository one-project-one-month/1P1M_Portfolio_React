import { useState } from 'react';
import HeaderSection from './components/header-section';
// import IdeaManagementTable from './components/list-view';
import IdeaManagementTable from './components/list-view';

const IdeaManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedFilter, setSelectedFilter] = useState('All');
  const totalIdeas = 200;

  return (
    <>
      <HeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalIdeas={totalIdeas}
      />
      {viewMode == 'list' ? <IdeaManagementTable /> : <p>Grid View</p>}
    </>
  );
};

export default IdeaManagement;
