import type { TeamType } from '@/types/portfolio-management';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    setEditedTeam(team);
  }, [team]);

  const handleSave = () => {
    onUpdate(editedTeam);
    setIsEditing(false);
    setOpenMemberActionId(null);
  };

  const handleRemoveMember = (memberId: string | number) => {
    const updatedMembers = editedTeam.members.filter((m) => m.id !== memberId);
    setEditedTeam({
      ...editedTeam,
      count: updatedMembers.length,
      members: updatedMembers,
    });
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
