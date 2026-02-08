import type { PortfolioProjectType } from '@/types/portfolio.type';
import { useEffect, useState, useTransition } from 'react';
import { reactToProject } from '../services/portfolio-service';

export function useHandleReact(initialProjects: PortfolioProjectType[] = []) {
  const [projects, setProjects] =
    useState<PortfolioProjectType[]>(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [reactedIds, setReactedIds] = useState(new Set<number>());

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const reactedProjects = projects.map((p) => {
    if (reactedIds.has(p.id)) {
      return { ...p, reaction_count: (p.reactedCount || 0) + 1 };
    }
    return p;
  });

  const handleReact = async (projectId: number) => {
    if (reactedIds.has(projectId)) return;

    startTransition(async () => {
      setReactedIds((prev) => new Set(prev).add(projectId));

      try {
        await reactToProject(projectId);
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId
              ? { ...p, reaction_count: (p.reactedCount || 0) + 1 }
              : p,
          ),
        );
      } catch (error) {
        console.error('Reaction failed:', error);
      }
    });
  };

  return { reactedProjects, handleReact, isPending };
}
