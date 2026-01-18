import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { TeamData } from '../../constants/data';

interface PortfolioTeamSectionProps {
  teams: TeamData[];
  handleAddTeam: () => void;
  handleRemoveTeam: (teamId: string) => void;
  isReadOnly: boolean;
}

export const PortfolioTeamSection = ({
  teams,
  handleAddTeam,
  handleRemoveTeam,
  isReadOnly,
}: PortfolioTeamSectionProps) => {
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Team Management</h2>
        {!isReadOnly && (
          <Button
            className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-md px-3 py-1.5 text-[#F9FAFB] gap-1 relative"
            onClick={handleAddTeam}
          >
            <Plus size={18} />
            Add Team
          </Button>
        )}
      </div>

      {teams.length > 0 ? (
        <div className="space-y-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-[#1e293b] rounded-lg border border-[#FFFFFF]/10 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#CAD5E2] text-sm font-medium">
                  {team.name}{' '}
                  <span className="text-[#9C39FC]">({team.count})</span>
                </span>
                {!isReadOnly && (
                  <button
                    onClick={() => handleRemoveTeam(team.id)}
                    className="text-[#EF4444] hover:text-[#DC2626] text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 bg-[#334155] rounded-full px-3 py-1"
                  >
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#9C39FC] flex items-center justify-center text-xs font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm text-white">{member.name}</span>
                    {member.role === 'Team Leader' && (
                      <span className="text-xs text-[#9C39FC]">(Leader)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-sm">No teams added yet.</p>
      )}
    </div>
  );
};
