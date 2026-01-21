import type { Member } from '@/types/portfolio-management';
import { useState } from 'react';

export interface TeamType {
  id: string;
  name: string;
  count: number;
  members: Member[];
}

export const useTeamManagement = (initialTeams: TeamType[] = []) => {
  const [addedTeams, setAddedTeams] = useState<TeamType[]>(initialTeams);
  const [activeModalTeamId, setActiveModalTeamId] = useState<string | null>(
    null,
  );

  const handleRemoveTeam = (id: string) => {
    setAddedTeams(addedTeams.filter((team) => team.id !== id));
  };

  const handleAddMemberToTeam = (selectedUsers: Member[], teamName: string) => {
    if (activeModalTeamId) {
      if (activeModalTeamId === 'new-team') {
        setAddedTeams([
          ...addedTeams,
          {
            id: crypto.randomUUID(),
            name: teamName,
            count: selectedUsers.length,
            members: selectedUsers,
          },
        ]);
      } else {
        setAddedTeams(
          addedTeams.map((team) => {
            if (team.id === activeModalTeamId) {
              const newMembers = selectedUsers.filter(
                (newUser) =>
                  !team.members.some((existing) => existing.id === newUser.id),
              );

              const updatedTeam = {
                ...team,
                name: teamName,
                count: team.members.length + newMembers.length,
                members: [...team.members, ...newMembers],
              };

              if (newMembers.length === 0 && team.name === teamName)
                return team;

              return updatedTeam;
            }
            return team;
          }),
        );
      }
    }
  };

  const handleUpdateTeam = (updatedTeam: TeamType) => {
    setAddedTeams(
      addedTeams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
    );
  };

  const openAddMemberModal = (teamId: string) => {
    setActiveModalTeamId(teamId);
  };

  const closeModal = () => {
    setActiveModalTeamId(null);
  };

  const getModalTeamName = () => {
    if (activeModalTeamId === 'new-team') {
      return `Team ${addedTeams.length + 1}`;
    }
    return addedTeams.find((t) => t.id === activeModalTeamId)?.name || '';
  };

  const getModalInitialMembers = () => {
    if (activeModalTeamId === 'new-team') {
      return [];
    }
    return addedTeams.find((t) => t.id === activeModalTeamId)?.members || [];
  };

  return {
    addedTeams,
    setAddedTeams,
    activeModalTeamId,
    isModalOpen: !!activeModalTeamId,
    handleRemoveTeam,
    handleAddMemberToTeam,
    handleUpdateTeam,
    openAddMemberModal,
    closeModal,
    getModalTeamName,
    getModalInitialMembers,
  };
};
