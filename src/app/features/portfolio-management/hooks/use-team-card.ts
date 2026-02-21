import type { Member, TeamType } from '@/types/portfolio-management';
import { useEffect, useState } from 'react';
import {
  useDeleteTeam,
  useRemoveTeamMember,
  useUpdateTeam,
} from './use-portfolio-query';

export const useTeamCard = (
  team: TeamType,
  onUpdate: (updatedTeam: TeamType) => void,
  onDeleteMember: (teamId: string, updatedMembers: Member[]) => void,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTeam, setEditedTeam] = useState<TeamType>(team);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const updateTeamMutation = useUpdateTeam();
  const deleteTeamMutation = useDeleteTeam();
  const removeTeamMemberMutation = useRemoveTeamMember();

  useEffect(() => {
    setEditedTeam(team);
  }, [team]);

  const handleSave = async () => {
    try {
      const isRealTeam = !team.id.toString().startsWith('team-');

      if (isRealTeam && editedTeam.name !== team.name) {
        updateTeamMutation.mutate({
          teamId: editedTeam.id,
          teamName: editedTeam.name,
        });
      }

      onUpdate(editedTeam);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save team:', error);
    }
  };

  const handleRemoveMember = async (memberId: string | number) => {
    const updatedMembers = editedTeam.members.filter((m) => m.id !== memberId);
    setEditedTeam({
      ...editedTeam,
      count: updatedMembers.length,
      members: updatedMembers,
    });

    onDeleteMember(team.id, updatedMembers);

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
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (onDelete: (teamId: string) => void) => {
    onDelete(team.id);
    if (!team.id.toString().startsWith('team-')) {
      deleteTeamMutation
        .mutateAsync(team.id)
        .catch((err) => console.error(err));
    }
    setDeleteDialogOpen(false);
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
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleSave,
    initiateDeleteTeam,
    handleRemoveMember,
    handleConfirmDelete,
    updateTeamName,
  };
};
