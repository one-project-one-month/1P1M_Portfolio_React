import Title from '@/components/ui/title';
import { useNavigate } from 'react-router-dom';
import ManagementControlBar from './management-control-bar';
import type {
  OrderFilterOption,
  StatusFilterOption,
} from './status-filter-dropdown';

interface PortfolioHeaderProps {
  onSearch?: (query: string) => void;
  viewMode?: 'list' | 'gallery';
  onChangeViewMode?: (mode: 'list' | 'gallery') => void;
  onFilterByStatus?: (status: StatusFilterOption) => void;
  onFilterByOrder?: (order: OrderFilterOption) => void;
}

const PortfolioHeader = ({
  onSearch,
  viewMode = 'list',
  onChangeViewMode,
  onFilterByStatus,
  onFilterByOrder,
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
        onFilterByOrder={onFilterByOrder}
      />
    </>
  );
};

export default PortfolioHeader;
