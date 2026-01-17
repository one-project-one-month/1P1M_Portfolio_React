import StatusFilterDialog from '@/app/features/portfolio-management/components/status-filter-dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { useState } from 'react';

type ProjectStatus = 'In Progress' | 'Completed' | 'Unqualified';

interface ManagementControlBarProps {
  title?: string;
  onSearch?: (query: string) => void;
  viewMode?: 'list' | 'gallery';
  onChangeViewMode?: (mode: 'list' | 'gallery') => void;
  onCreateProject?: () => void;
  onFilterByStatus?: (status: ProjectStatus) => void;
}

const ManagementControlBar = ({
  onSearch,
  viewMode = 'list',
  onChangeViewMode,
  onCreateProject,
  onFilterByStatus,
}: ManagementControlBarProps) => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const handleStatusFilter = (status: ProjectStatus) => {
    onFilterByStatus?.(status);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="w-[585px] h-12 px-4 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.09)] flex items-center gap-1.5">
            <Search className="w-5 h-5 text-[#6A7282]" />
            <input
              type="text"
              placeholder="Search by Name"
              className="flex-1 bg-transparent text-[#6A7282] text-sm outline-none placeholder:text-[#6A7282]"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                className="p-1"
                onClick={() => onChangeViewMode?.('list')}
              >
                <List
                  className={`w-6 h-6 ${viewMode === 'list' ? 'text-[#D1A4FE]' : 'text-[#6A7282]'}`}
                />
              </button>
              <button
                className="p-1"
                onClick={() => onChangeViewMode?.('gallery')}
              >
                <LayoutGrid
                  className={`w-6 h-6 ${viewMode === 'gallery' ? 'text-[#D1A4FE]' : 'text-[#6A7282]'}`}
                />
              </button>
            </div>

            <button
              className="h-9 px-4 rounded-lg border border-[#9C39FC] flex items-center gap-1.5"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <span className="text-sm font-medium text-white">
                Filter by Status
              </span>
              <ChevronDown className="w-6 h-6 text-[#9C39FC]" />
            </button>

            <Button variant="primary" size="primary" onClick={onCreateProject}>
              Create Idea
            </Button>
          </div>
        </div>
      </div>

      <StatusFilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onConfirm={handleStatusFilter}
      />
    </>
  );
};

export default ManagementControlBar;
