import { useToast } from '@/components/ui/toast-provider';
import type { TeamType } from '@/types/portfolio-management';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addLanguageAndTool,
  addTeamMember,
  createProjectPortfolio,
  createTeam,
  deleteTeam,
  getAllProfiles,
  getAllProjectPortfolios,
  getProjectPortfolioDetailsV2,
  reactProject,
  removeLanguageAndTool,
  removeTeamMember,
  unreactProject,
  updateProjectPortfolio,
  updateProjectStatus,
  updateTeam,
  type CreateProjectPortfolioRequest,
  type CreateTeamResponse,
  type TechnologyRequest,
} from '../services/portfolio-management-service';

import type { UseMutationOptions } from '@tanstack/react-query';

// --- Queries ---

export const useGetAllProfiles = (
  page = 0,
  size = 20,
  sortField = 'name',
  sortDirection = 'desc',
  keyword = '',
) => {
  return useQuery({
    queryKey: ['profiles', page, size, sortField, sortDirection, keyword],
    queryFn: () =>
      getAllProfiles(page, size, sortField, sortDirection, keyword),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetAllProjects = (
  page = 0,
  size = 10,
  sortDirection = 'desc',
  keyword = '',
  sortField = 'name',
  projectPortfolioStatus?: string,
) => {
  return useQuery({
    queryKey: [
      'projectPortfolio',
      page,
      size,
      sortDirection,
      keyword,
      sortField,
      projectPortfolioStatus,
    ],
    queryFn: () =>
      getAllProjectPortfolios(
        page,
        size,
        sortDirection,
        keyword,
        sortField,
        projectPortfolioStatus,
      ),
  });
};

export const useGetProjectDetails = (projectPortfolioId: string) => {
  return useQuery({
    queryKey: ['projectPortfolio', projectPortfolioId],
    queryFn: () => getProjectPortfolioDetailsV2(projectPortfolioId),
    enabled: !!projectPortfolioId,
  });
};

// --- Mutations ---

export const useCreateTeam = (
  options?: UseMutationOptions<
    CreateTeamResponse,
    Error,
    { projectId: number; team: TeamType },
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ projectId, team }) => createTeam(projectId, team),
    ...options,
    onSuccess: (res, variables, context) => {
      if (res && res.code === 200) {
        addToast('Team created successfully.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      if (options?.onSuccess) {
        (options.onSuccess as any)(res, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('Error Creating Team:', error);
      addToast(error.message || 'Failed to create team', 'error');
      if (options?.onError) {
        (options.onError as any)(error, variables, context);
      }
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      teamId,
      teamName,
    }: {
      teamId: number | string;
      teamName: string;
    }) => updateTeam(teamId, teamName),
    onSuccess: () => {
      addToast('Team name updated successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (error: Error) => {
      console.error('Error Updating Team:', error);
      addToast(error.message || 'Failed to update team', 'error');
    },
  });
};

export const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      teamId,
      memberId,
      roleInTeam,
    }: {
      teamId: number | string;
      memberId: number | string;
      roleInTeam: string;
    }) => addTeamMember(teamId, memberId, roleInTeam),
    onSuccess: () => {
      addToast('Team member added successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (error: Error) => {
      console.error('Error Adding Team Member:', error);
      addToast(error.message || 'Failed to add team member', 'error');
    },
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      teamId,
      memberId,
    }: {
      teamId: number | string;
      memberId: number | string;
    }) => removeTeamMember(teamId, memberId),
    onSuccess: () => {
      addToast('Team member removed successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (error: Error) => {
      console.error('Error Removing Team Member:', error);
      addToast(error.message || 'Failed to remove team member', 'error');
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (teamId: number | string) => deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      addToast('Team deleted successfully', 'success');
    },
    onError: (error: Error) => {
      console.error('Error Deleting Team:', error);
      addToast(error.message || 'Failed to delete team', 'error');
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (payload: CreateProjectPortfolioRequest) =>
      createProjectPortfolio(payload),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Project is successfully created.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Creating Project:', error);
      addToast(error.message || 'Failed to create project', 'error');
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<CreateProjectPortfolioRequest>;
    }) => updateProjectPortfolio(id, data),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Project is successfully updated.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Updating Project:', error);
      addToast(error.message || 'Failed to update project', 'error');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (id: number | string) => updateProjectStatus(id, 'Completed'),
    onSuccess: (res: any) => {
      if (res && res.code === 200) {
        addToast('Project marked as completed', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Deleting Project:', error);
      addToast(error.message || 'Failed to delete project', 'error');
    },
  });
};

export const useReactProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number | string) => reactProject(projectId),
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: ['projectPortfolio'] });

      const previousData = queryClient.getQueryData(['projectPortfolio']);

      queryClient.setQueriesData(
        { queryKey: ['projectPortfolio'] },
        (oldData: any) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((project: any) =>
              project.id === projectId
                ? {
                    ...project,
                    reactedCount: (project.reactedCount || 0) + 1,
                    isReacted: project.isAlreadyReacted,
                  }
                : project,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _projectId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['projectPortfolio'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
  });
};

export const useUnreactProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number | string) => unreactProject(projectId),
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: ['projectPortfolio'] });

      const previousData = queryClient.getQueryData(['projectPortfolio']);

      queryClient.setQueriesData(
        { queryKey: ['projectPortfolio'] },
        (oldData: any) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((project: any) =>
              project.id === projectId
                ? {
                    ...project,
                    reactedCount: Math.max(0, (project.reactedCount || 0) - 1),
                    isReacted: project.isAlreadyReacted,
                  }
                : project,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _projectId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['projectPortfolio'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
  });
};

//Language and Tools

export const useAddLanguageAndTools = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      projectPortfolioId,
      payload,
    }: {
      projectPortfolioId: number | string;
      payload: TechnologyRequest;
    }) => addLanguageAndTool({ projectPortfolioId, payload }),
    onSuccess: () => {
      addToast('Language and Tools added successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Adding Language and Tools:', error);
      addToast(error.message || 'Failed to add Language and Tools', 'error');
    },
  });
};

export const useDeleteLanguageAndTools = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      pjId,
      languageAndToolId,
    }: {
      pjId: number | string;
      languageAndToolId: number | string;
    }) => removeLanguageAndTool(pjId, languageAndToolId),
    onSuccess: (res: any) => {
      if (res && res.code === 200) {
        addToast('Language and Tool are successfully deleted.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Deleting Language and Tools:', error);
      addToast(error.message || 'Failed to delete Language and Tools', 'error');
    },
  });
};
