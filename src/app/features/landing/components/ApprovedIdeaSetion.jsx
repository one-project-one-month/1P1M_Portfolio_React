import React, { useState } from "react";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { useNavigate } from "react-router-dom";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import { useProjectLike } from "@/features/landing/hooks/useProjectLike";

const ApprovedIdeaSetion = ({
  ideasLoading,
  approvedProjectideas = [],
  ideasError,
}) => {
  const navigate = useNavigate();

  const projects = approvedProjectideas?.data?.projects || [];

  const [projectsData, setProjectsData] = useState(approvedProjectideas);

  const handleLike = useProjectLike({
    setProjects: setProjectsData,
  });

  const renderError = () => {
    return (
      <div className="col-span-full text-red-400 py-8 text-center text-lg">
        Failed to load Approved Projects Ideas.
        <div className="mt-2 text-sm text-gray-400">
          {ideasError?.message || "Something went wrong."}
        </div>
      </div>
    );
  };

  const renderIdeas = () => {
    if (projects.length === 0) {
      return (
        <p className="text-center col-span-full text-gray-400">
          No projects found.
        </p>
      );
    }

    return projects
      .slice(0, 6)
      .map((approvedProjectIdea) => (
        <ProjectIdeaCard
          key={approvedProjectIdea.id}
          projectId={approvedProjectIdea.id}
          title={approvedProjectIdea.projectName}
          description={approvedProjectIdea.projectDetails}
          submittedByProfile={approvedProjectIdea.profilePictureUrl}
          postBy={approvedProjectIdea.devName}
          likeCount={approvedProjectIdea.reactionCount}
          liked={approvedProjectIdea.reactedProjects?.includes(
            approvedProjectIdea.id
          )}
          tags={approvedProjectIdea.projectTypes}
          onLike={(projectId, likestate) => handleLike(projectId, likestate)}
          status={
            approvedProjectIdea.status.toLowerCase() === "in_progress"
              ? 1
              : approvedProjectIdea.status.toLowerCase() === "completed"
              ? 2
              : 3
          }
        />
      ));
  };

  return (
    <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
      <div className="w-full flex justify-between items-center my-8">
        <h1 className="text-5xl">Approved Ideas</h1>
        <button
          className="border-b cursor-pointer"
          onClick={() => navigate("/approved-ideas")}
        >
          View more
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4">
        {ideasError ? (
          renderError()
        ) : ideasLoading ? (
          <SkeletonCard />
        ) : (
          renderIdeas()
        )}
      </div>
    </section>
  );
};

export default ApprovedIdeaSetion;
