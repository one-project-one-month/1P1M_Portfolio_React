import {
  reactProjectIdea,
  unreactProjectIdea,
} from '@/services/project-idea-service';

export const useProjectLike = ({ setProjects }) => {
  const handleLike = async (projectId, likeState) => {
    try {
      if (likeState) {
        await reactProjectIdea(projectId);
      } else {
        await unreactProjectIdea(projectId);
      }

      setProjects((prev) => {
        if (!prev?.data?.projects) return prev;

        const updatedProjects = prev.data.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                reactionCount: likeState
                  ? p.reactionCount + 1
                  : p.reactionCount - 1,
                reactedProjects: likeState
                  ? [...(p.reactedProjects || []), projectId]
                  : (p.reactedProjects || []).filter((id) => id !== projectId),
              }
            : p,
        );

        return {
          ...prev,
          data: {
            ...prev.data,
            projects: updatedProjects,
          },
        };
      });
    } catch (err) {
      console.error('Like update failed:', err);
    }
  };

  return handleLike;
};
