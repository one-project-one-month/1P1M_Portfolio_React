import {
  assignLeaderService,
  deleteProjectIdeaService,
  editProjectIdeaService,
  getDeveloperProfile,
  getProjectIdeaDetail,
  ideaStatusChangeService,
} from '@/app/features/user-management/services/project-idea.service';
import type {
  GetDeveloperParamsType,
  IdeaEditResponseType,
  UpdateProjectIdeaResponseType,
  UpdateProjectIdeaType,
} from '@/app/features/user-management/types/project-idea-type';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useEditProjectIdea = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProjectIdeaResponseType,
    AxiosError<{ message: string }>,
    { projectIdeaId: number; formData: UpdateProjectIdeaType }
    // UpdateProjectIdeaType
  >({
    // mutationFn: ({ projectIdeaId, formData }) =>
    //   editProjectIdeaService(projectIdeaId, formData),
    mutationFn: ({ projectIdeaId, formData }) =>
      editProjectIdeaService(projectIdeaId, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(
        response.message || 'Project Idea updated successfully',
        'success',
      );
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Failed to update project idea';
      addToast(errorMessage, 'error');
    },
  });
};

export const useGetProjectIdeaDetail = (id: number) => {
  return useQuery<IdeaEditResponseType, AxiosError>({
    queryKey: ['project-idea-detail', id],
    queryFn: () => getProjectIdeaDetail(id),
    enabled: id !== undefined && !isNaN(id),
  });
};

export const useDeleteProjectIdea = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ projectIdeaId }: { projectIdeaId: number }) =>
      deleteProjectIdeaService(projectIdeaId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast('Project Idea Delete successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(
        error.response?.data?.message || 'Failed to delete project idea',
        'error',
      );
    },
  });
};

export const useProjectIdeaStatusChage = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      projectIdeaId,
      status,
    }: {
      projectIdeaId: number;
      status: number;
    }) => ideaStatusChangeService(projectIdeaId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast('Project Idea Status Change successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(
        error.response?.data?.message || 'Failed to project idea status change',
        'error',
      );
    },
  });
};

export const useAssignLeader = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      projectIdeaId,
      devId,
    }: {
      projectIdeaId: number;
      devId: number;
    }) => assignLeaderService(projectIdeaId, devId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast('Project Idea assign Leader successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(
        error.response?.data?.message || 'Failed to assign leader',
        'error',
      );
    },
  });
};

// export const useDeveloperProfile = (params: GetDeveloperParamsType) => {
//   return useQuery({
//     queryKey: ['developer', params],
//     queryFn: () => getDeveloperProfile(params),

//   });
// };

export const useDeveloperProfile = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
  status,
}: GetDeveloperParamsType) => {
  return useQuery({
    queryKey: [
      'developer',
      keyword,
      page,
      size,
      sortField,
      sortDirection,
      status,
    ],
    queryFn: () =>
      getDeveloperProfile({
        keyword,
        page,
        size,
        sortField,
        sortDirection,
        status,
      }),

    staleTime: 5 * 60 * 1000,
  });
};
