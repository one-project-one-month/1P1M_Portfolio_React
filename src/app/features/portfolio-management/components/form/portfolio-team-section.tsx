import { Button } from '@/components/ui/button';
import type {
  Member,
  Member as ModalMember,
} from '@/types/portfolio-management';
import { Plus } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { TeamData } from '../../constants/data';
import type { PortfolioFormValues } from '../../portfolio-schema';
import AddMemberModal from '../add-member-modal';
import TeamCard from '../team-card';

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
  handleRemoveTeam,
  handleSaveTeamMembers,
  onUpdateTeam,
  setActiveTeamId,
  isModalOpen,
  setIsModalOpen,
  isReadOnly,
  getModalTeamName,
  getModalInitialMembers,
}: PortfolioTeamSectionProps) => {
  const teams = form.watch('teams');

  const handleAddMemberClick = (teamId: string) => {
    setActiveTeamId(teamId);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (teamId: string, updatedMembers: Member[]) => {
    const currentTeams = form.getValues('teams');
    form.setValue(
      'teams',
      currentTeams.map((t) =>
        t.id === teamId
          ? { ...t, count: updatedMembers.length, members: updatedMembers }
          : t,
      ),
    );
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
            <TeamCard
              key={team.id}
              team={team}
              onUpdate={onUpdateTeam}
              onDelete={handleRemoveTeam}
              onDeleteMember={handleDeleteMember}
              onAddMemberClick={handleAddMemberClick}
              isReadOnly={isReadOnly}
            />
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
