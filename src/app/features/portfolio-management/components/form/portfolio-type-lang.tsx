import type { DropdownItem } from '@/types/portfolio-management';
import TypeDropdown from '../type-dropdown';

interface PortfolioTypeLangProps {
  projectType: DropdownItem | null;
  setProjectType: (type: DropdownItem | null) => void;
  languages: string;
  setLanguages: (languages: string) => void;
  isReadOnly: boolean;
}

export const PortfolioTypeLang = ({
  projectType,
  setProjectType,
  languages,
  setLanguages,
  isReadOnly,
}: PortfolioTypeLangProps) => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-medium">Type & Technologies</h2>
      <div className="flex gap-6 flex-wrap">
        <div className="space-y-1 w-[200px]">
          <label className="text-sm font-medium">Type</label>
          {isReadOnly ? (
            <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
              {projectType?.name || '-'}
            </p>
          ) : (
            <TypeDropdown
              placeholder="Type"
              menuList={[
                { id: 1, name: 'Frontend Developers' },
                { id: 2, name: 'Backend Developers' },
                { id: 3, name: 'Fullstack Developers' },
                { id: 4, name: 'UI/UX Designers' },
                { id: 5, name: 'Mobile Developers' },
                { id: 6, name: 'Machine Learning' },
                { id: 7, name: 'DevOps' },
                { id: 8, name: 'Game Developer' },
                { id: 9, name: 'Others' },
              ]}
              selectedValue={projectType}
              onChange={setProjectType}
            />
          )}
        </div>
        <div className="flex-1 space-y-1 min-w-[200px]">
          <label className="text-sm font-medium">Languages / Tools</label>
          {isReadOnly ? (
            <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
              {languages || '-'}
            </p>
          ) : (
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              placeholder="Enter your languages or tools"
              className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
