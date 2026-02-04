import Title from '@/components/ui/title';
import { useNavigate } from 'react-router-dom';
import ManagementControlBar from './management-control-bar';

type FilterStatus = 'All' | 'In Progress' | 'Completed' | 'Unqualified';

interface PortfolioHeaderProps {
  onSearch?: (query: string) => void;
  viewMode?: 'list' | 'gallery';
  onChangeViewMode?: (mode: 'list' | 'gallery') => void;
  onFilterByStatus?: (status: FilterStatus) => void;
}

const PortfolioHeader = ({
  onSearch,
  viewMode = 'list',
  onChangeViewMode,
  onFilterByStatus,
}: PortfolioHeaderProps) => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/admin/portfolio-management/create-portfolio');
  };

  return (
    <>
      <Title
        showSearch={false}
        showFilter={false}
        title="Project Portfolio Management"
      />

      <ManagementControlBar
        title="Project Portfolio Management"
        onSearch={onSearch}
        viewMode={viewMode}
        onChangeViewMode={onChangeViewMode}
        onCreateProject={handleCreateProject}
        onFilterByStatus={onFilterByStatus}
      />
    </>
  );
};

export default PortfolioHeader;
