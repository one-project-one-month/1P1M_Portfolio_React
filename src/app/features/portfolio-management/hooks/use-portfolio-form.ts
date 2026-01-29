import type {
  DropdownItem,
  Member as ModalMember,
} from '@/types/portfolio-management';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import type { PortfolioFormMode } from '../components/portfolio-form';
import {
  statusOptions,
  type ProjectData,
  type TeamData,
} from '../constants/data';
import {
  portfolioFormSchema,
  type PortfolioFormValues,
} from '../portfolio-schema';

interface UsePortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
}

export interface TechnologyEntry {
  projectType: DropdownItem | null;
  languages: string;
}

export const usePortfolioForm = ({
  mode,
  initialData,
  onSave,
}: UsePortfolioFormProps) => {
  const isReadOnly = mode === 'view';
  const isEdit = mode === 'edit';

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      projectName: initialData?.projectName || '',
      description: initialData?.description || '',
      startDate: initialData?.startDate || '',
      completedDate: initialData?.completedDate ?? '',
      status: initialData?.status
        ? statusOptions.find((s) => s.name === initialData.status) || null
        : null,
      technologies: initialData?.technologies?.map((t) => ({
        projectType: t.projectType,
        languages: t.languages,
      })) || [{ projectType: null, languages: '' }],
      teams: initialData?.teams || [],
      projectLink: initialData?.projectLink || '',
      projectImage: initialData?.image || '',
    },
  });

  const {
    fields: technologyFields,
    append: appendTechnology,
    remove: removeTechnology,
    update: updateTechnology,
  } = useFieldArray({
    control: form.control,
    name: 'technologies',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  const handleAddTechnology = () => {
    appendTechnology({ projectType: null, languages: '' });
  };

  const handleRemoveTechnology = (index: number) => {
    removeTechnology(index);
  };

  const handleUpdateTechnology = (
    index: number,
    field: keyof TechnologyEntry,
    value: unknown,
  ) => {
    const currentTech = form.getValues(`technologies.${index}`);
    updateTechnology(index, { ...currentTech, [field]: value });
  };

  const handleSaveForm = form.handleSubmit((data) => {
    const validTechnologies = data.technologies.filter(
      (t): t is { projectType: DropdownItem; languages: string } =>
        t.projectType !== null,
    );

    const formData: Partial<ProjectData> = {
      id: initialData?.id,
      projectName: data.projectName,
      title: data.projectName,
      description: data.description,
      startDate: data.startDate,
      completedDate: data.completedDate || null,
      status: data.status?.name as ProjectData['status'],
      technologies: validTechnologies as ProjectData['technologies'],
      teams: data.teams,
      projectLink: data.projectLink,
      leader: initialData?.leader || '',
      image: data.projectImage,
      members: data.teams.flatMap((t) => t.members),
    };
    onSave?.(formData);
  });

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

    const currentTeams = form.getValues('teams');

    if (activeTeamId === 'new-team') {
      const newTeam: TeamData = {
        id: `team-${Date.now()}`,
        name: teamName,
        count: members.length,
        members: members,
      };
      form.setValue('teams', [...currentTeams, newTeam]);
    } else if (activeTeamId) {
      form.setValue(
        'teams',
        currentTeams.map((team) => {
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
    const currentTeams = form.getValues('teams');
    form.setValue(
      'teams',
      currentTeams.filter((t) => t.id !== teamId),
    );
  };

  const handleUpdateTeam = (updatedTeam: TeamData) => {
    const currentTeams = form.getValues('teams');
    form.setValue(
      'teams',
      currentTeams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
    );
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
    const teams = form.getValues('teams');
    if (activeTeamId === 'new-team') {
      return `Team ${teams.length + 1}`;
    }
    return teams.find((t) => t.id === activeTeamId)?.name || 'Team';
  };

  const getModalInitialMembers = () => {
    const teams = form.getValues('teams');
    if (activeTeamId === 'new-team') {
      return [];
    }
    return teams.find((t) => t.id === activeTeamId)?.members || [];
  };

  return {
    form,
    isReadOnly,
    isEdit,
    technologyFields,
    handleAddTechnology,
    handleRemoveTechnology,
    handleUpdateTechnology,
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
