import Button from '@/app/features/auth/login/components/button';
import { Check, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// type of view layout
type ViewLayout = 'list' | 'grid';

interface FilterAssetsProps<T> {
  showCreateButton?: boolean;
  showFilter?: boolean;
  showLayout?: boolean;

  viewLayout?: ViewLayout;
  onChangeLayout?: (layout: ViewLayout) => void;

  createButtonText?: string;
  filterOption?: Array<T>;
  selectedFilter?: T;

  onFilterSelect?: (option: T) => void;
  getOptionLabel?: (option: T) => string;
  onCreateClick?: () => void;
}

const FilterAssets = <T,>({
  showCreateButton = false,
  showFilter = false,
  showLayout = false,

  viewLayout = 'grid',
  onChangeLayout,
  createButtonText = 'Create a project',
  filterOption = [],
  selectedFilter,
  onFilterSelect,
  getOptionLabel,
  onCreateClick,
}: FilterAssetsProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderLabel = (option: T): string => {
    if (getOptionLabel) return getOptionLabel(option);
    return String(option);
  };

  return (
    <div className="flex items-center justify-between w-full py-4 bg-transparent">
      {/* Layout Toggles */}
      {showLayout && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeLayout?.('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewLayout === 'list'
                ? 'bg-[#364153]/50 text-[#9C39FC]'
                : 'text-[#99A1AF] hover:text-[#9C39FC]'
            }`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => onChangeLayout?.('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewLayout === 'grid'
                ? 'bg-[#364153]/50 text-[#9C39FC]'
                : 'text-[#99A1AF] hover:text-[#9C39FC]'
            }`}
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {showFilter && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 bg-[#111827] text-white border border-[#9C39FC]/70 rounded-[8px] transition group px-4 py-2
                                  ${isDropdownOpen ? 'border-[#9C39FC]' : 'text-[#99A1AF] hover:border-[#9C39FC]'}`}
            >
              <span className="text-sm font-medium">
                {selectedFilter
                  ? renderLabel(selectedFilter)
                  : 'Filter by Status'}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dynamic Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-[#364153] rounded-xl shadow-xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onFilterSelect?.(undefined as unknown as T);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors
                    ${
                      !selectedFilter
                        ? 'text-[#9C39FC] bg-[#364153]/20'
                        : 'text-[#99A1AF] hover:text-[#9C39FC]'
                    }`}
                  >
                    All Status
                    {!selectedFilter && (
                      <Check size={14} className="text-[#9C39FC]" />
                    )}
                  </button>

                  {filterOption.length > 0 && (
                    <div className="border-t border-[#364153] my-1" />
                  )}

                  {filterOption.map((option, index) => {
                    const isSelected =
                      selectedFilter &&
                      renderLabel(selectedFilter) === renderLabel(option);

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          onFilterSelect?.(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors
            ${
              isSelected
                ? 'text-[#9C39FC] bg-[#364153]/50'
                : 'text-[#99A1AF] hover:text-[#9C39FC] hover:bg-[#364153]/20'
            }`}
                      >
                        <span className="truncate mr-2">
                          {renderLabel(option)}
                        </span>
                        {isSelected && (
                          <Check size={16} className="text-[#9C39FC]" />
                        )}
                      </button>
                    );
                  })}
                  {filterOption.length === 0 && !selectedFilter && (
                    <div className="px-4 py-2 text-xs text-gray-500">
                      No other filters
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {showCreateButton && (
          <Button
            variant="primary"
            size="primary"
            className="h-11"
            onClick={onCreateClick}
          >
            {createButtonText || 'Create a project'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterAssets;

/*------------------- usage of this component --------------- */

{
  /**

  // import this
    import { useState } from 'react';
    import FilterAssets from '@/components/ui/filter-assets';

  interface Category {
    id: string;
    name: string;
  }
  const [currentLayout, setCurrentLayout] = useState<'list' | 'grid'>('list')
  const [selectedCat, setSelectedCat] = useState<Category | undefined>();

  const categories: Category[] = [
    { id: '1', name: 'Pending' },
    { id: '2', name: 'Approved' },
    { id: '3', name: 'Archived' }
    ];

  // Handlers with Console Logs
  const handleLayoutChange = (layout: 'list' | 'grid') => {
    console.log(`Layout changed to: ${layout}`);
    setCurrentLayout(layout);
  };

  const handleFilterSelect = (cat: Category | undefined) => {
    console.log(`Filter selected: ${cat ? cat.name : 'All Status'}`);
    setSelectedCat(cat);
  };

  const handleCreate = () => {
    console.log('Create Project Clicked...');
  };
    
<FilterAssets<Category>
    // button show or not option - default is false
      showFilter={true}
      showCreateButton={true}
      showLayout={true}

    // Layout Props
      viewLayout={currentLayout}
      onChangeLayout={handleLayoutChange}

    // Dropdown Props
      filterOption={categories}
      selectedFilter={selectedCat}
      onFilterSelect={handleFilterSelect}
      getOptionLabel={(cat) => cat.name} 

    // Action Props
      createButtonText="Create a project"  // optional default - Create a project
      onCreateClick={handleCreate}
/>
  
*/
}
