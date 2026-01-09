import type { PortfolioProjectType } from '@/types/portfolio.types';
import { useOptimistic, useState, useTransition } from 'react';
import { reactToProject } from '../services/portfolio-service';

export function useHandleReact(initialProjects: PortfolioProjectType[] = []) {
  const [projects, setProjects] =
    useState<PortfolioProjectType[]>(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [reactedIds, setReactedIds] = useState(new Set<string>());

  // useEffect(() => {
  //   setProjects(initialProjects);
  // }, [initialProjects]);

  const [reactedProjects, addOptimisticReaction] = useOptimistic(
    projects,
    (state, projectId: string) =>
      state.map((p) =>
        p.id === projectId
          ? { ...p, reaction_count: (p.reaction_count || 0) + 1 }
          : p,
      ),
  );

  const handleReact = async (projectId: string) => {
    if (reactedIds.has(projectId)) return;

    startTransition(async () => {
      addOptimisticReaction(projectId);

      try {
        await reactToProject(projectId);

        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId
              ? { ...p, reaction_count: (p.reaction_count || 0) + 1 }
              : p,
          ),
        );
        setReactedIds((prev) => new Set(prev).add(projectId));
      } catch (error) {
        console.error('Reaction failed:', error);
      }
    });
  };

  return { reactedProjects, handleReact, isPending };
}
