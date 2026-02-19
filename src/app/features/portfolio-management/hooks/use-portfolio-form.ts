import type { Member as ModalMember } from '@/types/portfolio-management';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { normalize } from 'zod';
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
import { type CreateProjectPortfolioRequest } from '../services/portfolio-management-service';
import {
  useAddTeamMember,
  useCreateProject,
  useCreateTeam,
  useUpdateProject,
} from './use-portfolio-query';

interface UsePortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
}

export interface TechnologyEntry {
  projectType: string;
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
        projectType: t.projectType.name,
        languages: t.languages,
      })) || [{ projectType: '', languages: '' }],
      teams: initialData?.teams || [],
      projectLink: initialData?.projectLink || '',
      repoLink: initialData?.repoLink || '',
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
    appendTechnology({ projectType: '', languages: '' });
  };

  const handleRemoveTechnology = async (index: number) => {
    const techToRemove = technologyFields[index];
    // Optimistic removal from UI form
    removeTechnology(index);

    if (initialData?.id && techToRemove) {
    }
  };

  const handleUpdateTechnology = (
    index: number,
    field: keyof TechnologyEntry,
    value: unknown,
  ) => {
    const currentTech = form.getValues(`technologies.${index}`);
    updateTechnology(index, { ...currentTech, [field]: value });
  };

  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const createTeamMutation = useCreateTeam({
    onMutate: async (newTeam) => {
      // Snapshot
      const previousTeams = form.getValues('teams');

      // Optimistic Update
      const optimisticTeam: TeamData = {
        id: `team-${Date.now()}`, // Temporary ID
        name: newTeam.name,
        count: newTeam.members.length,
        members: newTeam.members.map((m) => ({
          ...m,
          id: m.id || Date.now(),
        })),
      };

      form.setValue('teams', [...previousTeams, optimisticTeam]);

      return { previousTeams };
    },
    onError: (err, _newTeam, context: any) => {
      if (context?.previousTeams) {
        form.setValue('teams', context.previousTeams);
      }
      console.error('Failed to create team via modal', err);
    },
    onSuccess: (response, variables) => {
      if (response && response.data && response.data.id) {
        const currentTeams = form.getValues('teams');
        const updatedTeams = currentTeams.map((t) => {
          if (
            t.name === variables.name &&
            t.members.length === variables.members.length &&
            t.id.startsWith('team-')
          ) {
            return { ...t, id: response.data.id.toString() };
          }
          return t;
        });
        form.setValue('teams', updatedTeams);

        // LocalStorage logic
        const storedIds = localStorage.getItem('temp_portfolio_team_ids');
        const teamIds = storedIds ? JSON.parse(storedIds) : [];
        if (!teamIds.includes(response.data.id)) {
          teamIds.push(response.data.id);
          localStorage.setItem(
            'temp_portfolio_team_ids',
            JSON.stringify(teamIds),
          );
        }
      }
    },
  });

  const addTeamMemberMutation = useAddTeamMember();

  const handleSaveForm = form.handleSubmit(async (data) => {
    try {
      // Get Team IDs from localStorage
      const storedTeamIds = localStorage.getItem('temp_portfolio_team_ids');
      const teamIds: number[] = storedTeamIds ? JSON.parse(storedTeamIds) : [];

      const payload: CreateProjectPortfolioRequest = {
        name: data.projectName,
        projectPicUrl: data.projectImage || 'https://via.placeholder.com/150',
        description: data.description,
        projectLink: data.projectLink,
        repoLink: data.repoLink,
        startDate: data.startDate,
        teamIds: teamIds,
        languageAndTools: data.technologies.flatMap((tech) =>
          tech.languages.split(',').map((lang) => ({
            name: lang.trim(),
            type: tech.projectType || 'Language',
          })),
        ),
      };

      if (data.completedDate) {
        payload.endDate = data.completedDate;
      }

      if (initialData?.id) {
        // Calculate diff for update
        const updatePayload: Partial<CreateProjectPortfolioRequest> = {};

        if (
          normalize(data.projectName) !== normalize(initialData.projectName)
        ) {
          updatePayload.name = data.projectName;
        }
        if (
          normalize(data.description) !== normalize(initialData.description)
        ) {
          updatePayload.description = data.description;
        }
        if (normalize(data.projectImage) !== normalize(initialData.image)) {
          updatePayload.projectPicUrl = data.projectImage;
        }
        if (
          normalize(data.projectLink) !== normalize(initialData.projectLink)
        ) {
          updatePayload.projectLink = data.projectLink;
        }
        if (normalize(data.repoLink) !== normalize(initialData.repoLink)) {
          updatePayload.repoLink = data.repoLink;
        }
        if (teamIds.length > 0) {
          updatePayload.teamIds = teamIds;
        }

        // Only call update if there are changes
        if (Object.keys(updatePayload).length > 0) {
          await updateProjectMutation.mutateAsync({
            id: initialData.id,
            data: updatePayload,
          });
        }
      } else {
        await createProjectMutation.mutateAsync(payload);
      }

      // Cleanup localStorage
      localStorage.removeItem('temp_portfolio_team_ids');

      const validTechnologies = data.technologies.filter(
        (t): t is { projectType: string; languages: string } =>
          t.projectType !== '',
      );

      const formData: Partial<ProjectData> = {
        id: initialData?.id,
        projectName: data.projectName,
        title: data.projectName,
        description: data.description,
        startDate: data.startDate,
        completedDate: data.completedDate || null,
        status: data.status?.name as ProjectData['status'],
        technologies: validTechnologies.map((t) => ({
          projectType: { id: 0, name: t.projectType },
          languages: t.languages,
        })),
        teams: data.teams,
        projectLink: data.projectLink,
        repoLink: data.repoLink,
        leader: initialData?.leader || '',
        image: data.projectImage,
        members: data.teams.flatMap((t) => t.members),
      };

      onSave?.(formData);
    } catch (error) {
      console.error('Failed to save project portfolio:', error);
    }
  });

  const handleAddTeam = () => {
    setActiveTeamId('new-team');
    setIsModalOpen(true);
  };

  const handleSaveTeamMembers = async (
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

    // API Call for adding members if team already exists
    if (
      activeTeamId &&
      !activeTeamId.toString().startsWith('team-') &&
      activeTeamId !== 'new-team'
    ) {
      // Find new members by comparing with existing
      const existingMembers =
        currentTeams.find((t) => String(t.id) === String(activeTeamId))
          ?.members || [];
      const newMembers = members.filter(
        (m) => !existingMembers.some((em) => em.id === m.id),
      );

      newMembers.forEach((m) => {
        if (m.id) {
          addTeamMemberMutation
            .mutateAsync({
              teamId: activeTeamId,
              memberId: m.id,
              roleInTeam: m.role || 'Member',
            })
            .catch(console.error);
        }
      });
    }

    if (activeTeamId === 'new-team') {
      const newTeam: TeamData = {
        id: `team-${Date.now()}`,
        name: teamName,
        count: members.length,
        members: members,
      };

      createTeamMutation.mutate(newTeam);
    } else if (activeTeamId) {
      form.setValue(
        'teams',
        currentTeams.map((team) => {
          if (String(team.id) === String(activeTeamId)) {
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
    return (
      teams.find((t) => String(t.id) === String(activeTeamId))?.members || []
    );
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
