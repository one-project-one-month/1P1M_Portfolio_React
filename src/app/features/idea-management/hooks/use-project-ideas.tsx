import type {
  GetProjectIdeaParamsType,
  ProjectIdeasResponseType,
  ProjectIdeaUpdateResponseType,
  UpdateProjectIdeaType,
} from '@/app/features/idea-management/types/project-idea.types';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  getProjectIdea,
  updateProjectIdea,
} from '../services/project-idea.service';

export const useGetProjectIdea = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetProjectIdeaParamsType) => {
  return useQuery<ProjectIdeasResponseType>({
    queryKey: ['project-idea', keyword, page, sortDirection, sortField, size],
    queryFn: () =>
      getProjectIdea({ keyword, page, size, sortDirection, sortField }),
  });
};

export const useUpdateProjectIdea = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    ProjectIdeaUpdateResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: UpdateProjectIdeaType }
  >({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: UpdateProjectIdeaType;
    }) => updateProjectIdea(id, formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });
};
