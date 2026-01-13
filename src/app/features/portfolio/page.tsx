import Title from '@/components/ui/title';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioSectionContainer from './components/portfolio-section-container';
import { reactToProject } from './services/portfolio-service';
import { getSortDirection } from '../../../lib/get-sort-direction';

const Portfolio = () => {
  const filterOptions = ['Popular', 'Newest', 'Oldest'];
  const [query, setQuery] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const navigate = useNavigate();

  const handleReact = async (projectId: number) => {
    try {
      await reactToProject(projectId);
      console.log('👍 Reacted successfully to project:', projectId);
      // Optional: refresh list or increment like count locally
    } catch (error) {
      console.error('❌ Error reacting:', error);
    }
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    const sortDir = getSortDirection(filter);

    if (sortDir) setSortDirection(sortDir);
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
        filterOptions={filterOptions}
        onFilterChange={handleFilter}
      />
      <PortfolioSectionContainer query={query} sortDirection={sortDirection} />
    </div>
  );
};

export default Portfolio;