import { Button } from '@/components/ui/button';
import type { Member as ModalMember } from '@/types/portfolio-management';
import { ChevronDown, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { TeamData } from '../../constants/data';
import type { PortfolioFormValues } from '../../portfolio-schema';
import AddMemberModal from '../add-member-modal';

interface PortfolioTeamSectionProps {
  form: UseFormReturn<PortfolioFormValues>;
  handleAddTeam: () => void;
  handleRemoveTeam: (teamId: string) => void;
  onUpdateTeam: (updatedTeam: TeamData) => void;
  handleSaveTeamMembers: (
    selectedMembers: ModalMember[],
    teamName: string,
  ) => void;
  setActiveTeamId: (id: string | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isReadOnly: boolean;
  getModalTeamName: () => string;
  getModalInitialMembers: () => ModalMember[];
}

export const PortfolioTeamSection = ({
  form,
  handleAddTeam,
  handleSaveTeamMembers,
  setActiveTeamId,
  isModalOpen,
  setIsModalOpen,
  isReadOnly,
  getModalTeamName,
  getModalInitialMembers,
}: PortfolioTeamSectionProps) => {
  const teams = form.watch('teams');
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
    {},
  );

  const toggleTeamExpanded = (teamId: string) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-[#F9FAFB] text-sm font-medium">
          Team Management
        </label>
        {!isReadOnly && (
          <Button
            className="bg-[#9C39FC] hover:bg-[#9333ea] text-sm font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1"
            onClick={handleAddTeam}
          >
            <Plus size={18} />
            Add Team
          </Button>
        )}
      </div>

      {teams.length > 0 ? (
        <div className="flex flex-col gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="px-6 py-4 bg-slate-700/30 rounded-lg border border-white/15"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-[#F3F4F6] text-sm font-normal">
                  {team.name}{' '}
                  <span className="text-slate-300 ml-1">
                    ({team.members?.length || 0})
                  </span>
                </div>
                {!isReadOnly && (
                  <button
                    className="flex items-center gap-2 text-[#CAD5E2] text-sm font-normal hover:text-white transition-colors"
                    onClick={() => {
                      setActiveTeamId(team.id);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit Team
                    <Pencil className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Team Members */}
              <div className="flex items-center gap-3 mb-4">
                {team.members
                  ?.slice(0, expandedTeams[team.id] ? undefined : 5)
                  .map((member) => (
                    <div key={member.id} className="relative">
                      <img
                        src={
                          member.avatarUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                        }
                        alt={member.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    </div>
                  ))}
                {!expandedTeams[team.id] && (team.members?.length || 0) > 5 && (
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                    +{(team.members?.length || 0) - 5}
                  </div>
                )}
              </div>

              {/* Expand Button */}
              {(team.members?.length || 0) > 5 && (
                <div className="flex justify-center pt-2">
                  <button
                    className="p-2 hover:bg-white/5 rounded transition-colors"
                    onClick={() => toggleTeamExpanded(team.id)}
                  >
                    <ChevronDown
                      className={`w-6 h-6 text-white opacity-50 transition-transform ${
                        expandedTeams[team.id] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-sm">No teams added yet.</p>
      )}

      {!isReadOnly && (
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setActiveTeamId(null);
          }}
          teamName={getModalTeamName()}
          initialMembers={getModalInitialMembers()}
          onSave={handleSaveTeamMembers}
        />
      )}
    </div>
  );
};
