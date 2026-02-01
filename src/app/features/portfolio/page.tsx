import Title from '@/components/ui/title';
import type { FilterConfig } from '@/types/title-props';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSortDirection } from '../../../lib/get-sort-direction';
import PortfolioSectionContainer from './container/portfolio-section-container';

const filterConfig: FilterConfig[] = [
  {
    key: 'order',
    label: 'Order',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Popular', value: 'popular' },
      { label: 'Newest', value: 'Newest' },
      { label: 'Oldest', value: 'Oldest' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Planning', value: 'planning' },
      { label: 'In Progress', value: 'in_progress' },
      { label: 'Completed', value: 'completed' },
      { label: 'Unqualified', value: 'unqualified' },
    ],
  },
];

const Portfolio = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );
  const [pjStatus, setPjStatus] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();

  const handleFilter = (key: string, value: string) => {
    setSelectedFilter(value);
    if (key === 'order') {
      const sortDir = getSortDirection(value);
      if (sortDir) setSortDirection(sortDir);
    }

    if (key === 'status') {
      setPjStatus(value);
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Title
        onCreate={() => navigate('/portfolio/create-portfolio')}
        showSearch
        initSelectedFilter={selectedFilter}
        title="Project Portfolio"
        searchPlaceholder="Search By Projects"
        onSearchChange={(e) => handleSearch(e.target.value)}
        filterConfig={filterConfig}
        onFilterChange={handleFilter}
      />
      <PortfolioSectionContainer
        query={query}
        sortDirection={sortDirection}
        status={pjStatus}
      />
    </div>
  );
};

export default Portfolio;
