import { startTransition, useOptimistic, useState } from 'react';
import { getProjectIdeaById } from '../services/project-idea.service';
import type { IdeaType } from '../types/project-idea.types';

export const useUpdateViewCount = (initialIdea: IdeaType) => {
  const [data, setData] = useState<IdeaType | null>(null);

  const [optimisticIdea, addOptimisticIdea] = useOptimistic(
    initialIdea,
    (prev) => ({
      ...prev,
      viewCount: (prev?.viewCount || 0) + 1,
    }),
  );

  const handleViewDetail = async () => {
    startTransition(() => {
      addOptimisticIdea(null);
    });

    try {
      const res = await getProjectIdeaById(initialIdea?.projectIdeaId);

      setData(res?.data);
    } catch (error) {
      console.error('Error at update view count', error);
    }
  };

  const displayIdea = data ?? optimisticIdea;

  return { displayIdea, handleViewDetail };
};
