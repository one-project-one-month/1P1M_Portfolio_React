import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { createProjectPortfolio } from '../services/portfolio-service';

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (payload: Partial<ProjectData>) =>
      createProjectPortfolio(payload),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Project is successfully created.', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['projectPortfolio'] });
    },
    onError: (error: Error) => {
      console.error('Error Creating Portfolio:', error);
      addToast(error.message, 'error');
    },
  });
};
