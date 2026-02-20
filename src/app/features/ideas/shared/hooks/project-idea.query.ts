import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  reactProjectIdea,
  unreactProjectIdea,
} from '../services/project-idea.service';

export const useReactProjectIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reactProjectIdea(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['ideas'] });

      const previousData = queryClient.getQueriesData({
        queryKey: ['ideas'],
        exact: false,
      });

      queryClient.setQueriesData(
        { queryKey: ['ideas'], exact: false },
        (oldData: any) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((idea: any) =>
              idea.projectIdeaId === id
                ? {
                    ...idea,
                    isAlreadyReacted: true,
                    reactionCount: idea.reactionCount + 1,
                  }
                : idea,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ideas'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'], exact: false });
    },
  });
};
export const useUnReactProjectIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unreactProjectIdea(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['ideas'], exact: false });

      const previousData = queryClient.getQueriesData({
        queryKey: ['ideas'],
        exact: false,
      });

      queryClient.setQueriesData(
        { queryKey: ['ideas'], exact: false },
        (oldData: any) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((idea: any) =>
              idea.projectIdeaId === id
                ? {
                    ...idea,
                    isAlreadyReacted: false,
                    reactionCount: idea.reactionCount - 1,
                  }
                : idea,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ideas'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'], exact: false });
    },
  });
};
