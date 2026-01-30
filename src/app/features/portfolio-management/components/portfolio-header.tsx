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
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white leading-[48px] mb-1.5">
          Project Portfolio Management
        </h1>
        <div className="w-[157px] h-1.5 bg-[#FFBA00] rounded" />
      </div>

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
