import type {
  Member,
  Member as ModalMember,
} from '@/types/portfolio-management';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { getUser } from '../../opom-register/services/ulits';
import type { PortfolioFormMode } from '../components/portfolio-form';
import {
  statusOptions,
  type ProjectData,
  type ProjectStatus,
  type TeamData,
} from '../constants/data';
import {
  portfolioFormSchema,
  type PortfolioFormValues,
} from '../portfolio-schema';
import { type CreateProjectPortfolioRequest } from '../services/portfolio-management-service';
import { mapFrontendToBackendStatus } from '../utils/status-mapping';
import {
  useAddLanguageAndTools,
  useAddTeamMember,
  useCreateProject,
  useCreateTeam,
  useDeleteLanguageAndTools,
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
        id: t.projectType.id,
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

  const addTechnologiesMutation = useAddLanguageAndTools();
  const deleteTechnologiesMutation = useDeleteLanguageAndTools();

  const handleRemoveTechnology = (index: number) => {
    removeTechnology(index);
  };

  const handleAddNewRow = () => {
    appendTechnology({ projectType: '', languages: '' });
  };

  const handleUpdateTechnology = (
    index: number,
    field: keyof TechnologyEntry,
    value: unknown,
  ) => {
    const currentTech = form.getValues(`technologies.${index}`);
    updateTechnology(index, { ...currentTech, [field]: value });
  };

  const handleSaveTechnologies = async () => {
    if (!initialData?.id) return;

    const currentTechs = form
      .getValues('technologies')
      .filter((t) => t.projectType.trim() !== '' || t.languages.trim() !== '');
    const originalTechs = initialData.technologies || [];

    const deletedTechs = originalTechs.filter(
      (orig) =>
        !currentTechs.some(
          (cur) => cur.id !== undefined && cur.id === orig.projectType.id,
        ),
    );

    const addedTechs = currentTechs.filter((cur) => !cur.id);

    for (const tech of deletedTechs) {
      if (tech.projectType.id) {
        await deleteTechnologiesMutation.mutateAsync({
          pjId: initialData.id,
          languageAndToolId: tech.projectType.id,
        });
      }
    }

    if (addedTechs.length > 0) {
      const addPayload = {
        languageAndTools: addedTechs.flatMap((tech) =>
          tech.languages.split(',').map((lang) => ({
            name: lang.trim(),
            type: tech.projectType,
          })),
        ),
      };

      await addTechnologiesMutation.mutateAsync({
        projectPortfolioId: initialData.id,
        payload: addPayload,
      });
    }
  };

  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const createTeamMutation = useCreateTeam({
    onMutate: async ({ team }) => {
      // Snapshot
      const previousTeams = form.getValues('teams');

      // Optimistic Update
      const optimisticTeam: TeamData = {
        id: `team-${Date.now()}`, // Temporary ID
        name: team.name,
        count: team.members.length,
        members: team.members.map((m) => ({
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
    onSuccess: (response, { team }) => {
      if (response && response.data && response.data.id) {
        const currentTeams = form.getValues('teams');
        const updatedTeams = currentTeams.map((t) => {
          if (
            t.name === team.name &&
            t.members.length === team.members.length &&
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

  const handleSaveForm = form.handleSubmit(
    async (data) => {
      try {
        if (initialData?.id) {
          // --- EDIT MODE: only patch changed basic fields ---
          const updatePayload: Partial<CreateProjectPortfolioRequest> = {};

          if (data.projectName !== initialData.projectName) {
            updatePayload.name = data.projectName;
          }
          if (data.description !== initialData.description) {
            updatePayload.description = data.description;
          }
          if (data.projectImage !== initialData.image) {
            updatePayload.projectPicUrl = data.projectImage;
          }
          if (data.projectLink !== initialData.projectLink) {
            updatePayload.projectLink = data.projectLink;
          }
          if (data.repoLink !== initialData.repoLink) {
            updatePayload.repoLink = data.repoLink;
          }
          if (data.status?.name && data.status.name !== initialData.status) {
            updatePayload.projectPortfolioStatus = mapFrontendToBackendStatus(
              data.status.name as ProjectStatus,
            );
          }

          if (Object.keys(updatePayload).length > 0) {
            await updateProjectMutation.mutateAsync({
              id: initialData.id,
              data: updatePayload,
            });
          }

          // --- Sync language and tools ---
          const currentTechs = data.technologies.filter(
            (t) => t.projectType.trim() !== '' || t.languages.trim() !== '',
          );
          const originalTechs = initialData.technologies || [];

          // Find deleted: items in original but not in current
          const deletedTechs = originalTechs.filter(
            (orig) =>
              !currentTechs.some(
                (cur) => cur.id !== undefined && cur.id === orig.projectType.id,
              ),
          );

          // Find added: items in current without an id (new rows)
          const addedTechs = currentTechs.filter((cur) => !cur.id);

          // Delete removed items one at a time
          for (const tech of deletedTechs) {
            if (tech.projectType.id) {
              await deleteTechnologiesMutation.mutateAsync({
                pjId: initialData.id,
                languageAndToolId: tech.projectType.id,
              });
            }
          }

          // Add new items
          if (addedTechs.length > 0) {
            const addPayload = {
              languageAndTools: addedTechs.flatMap((tech) =>
                tech.languages.split(',').map((lang) => ({
                  name: lang.trim(),
                  type: tech.projectType,
                })),
              ),
            };

            await addTechnologiesMutation.mutateAsync({
              projectPortfolioId: initialData.id,
              payload: addPayload,
            });
          }
        } else {
          // build inline teams + lang/tools ---
          const teams = data.teams.map((team) => ({
            teamName: team.name,
            description: 'Team for project portfolio',
            imageUrl: 'https://via.placeholder.com/150',
            memberIds: team.members
              .map((m) =>
                typeof m.id === 'number' ? m.id : parseInt(String(m.id), 10),
              )
              .filter((id) => !isNaN(id)),
          }));

          const payload: CreateProjectPortfolioRequest = {
            name: data.projectName,
            projectPicUrl:
              data.projectImage || 'https://via.placeholder.com/150',
            description: data.description,
            projectLink: data.projectLink,
            repoLink: data.repoLink,
            teams,
            languageAndTools: data.technologies.flatMap((tech) =>
              tech.languages.split(',').map((lang) => ({
                name: lang.trim(),
                type: tech.projectType,
              })),
            ),
          };

          await createProjectMutation.mutateAsync(payload);
        }

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
    },
    (error) => {
      console.log(error);
    },
  );

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

      if (isEdit && initialData?.id) {
        createTeamMutation.mutate({ projectId: initialData.id, team: newTeam });
      } else {
        // Create mode: only update local form state
        const currentTeams = form.getValues('teams');
        form.setValue('teams', [...currentTeams, newTeam]);
      }
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

  const handleRemoveTeamMembers = (
    teamId: string,
    updatedMembers: Member[],
  ) => {
    const currentTeams = form.getValues('teams');
    form.setValue(
      'teams',
      currentTeams.map((team) => {
        if (String(team.id) === String(teamId)) {
          return {
            ...team,
            count: updatedMembers.length,
            members: updatedMembers,
          };
        }
        return team;
      }),
    );
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

  const isTeamLeader = useMemo(() => {
    const user = getUser();
    if (!user?.email || !initialData?.teams) return false;
    return initialData.teams.some((team: TeamData) =>
      team.members?.some(
        (m) =>
          m.email?.toLowerCase() === user.email.toLowerCase() &&
          (m.role === 'Team Leader' ||
            (m as any).roleInTeam?.toUpperCase() === 'TEAM_LEADER' ||
            (m as any).roleInTeam?.toUpperCase() === 'TEAM LEADER'),
      ),
    );
  }, [initialData?.teams]);

  return {
    form,
    isReadOnly,
    isEdit,
    isTeamLeader,
    technologyFields,
    handleRemoveTechnology,
    handleUpdateTechnology,
    handleSaveTechnologies,
    handleAddNewRow,
    isModalOpen,
    setIsModalOpen,
    activeTeamId,
    setActiveTeamId,
    handleSaveForm,
    handleAddTeam,
    handleSaveTeamMembers,
    handleRemoveTeamMembers,
    handleRemoveTeam,
    handleUpdateTeam,
    getTitle,
    getModalTeamName,
    getModalInitialMembers,
    isSaving: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
  };
};
