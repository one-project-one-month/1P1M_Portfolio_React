import InputField from '@/components/ui/input-field';
import { COLORS } from '@/constants/colors';
import { useDebounce } from '@/hooks/use-debounce';
import { Check, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IdeaHeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  viewMode: string;
  setViewMode: (mode: 'list' | 'grid') => void;
  totalIdeas: number;
  onCreate: () => void;
}

const HeaderSection = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  viewMode,
  setViewMode,
  totalIdeas,
  onCreate,
}: IdeaHeaderProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearchIdea = (val: string) => {
    setInputValue(val);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-24">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Ideas List</h1>
            <div className={`h-1 w-24 bg-[${COLORS.secondary}] `}></div>
          </div>

          {/* Search Box */}
          <div className="relative w-[800px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

            <InputField
              type="text"
              placeholder="Search by project title"
              value={inputValue}
              onChange={(e) => handleSearchIdea(e.target.value)}
              // Overriding/adding classes to accommodate the icon and width
              className="w-full pl-12"
            />
          </div>

          <button
            onClick={onCreate}
            className={`px-6 py-2 bg-[${COLORS.primary}] hover:bg-purple-700 text-white/80 font-medium rounded-lg transition-colors`}
          >
            Create Idea
          </button>
        </div>

        {/* Total Count and Filters Section */}
        <div className="flex items-center justify-between">
          {/* Total Count */}
          <div className="text-white">
            <span className={`text-[${COLORS.secondary}] font-semibold`}>
              Total -{' '}
            </span>
            <span className={`text-[${COLORS.secondary}]`}>{totalIdeas}</span>
          </div>

          {/* View Controls and Filter */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggles */}
            <div className="flex items-center gap-2 p-1">
              <button
                onClick={() => setViewMode('list')}
                className="p-2 rounded transition-colors"
                style={{
                  color: viewMode === 'list' ? COLORS.primary : 'white',
                }}
                title="List View"
              >
                <List className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className="p-2 rounded transition-colors"
                style={{
                  color: viewMode === 'grid' ? COLORS.primary : 'white',
                }}
                title="Grid View"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
            </div>

            {/* Filter by Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-700/40 text-white rounded-lg transition-colors border"
                style={{ borderColor: COLORS.primary }}
              >
                <span>Filter by Status</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-500 transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {filterOpen && (
                <div className="absolute left-0 mt-1 w-full min-w-[160px] flex flex-col gap-1 z-10">
                  {['All', 'Pending', 'Approved', 'Archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleFilterSelect(status)}
                      className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        {selectedFilter === status && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{status}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
