import {
  portfolioStatusChangeService,
  projectPortfolioReactService,
  projectPortfolioUnReactService,
} from '@/app/features/user-management/services/project-portfolio-service';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useProjectPortfolioStatusChage = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      projectPortfolioId,
      status,
    }: {
      projectPortfolioId: number;
      status: string;
    }) => portfolioStatusChangeService(projectPortfolioId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-detail-idea-and-portfolio'],
      });
      addToast('Project portfolio Status Change successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(
        error.response?.data?.message ||
          'Failed to project portfolio status change',
        'error',
      );
    },
  });
};

export const useProjectPortfolioReact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectPortfolioId }: { projectPortfolioId: number }) =>
      projectPortfolioReactService(projectPortfolioId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-detail-idea-and-portfolio'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useProjectPortfolioUnReact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectPortfolioId }: { projectPortfolioId: number }) =>
      projectPortfolioUnReactService(projectPortfolioId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-detail-idea-and-portfolio'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
