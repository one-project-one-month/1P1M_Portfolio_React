import { useState, startTransition } from "react";
import { useOptimistic } from "react";
import { reactToProject } from "../service/projectPortfolioService";


export function useHandleReact(initialProjects = []) {
  const [projects, setProjects] = useState(initialProjects || []);


  const [reactedProjects, updateOptimisticProjects] = useOptimistic(
    projects,
    (draft, projectId) => {
      const project = draft.find((p) => p.id === projectId);
      if (project) project.reaction_count += 1;
    }
  );


  const [reactedIds, setReactedIds] = useState(new Set());

  const handleReact = async (projectId) => {
    if (reactedIds.has(projectId)) {
      console.warn("Already reacted to this project:", projectId);
      return; 
    }


    startTransition(() => updateOptimisticProjects(projectId));

    try {
      await reactToProject(projectId);
      setReactedIds((prev) => new Set(prev).add(projectId));
    } catch (error) {
      if (error.response?.status === 409) {
        console.warn("Already reacted", projectId);
        setReactedIds((prev) => new Set(prev).add(projectId));
      } else {
        console.error("Error reacting:", error);
       
        startTransition(() =>
          setProjects((prev) =>
            prev.map((p) =>
              p.id === projectId
                ? { ...p, reaction_count: p.reaction_count - 1 }
                : p
            )
          )
        );
      }
    }
  };

  return { reactedProjects:reactedProjects || [], handleReact };
}
