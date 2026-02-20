import type { TeamType } from '@/types/portfolio-management';
import { useEffect, useState } from 'react';
import {
  useCreateTeam,
  useDeleteTeam,
  useRemoveTeamMember,
} from './use-portfolio-query';

export const useTeamCard = (
  team: TeamType,
  onUpdate: (updatedTeam: TeamType) => void,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTeam, setEditedTeam] = useState<TeamType>(team);
  const [openMemberActionId, setOpenMemberActionId] = useState<
    string | number | null
  >(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteContext, setDeleteContext] = useState<{
    type: 'TEAM' | 'MEMBER';
    id?: string | number;
  } | null>(null);

  const createTeamMutation = useCreateTeam();
  const deleteTeamMutation = useDeleteTeam();
  const removeTeamMemberMutation = useRemoveTeamMember();

  useEffect(() => {
    setEditedTeam(team);
  }, [team]);

  const handleSave = async () => {
    try {
      if (team.id.toString().startsWith('team-')) {
        const response = await createTeamMutation.mutateAsync(editedTeam);

        if (response && response.data && response.data.id) {
          // Store team ID in localStorage
          const storedIds = localStorage.getItem('temp_portfolio_team_ids');
          const teamIds = storedIds ? JSON.parse(storedIds) : [];
          if (!teamIds.includes(response.data.id)) {
            teamIds.push(response.data.id);
            localStorage.setItem(
              'temp_portfolio_team_ids',
              JSON.stringify(teamIds),
            );
          }

          // Update with new ID
          onUpdate({ ...editedTeam, id: response.data.id.toString() });
        }
      } else {
        // For existing teams,  update local state
        onUpdate(editedTeam);
      }

      setIsEditing(false);
      setOpenMemberActionId(null);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const handleRemoveMember = async (memberId: string | number) => {
    // Optimistic update
    const updatedMembers = editedTeam.members.filter((m) => m.id !== memberId);
    setEditedTeam({
      ...editedTeam,
      count: updatedMembers.length,
      members: updatedMembers,
    });

    if (!team.id.toString().startsWith('team-') && memberId) {
      try {
        await removeTeamMemberMutation.mutateAsync({
          teamId: team.id,
          memberId,
        });
      } catch (error) {
        console.error('Failed to remove member:', error);
      }
    }
  };

  const initiateDeleteTeam = () => {
    setDeleteContext({ type: 'TEAM' });
    setDeleteDialogOpen(true);
  };

  const initiateRemoveMember = (memberId: string | number) => {
    setDeleteContext({ type: 'MEMBER', id: memberId });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (onDelete: (teamId: string) => void) => {
    if (!deleteContext) return;

    if (deleteContext.type === 'TEAM') {
      onDelete(team.id);
      // If team has real ID, call API
      if (!team.id.toString().startsWith('team-')) {
        deleteTeamMutation
          .mutateAsync(team.id)
          .catch((err) => console.error(err));
      }
    } else if (deleteContext.type === 'MEMBER' && deleteContext.id) {
      handleRemoveMember(deleteContext.id);
    }
    setDeleteDialogOpen(false);
    setDeleteContext(null);
  };

  const handleRoleChange = (
    memberId: string | number,
    newRole: 'Team Leader' | 'Member',
  ) => {
    let updatedMembers = editedTeam.members;

    if (newRole === 'Team Leader') {
      updatedMembers = updatedMembers.map((m) =>
        m.id === memberId
          ? { ...m, role: 'Team Leader' }
          : { ...m, role: 'Member' },
      );
    } else {
      updatedMembers = updatedMembers.map((m) =>
        m.id === memberId ? { ...m, role: newRole } : m,
      );
    }

    setEditedTeam({ ...editedTeam, members: updatedMembers });
    setOpenMemberActionId(null);
  };

  const updateTeamName = (name: string) => {
    setEditedTeam({ ...editedTeam, name });
  };

  return {
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
  };
};
