import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  assignProjectLeader,
  updateProjectIdeaInformation,
  updateProjectIdeaStatus,
} from '../../../../shared/services/project-idea.service';
import type { EditIdeaType } from '../../../../shared/types/project-idea.types';

export function useProjectIdeaMutations() {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const updateInformationMutation = useMutation({
    mutationFn: ({
      projectIdeaId,
      formData,
    }: {
      projectIdeaId: number;
      formData: Partial<EditIdeaType>;
    }) => updateProjectIdeaInformation(projectIdeaId, formData),
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to update information', 'error');
    },
    onSuccess: () => {
      invalidateIdeas();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      projectIdeaId,
      status,
    }: {
      projectIdeaId: number;
      status: EditIdeaType['status'];
    }) => updateProjectIdeaStatus(projectIdeaId, { status }),
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to update status', 'error');
    },
  });

  const assignLeaderMutation = useMutation({
    mutationFn: ({
      projectIdeaId,
      devId,
    }: {
      projectIdeaId: number;
      devId: number;
    }) => assignProjectLeader(projectIdeaId, devId),
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to assign leader', 'error');
    },
  });

  const invalidateIdeas = () => {
    queryClient.invalidateQueries({ queryKey: ['ideas'], exact: false });
  };

  return {
    updateInformationMutation,
    updateStatusMutation,
    assignLeaderMutation,
    invalidateIdeas,
    addToast,
  };
}
