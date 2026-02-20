import type { AxiosError } from 'axios';
import { startTransition, useOptimistic } from 'react'; // 1. Import startTransition
import { getProjectIdeaById } from '../services/project-idea.service';
import type { IdeaType } from '../types/project-idea.types';

export const useUpdateViewCount = (initialIdea: IdeaType) => {
  const [optimisticIdea, addOptimisticIdea] = useOptimistic(
    initialIdea,
    (prev) => {
      return {
        ...prev,

        viewCount: (prev?.viewCount || 0) + 1,
      };
    },
  );

  const handleViewDetail = async () => {
    startTransition(() => {
      addOptimisticIdea(0);
    });

    try {
      await getProjectIdeaById(initialIdea?.projectIdeaId);
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error at update view count', error);
    }
  };

  return { optimisticIdea, handleViewDetail };
};
