import type {
  DropdownItem,
  Member as ModalMember,
} from '@/types/portfolio-management';
import { useEffect, useState } from 'react';
import type { PortfolioFormMode } from '../components/portfolio-form';
import {
  statusOptions,
  type ProjectData,
  type TeamData,
} from '../constants/data';

interface UsePortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
}

export const usePortfolioForm = ({
  mode,
  initialData,
  onSave,
}: UsePortfolioFormProps) => {
  const isReadOnly = mode === 'view';
  const isEdit = mode === 'edit';

  const [projectName, setProjectName] = useState(
    initialData?.projectName || '',
  );
  const [description, setDescription] = useState(
    initialData?.description || '',
  );
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [completedDate, setCompletedDate] = useState(
    initialData?.completedDate || '',
  );
  const [status, setStatus] = useState<DropdownItem | null>(
    initialData?.status
      ? statusOptions.find((s) => s.name === initialData.status) || null
      : null,
  );
  const [projectType, setProjectType] = useState<DropdownItem | null>(
    initialData?.projectType || null,
  );
  const [languages, setLanguages] = useState(initialData?.languages || '');
  const [teams, setTeams] = useState<TeamData[]>(initialData?.teams || []);
  const [projectLink, setProjectLink] = useState<string>(
    initialData?.projectLink?.url || '',
  );
  const [projectLinkName, setProjectLinkName] = useState<string>(
    initialData?.projectLink?.name || '',
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setProjectName(initialData.projectName || '');
      setDescription(initialData.description || '');
      setStartDate(initialData.startDate || '');
      setCompletedDate(initialData.completedDate || '');
      setStatus(
        initialData.status
          ? statusOptions.find((s) => s.name === initialData.status) || null
          : null,
      );
      setProjectType(initialData.projectType || null);
      setLanguages(initialData.languages || '');
      setTeams(initialData.teams || []);
      setProjectLink(initialData.projectLink?.url || '');
      setProjectLinkName(initialData.projectLink?.name || '');
    }
  }, [initialData]);

  const handleSaveForm = () => {
    const formData: Partial<ProjectData> = {
      id: initialData?.id,
      projectName,
      title: projectName,
      description,
      startDate,
      completedDate: completedDate || null,
      status: status?.name as ProjectData['status'],
      projectType: projectType as ProjectData['projectType'],
      languages,
      teams,
      projectLink: projectLink
        ? {
            id: `link-${Date.now()}`,
            name: projectLinkName || projectLink,
            type: 'link',
            url: projectLink,
          }
        : undefined,
      leader: initialData?.leader || '',
      image: initialData?.image || '',
      members: teams.flatMap((t) => t.members),
    };
    onSave?.(formData);
  };

  const handleAddTeam = () => {
    setActiveTeamId('new-team');
    setIsModalOpen(true);
  };

  const handleSaveTeamMembers = (
    selectedMembers: ModalMember[],
    teamName: string,
  ) => {
    const members = selectedMembers.map((m) => ({
      id: m.id ?? m.dev_id ?? m.userId ?? Date.now(),
      name: m.name,
      email: m.email,
      avatarUrl: m.avatarUrl || m.profilePictureUrl,
      role: m.role,
    }));

    if (activeTeamId === 'new-team') {
      const newTeam: TeamData = {
        id: `team-${Date.now()}`,
        name: teamName,
        count: members.length,
        members: members,
      };
      setTeams([...teams, newTeam]);
    } else if (activeTeamId) {
      setTeams(
        teams.map((team) => {
          if (team.id === activeTeamId) {
            return {
              ...team,
              name: teamName,
              count: members.length,
              members: members,
            };
          }
          return team;
        }),
      );
    }
    setIsModalOpen(false);
    setActiveTeamId(null);
  };

  const handleRemoveTeam = (teamId: string) => {
    setTeams(teams.filter((t) => t.id !== teamId));
  };

  const handleUpdateTeam = (updatedTeam: TeamData) => {
    setTeams(teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)));
  };

  const getTitle = () => {
    switch (mode) {
      case 'create':
        return 'Create Portfolio';
      case 'edit':
        return 'Edit Portfolio';
      case 'view':
        return 'View Portfolio';
      default:
        return 'Portfolio';
    }
  };

  const getModalTeamName = () => {
    if (activeTeamId === 'new-team') {
      return `Team ${teams.length + 1}`;
    }
    return teams.find((t) => t.id === activeTeamId)?.name || 'Team';
  };

  const getModalInitialMembers = () => {
    if (activeTeamId === 'new-team') {
      return [];
    }
    return teams.find((t) => t.id === activeTeamId)?.members || [];
  };

  return {
    isReadOnly,
    isEdit,
    projectName,
    setProjectName,
    description,
    setDescription,
    startDate,
    setStartDate,
    completedDate,
    setCompletedDate,
    status,
    setStatus,
    projectType,
    setProjectType,
    languages,
    setLanguages,
    teams,
    setTeams,
    projectLink,
    setProjectLink,
    projectLinkName,
    setProjectLinkName,
    isModalOpen,
    setIsModalOpen,
    activeTeamId,
    setActiveTeamId,
    handleSaveForm,
    handleAddTeam,
    handleSaveTeamMembers,
    handleRemoveTeam,
    handleUpdateTeam,
    getTitle,
    getModalTeamName,
    getModalInitialMembers,
  };
};
