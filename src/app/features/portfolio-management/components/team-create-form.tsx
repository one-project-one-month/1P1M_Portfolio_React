import type { TeamType } from '@/types/portfolio-management';
import TeamCard from './team-card';

interface TeamFormProps {
  addedTeams: TeamType[];
  onAddMemberClick: (teamId: string) => void;
  onUpdateTeam: (updatedTeam: TeamType) => void;
  onDeleteTeam: (teamId: string) => void;
}

const TeamCreateForm = ({
  addedTeams,
  onAddMemberClick,
  onUpdateTeam,
  onDeleteTeam,
}: TeamFormProps) => {
  return (
    <div className="space-y-3">
      {addedTeams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onDelete={onDeleteTeam}
          onUpdate={onUpdateTeam}
          onAddMemberClick={onAddMemberClick}
        />
      ))}
    </div>
  );
};

export default TeamCreateForm;
