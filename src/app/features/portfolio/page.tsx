import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSortDirection } from '../../../lib/get-sort-direction';
import PortfolioTitle, {
  type FilterConfig,
} from './components/portfolio-title';
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
      { label: 'All', value: '' },
      { label: 'Planning', value: 'PENDING' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
      { label: 'Completed', value: 'COMPLETED' },
      { label: 'Unqualified', value: 'UNQUALIFIED' },
    ],
  },
];

const Portfolio = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );
  const [pjStatus, setPjStatus] = useState<string>('');
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
      <PortfolioTitle
        onCreate={() => navigate('/portfolios/create-portfolio')}
        showSearch
        initSelectedFilter={selectedFilter}
        title="Project Portfolios"
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
