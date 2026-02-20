import InputField from '@/components/ui/input-field';
import Title from '@/components/ui/title.tsx';
import { useDebounce } from '@/hooks/use-debounce';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { OpomRegisteredListtHeaderType } from '../types/opom-registered-list-type';

export const OpomRegisteredListHeader = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
}: OpomRegisteredListtHeaderType) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchKeyword, 800);
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);
  const handleSearch = (input: string) => {
    setSearchKeyword(input);
  };
  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };
  return (
    <div className="flex flex-col gap-y-10 py-6">
      <Title
        title="OPOM Registered User List"
        showSearch={false}
        showFilter={false}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-96 lg:w-100">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

          <InputField
            type="text"
            placeholder="Search by project title"
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12"
          />
        </div>

        {/*Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                {['All', 'Backend', 'Frontend', 'Designer'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleFilter(role)}
                    className="w-full text-left px-4 py-2 text-white bg-[#0f172a] transition-colors flex items-center gap-3 border border-white/60 rounded-lg"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {selectedFilter === role && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
