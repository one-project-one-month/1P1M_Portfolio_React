import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import { COLORS } from '@/constants/colors';
import { useDebounce } from '@/hooks/use-debounce';
import { buttonVariants } from '@/styles/button-variants';
import { Check, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ProjectIdeaHeaderType } from '../types/project-idea.types';

const ProjectIdeaHeaderSection = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  onCreate,
}: ProjectIdeaHeaderType) => {
  const [inputValue, setInputValue] = useState(filter.search);
  const [filterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(inputValue, 800);

  useEffect(() => {
    if (debouncedSearch !== filter.search) {
      setFilter({
        ...filter,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  const handleSearchIdea = (val: string) => {
    setInputValue(val);
  };

  const handleStatus = (status: string) => {
    setFilter({ ...filter, status });
    setFilterOpen(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col gap-y-10 py-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white ps-2 mb-2">
            Ideas List
          </h1>
          <div
            className={`h-1.5 w-16 md:w-24 rounded-lg bg-[${COLORS.secondary}] `}
          ></div>
        </div>

        {/* Total Count and Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96 lg:w-100">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

            <InputField
              type="text"
              placeholder="Search by project title"
              value={inputValue}
              onChange={(e) => handleSearchIdea(e.target.value)}
              className="w-full pl-12"
            />
          </div>

          {/* View Controls and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* View Mode Toggles */}
            <div className="flex items-center gap-2 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'text-[#6F28B3]' : 'text-white'}`}
                title="List View"
              >
                <List className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'text-[#6F28B3]' : 'text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
            </div>

            {/* Filter by Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-2 px-6 py-2 bg-transparent hover:bg-slate-700/40 text-white rounded-lg transition-colors border border-[#6F28B3]!`}
              >
                <span>Filter by Status</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-500 transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {filterOpen && (
                <div className="absolute left-0 mt-1 w-full min-w-40 flex flex-col gap-1 z-10">
                  {['All', 'Pending', 'Approved', 'Archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatus(status)}
                      className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        {filter.status === status && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{status}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Create button */}
            <Button
              onClick={onCreate}
              className={buttonVariants({ variant: 'primary' })}
            >
              Create Idea
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectIdeaHeaderSection;
