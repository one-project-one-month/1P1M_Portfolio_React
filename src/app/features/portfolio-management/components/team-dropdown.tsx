import type { TeamDropdownProps } from '@/types/portfolio-management';
import { teamTypes } from '../constants';

const TeamDropdown = ({ onAddTeam }: TeamDropdownProps) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-[#1f2937] border border-[#374151] rounded-lg shadow-xl z-50 overflow-hidden">
      {teamTypes.map((type) => (
        <button
          key={type}
          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#374151] hover:text-white transition-colors border-b border-[#374151] last:border-0"
          onClick={() => onAddTeam(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TeamDropdown;
