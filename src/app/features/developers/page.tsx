import Title from '@/components/ui/title';
import { getSortDirection } from '@/lib/get-sort-direction';
import type { FilterConfig } from '@/types/title-props';
import { useState } from 'react';
import DeveloperSectionContainer from './components/developer-section-container';

const filterConfig: FilterConfig[] = [
  {
    key: 'order',
    label: 'Role',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Newest', value: 'Newest' },
      { label: 'Oldest', value: 'Oldest' },
    ],
  },
];

const Developer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );

  const handleFilter = (key: string, value: string) => {
    if (key === 'order') {
      const sortDir = getSortDirection(value);
      if (sortDir) setSortDirection(sortDir);
    }
  };

  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Developer Profiles"
        showSearch
        showFilter
        searchPlaceholder="Search by developer name or skill"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterConfig={filterConfig}
        onFilterChange={handleFilter}
      />

      <DeveloperSectionContainer
        searchTerm={searchTerm}
        sortDirection={sortDirection}
      />
    </div>
  );
};

export default Developer;
