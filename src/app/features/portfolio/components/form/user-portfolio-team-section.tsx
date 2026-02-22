import AddMemberModal from '@/app/features/portfolio-management/components/add-member-modal';
import TeamCard from '@/app/features/portfolio-management/components/team-card';
import { Button } from '@/components/ui/button';
import type {
  Member,
  Member as ModalMember,
} from '@/types/portfolio-management';
import { Plus } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { TeamData } from '../../../portfolio-management/constants/data';
import type { PortfolioFormValues } from '../../../portfolio-management/portfolio-schema';

interface PortfolioTeamSectionProps {
  form: UseFormReturn<PortfolioFormValues>;
  handleAddTeam: () => void;
  handleRemoveTeam: (teamId: string) => void;
  onUpdateTeam: (updatedTeam: TeamData) => void;
  handleSaveTeamMembers: (
    selectedMembers: ModalMember[],
    teamName: string,
  ) => void;
  handleRemoveTeamMembers: (
    teamId: string,
    updatedMembers: ModalMember[],
  ) => void;
  setActiveTeamId: (id: string | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isReadOnly: boolean;
  getModalTeamName: () => string;
  getModalInitialMembers: () => ModalMember[];
}

export const UserPortfolioTeamSection = ({
  form,
  handleAddTeam,
  handleRemoveTeam,
  onUpdateTeam,
  handleSaveTeamMembers,
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
    <div className="space-y-6 text-white">
      <div className="text-[15px] mb-2">Team Management</div>
      {!isReadOnly && (
        <div className="flex gap-3 relative">
          <Button
            className="w-full h-10 text-sm bg-[#9C39FC] hover:bg-[#9333ea] font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1 relative"
            onClick={handleAddTeam}
          >
            Add Team
            <Plus size={15} />
          </Button>
        </div>
      )}
      {teams.length > 0 && (
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
      )}
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
    </div>
  );
};
