import AddMemberModal from '@/app/features/portfolio-management/components/add-member-modal';
import { Button } from '@/components/ui/button';
import type { Member as ModalMember } from '@/types/portfolio-management';
import { Plus } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { TeamData } from '../../../portfolio-management/constants/data';
import type { PortfolioFormValues } from '../../../portfolio-management/portfolio-schema';
import TeamForm from './team-create-form';

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
  getModalTeamName: () => string;
  getModalInitialMembers: () => ModalMember[];
}

export const UserPortfolioTeamSection = ({
  form,
  handleAddTeam,
  handleRemoveTeam,
  onUpdateTeam,
  handleSaveTeamMembers,
  handleRemoveTeamMembers,
  setActiveTeamId,
  isModalOpen,
  setIsModalOpen,
  getModalTeamName,
  getModalInitialMembers,
}: PortfolioTeamSectionProps) => {
  const teams = form.watch('teams');

  return (
    <div className="space-y-6 text-white mt-4">
      <span className="font-medium">Team Management</span>
      <div className="flex gap-3 relative mt-2">
        <Button
          className="w-full bg-[#9C39FC] hover:bg-[#9333ea] text-base font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1 relative"
          onClick={handleAddTeam}
        >
          <Plus size={18} />
          Add Team
        </Button>
      </div>
      {teams.length > 0 ? (
        <TeamForm
          addedTeams={teams}
          onAddMemberClick={(teamId) => {
            setActiveTeamId(teamId);
            setIsModalOpen(true);
          }}
          onUpdateTeam={(team) => onUpdateTeam(team as TeamData)}
          onDeleteTeam={handleRemoveTeam}
          onDeleteMember={(teamId, members) =>
            handleRemoveTeamMembers(teamId, members)
          }
        />
      ) : (
        <p className="text-white/50 text-sm">No teams added yet.</p>
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
