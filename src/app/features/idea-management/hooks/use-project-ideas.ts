import type {
  EditProjectIdeaType,
  ProjectIdeaEditResponseType,
} from '@/app/features/idea-management/types/project-idea.types';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type {
  GetIdeaParamsType,
  IdeasResponseType,
} from '../../../../types/idea.type';
import {
  editProjectIdea,
  getProjectIdea,
} from '../services/project-idea.service';

// GET
export const useGetProjectIdea = ({
  keyword,
  page,
  size,
  status,
  sortOrder,
}: GetIdeaParamsType) => {
  return useQuery<IdeasResponseType>({
    queryKey: ['ideas', keyword, page, size, status, sortOrder],
    queryFn: () => getProjectIdea({ keyword, page, size, status, sortOrder }),
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
