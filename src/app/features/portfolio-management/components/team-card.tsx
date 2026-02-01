import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
import type { TeamType } from '@/types/portfolio-management';
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Pencil,
  Plus,
  X,
} from 'lucide-react';
import { useTeamCard } from '../hooks/use-team-card';

interface TeamCardProps {
  team: TeamType;
  onUpdate: (updatedTeam: TeamType) => void;
  onDelete: (teamId: string) => void;
  onAddMemberClick: (teamId: string) => void;
}

const TeamCard = ({
  team,
  onUpdate,
  onDelete,
  onAddMemberClick,
}: TeamCardProps) => {
  const {
    isEditing,
    setIsEditing,
    isExpanded,
    setIsExpanded,
    editedTeam,
    openMemberActionId,
    setOpenMemberActionId,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteContext,
    handleSave,
    initiateDeleteTeam,
    initiateRemoveMember,
    handleConfirmDelete,
    handleRoleChange,
    updateTeamName,
  } = useTeamCard(team, onUpdate);

  console.log(team);

  return (
    <>
      <div className="bg-[#1e293b] rounded-lg group border border-[#FFFFFF]/5">
        <div className="p-3">
          {/* Header */}
          <div className="flex justify-between items-center h-9">
            {isEditing ? (
              <input
                type="text"
                value={editedTeam.name}
                onChange={(e) => updateTeamName(e.target.value)}
                className="bg-[#334155] border border-[#475569] rounded px-2 py-1 text-white text-sm font-medium focus:outline-none focus:border-[#9C39FC]"
              />
            ) : (
              <span className="text-[#CAD5E2] text-sm font-medium">
                {team.name}{' '}
                <span className="text-[#9C39FC] ml-1">({team.count})</span>
              </span>
            )}

            {isEditing ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={initiateDeleteTeam}
                  className="text-[#EF4444] hover:text-[#DC2626] text-sm font-medium"
                >
                  Delete Team
                </button>
                <Button
                  onClick={handleSave}
                  className="bg-[#9C39FC] hover:bg-[#8B31E0] text-white h-8 px-4"
                >
                  Save
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors text-sm"
              >
                Edit Team <Pencil size={14} />
              </button>
            )}
          </div>

          {/* Content */}
          {isExpanded ? (
            <div className="space-y-2 mt-4">
              {editedTeam.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-3 py-1 bg-[#1E293B]"
                >
                  <div className="flex items-center gap-12 flex-1">
                    <div className="flex items-center gap-3 w-[200px]">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full border border-[#475569] object-cover"
                      />
                      <span className="text-white font-medium text-sm">
                        {member.name}
                      </span>
                    </div>
                    <span className="text-[#94A3B8] text-sm flex-1">
                      {member.email}
                    </span>
                    <span className="text-white text-sm w-[120px]">
                      {member.role || 'Member'}
                    </span>
                  </div>

                  {isEditing && (
                    <div className="relative">
                      <button
                        className="text-[#94A3B8] hover:text-white p-1"
                        onClick={() =>
                          setOpenMemberActionId(
                            openMemberActionId === member.id
                              ? null
                              : (member.id ?? null),
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMemberActionId === member.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-[#0F172A] border border-[#334155] rounded-lg shadow-xl z-20 overflow-hidden py-1">
                          {member.role === 'Team Leader' ? (
                            <>
                              <div className="w-full text-left px-4 py-2 text-sm text-[#9C39FC] font-medium cursor-default">
                                Team Leader
                              </div>
                              <button
                                onClick={() =>
                                  handleRoleChange(member.id!, 'Member')
                                }
                                className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#1E293B] hover:text-white transition-colors"
                              >
                                Demote to member
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleRoleChange(member.id!, 'Team Leader')
                                }
                                className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#1E293B] hover:text-white transition-colors"
                              >
                                Promote to Team Leader
                              </button>
                              <div className="w-full text-left px-4 py-2 text-sm text-[#9C39FC] font-medium cursor-default">
                                Member
                              </div>
                            </>
                          )}

                          <button
                            onClick={() => initiateRemoveMember(member.id!)}
                            className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#1E293B] transition-colors"
                          >
                            Remove from team
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Collapsed View */
            <div className="flex items-center space-x-2 overflow-hidden py-2 pl-1">
              {editedTeam.members.map((member) => (
                <div key={member.id} className="relative group/avatar">
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-[#334155] object-cover"
                    src={member.avatarUrl}
                    alt={member.name}
                  />
                  {isEditing && (
                    <button
                      onClick={() => initiateRemoveMember(member.id!)}
                      className="absolute -top-1 -right-1 bg-[#EF4444] rounded-full p-0.5 ring-2 ring-[#1e293b] text-white hover:bg-[#DC2626]"
                    >
                      <X size={10} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => onAddMemberClick(team.id.toString())}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#334155] ring-2 ring-[#1e293b] text-[#94A3B8] hover:bg-[#475569] hover:text-white transition-colors z-10"
                title="Add member"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Footer / Expand Toggle */}
        <div className="flex justify-center mt-2 border-t border-[#334155] bg-[#314158] rounded-b-lg">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#94A3B8] flex w-full items-center justify-center hover:text-white p-1"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleConfirmDelete(onDelete)}
        title={
          deleteContext?.type === 'TEAM'
            ? 'Delete Entire Team?'
            : 'Remove Member?'
        }
        description={
          deleteContext?.type === 'TEAM'
            ? 'Are you sure you want to delete this team? This action cannot be undone.'
            : 'Are you sure you want to remove this member from the team?'
        }
        confirmText={deleteContext?.type === 'TEAM' ? 'Delete Team' : 'Remove'}
      />
    </>
  );
};

export default TeamCard;
