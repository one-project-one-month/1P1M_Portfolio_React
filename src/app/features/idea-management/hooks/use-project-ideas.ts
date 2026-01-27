import type {
  EditProjectIdeaType,
  GetProjectIdeaParamsType,
  ProjectIdeaEditResponseType,
  ProjectIdeasResponseType,
} from '@/app/features/idea-management/types/project-idea.types';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  editProjectIdea,
  getProjectIdea,
} from '../services/project-idea.service';

// GET
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
    placeholderData: (previousData) => previousData,
  });
};

// EDIT
export const useEditProjectIdea = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    ProjectIdeaEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditProjectIdeaType }
  >({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: EditProjectIdeaType;
    }) => editProjectIdea(id, formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });
};
