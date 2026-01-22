import { Button } from '@/components/ui/button';
import type { Member as ModalMember } from '@/types/portfolio-management';
import { Plus } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { TeamData } from '../../constants/data';
import type { PortfolioFormValues } from '../../portfolio-schema';
import AddMemberModal from '../add-member-modal';
import TeamForm from '../team-create-form';

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

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Team Management</h2>
        {!isReadOnly && (
          <div className="flex gap-3 relative">
            <Button
              className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1 relative"
              onClick={handleAddTeam}
            >
              <Plus size={18} />
              Add Team
            </Button>
          </div>
        )}
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
        />
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
