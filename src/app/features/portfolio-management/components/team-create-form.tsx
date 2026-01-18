import type { TeamType } from '@/types/portfolio-management';
import { Plus, SquarePen, Trash2 } from 'lucide-react';

interface TeamFormProps {
  addedTeams: TeamType[];
  handleRemoveTeam: (id: string) => void;
}

const TeamForm = ({ addedTeams, handleRemoveTeam }: TeamFormProps) => {
  return (
    <div className="space-y-3">
      {addedTeams.map((team) => (
        <div
          key={team.id}
          className="bg-[#1e293b] rounded-lg p-4 group border border-[#FFFFFF]/5"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#CAD5E2] text-sm font-normal">
                {team.name}
              </span>
              <span className="bg-[#314158] text-[#CAD5E2] text-sm font-normal px-3 py-1.5 rounded">
                {team.count}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-md hover:bg-[#334155] text-gray-400 hover:text-white transition-colors">
                <SquarePen size={18} />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-[#334155] text-red-500 hover:text-red-300 transition-colors"
                onClick={() => handleRemoveTeam(team.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="flex mt-4 gap-2">
            <button className="h-11 w-11 rounded-full bg-[#C4C4C4] flex items-center justify-center text-slate-900 hover:bg-[#475569] hover:text-white transition-colors">
              <Plus size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamForm;
