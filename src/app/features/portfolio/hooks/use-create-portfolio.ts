import { useToast } from '@/components/ui/toast-provider';
import type { ProjectRequestBody } from '@/types/portfolio.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProjectPortfolio } from '../services/portfolio-service';

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (payload: ProjectRequestBody) =>
      createProjectPortfolio(payload),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Project is successfully created.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Creating Portfolio:', error);
      addToast(error.message || 'Failed to create project', 'error');
    },
  });
};
