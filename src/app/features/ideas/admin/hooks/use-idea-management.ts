import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { updateProjectIdeaInformation } from '../../shared/services/project-idea.service';
import type {
  EditIdeaType,
  IdeaEditResponseType,
} from '../../shared/types/project-idea.types';

// // Re-export shared hook for convenience
// export { useGetProjectIdea } from '../../shared/hooks/use-get-project-idea';

// // Alias for admin use
// export { useGetProjectIdea as useGetIdeaManagement } from '../../shared/hooks/use-get-project-idea';

// EDIT
export const useEditIdeaManagement = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    IdeaEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditIdeaType }
  >({
    mutationFn: ({ id, formData }: { id: number; formData: EditIdeaType }) =>
      updateProjectIdeaInformation(id, formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });
};
