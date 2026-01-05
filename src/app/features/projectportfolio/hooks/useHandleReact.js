import { useState, useOptimistic, useTransition, useEffect } from "react";
import { reactToProject } from "../service/projectPortfolioService";

export function useHandleReact(initialProjects = []) {
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [reactedIds, setReactedIds] = useState(new Set());

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const [reactedProjects, addOptimisticReaction] = useOptimistic(
    projects,
    (state, projectId) =>
      state.map((p) =>
        p.id === projectId
          ? { ...p, reaction_count: (p.reaction_count ) + 1 }
          : p
      )
  );

  const handleReact = async (projectId) => {
    if (reactedIds.has(projectId)) return;

    startTransition(async () => {
      addOptimisticReaction(projectId);

      try {
        await reactToProject(projectId);
        
        
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId 
              ? { ...p, reaction_count: (p.reaction_count || 0) + 1 } 
              : p
          )
        );
        setReactedIds((prev) => new Set(prev).add(projectId));
      } catch (error) {
        console.error("Reaction failed:", error);
    
      }
    });
  };

  return { reactedProjects, handleReact, isPending };
}