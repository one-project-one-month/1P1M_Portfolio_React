import { useState } from 'react';
import OpomRegisteredListContainer from '../components/container';
import { OpomRegisteredListHeader } from '../components/header';

const OpomRegisteredPeopleList = () => {
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const pageSize = 10;

  return (
    <div className="space-y-6 w-full">
      <OpomRegisteredListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <OpomRegisteredListContainer
        totalUser={totalUser}
        searchQuery={searchQuery}
        onTotalChange={setTotalUser}
        selectedFilter={selectedFilter}
        page={currentPage}
        size={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default OpomRegisteredPeopleList;
