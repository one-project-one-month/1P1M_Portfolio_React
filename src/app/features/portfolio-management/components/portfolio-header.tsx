import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioHeader = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/admin/portfolio-management/create-portfolio');
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-3">
      {/* Title */}
      <h1 className="mb-2 text-2xl font-bold">Project Portfolio Management</h1>

      {/* Search Bar */}
      <div className="flex items-center justify-between rounded-lg border border-[#FFFFFF26] bg-[#FFFFFF17] px-4 py-2.5">
        <Search className="h-5 w-5 mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full bg-transparent text-sm text-white outline-none placeholder-gray-400"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* View Toggles */}
        <div className="hidden items-center gap-2 sm:flex">
          <button className="rounded p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <List className="h-6 w-6" />
          </button>
          <button className="rounded p-1.5 text-[#9C39FC] bg-white/10">
            <LayoutGrid className="h-6 w-6" />
          </button>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreateProject}
          className="bg-[#9C39FC] text-white text-sm font-medium rounded-lg px-6"
        >
          Create a project
        </Button>
      </div>
    </div>
  );
};

export default PortfolioHeader;
