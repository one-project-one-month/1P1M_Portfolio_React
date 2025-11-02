import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import { fetchApprovedProjects } from "@/services/approvedProjectsService";
import {
  reactProjectIdea,
  unreactProjectIdea,
} from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";

const ApprovedProjectIdeasPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Popular");

  const fetchProjects = async (page = 0) => {
    try {
      setLoading(true);

      const sortParam =
        filter === "Popular"
          ? "popular"
          : filter === "Newest"
          ? "newest"
          : "oldest";

      const data = await fetchApprovedProjects({
        page,
        size: 6,
        sortBy: sortParam,
        search: searchTerm,
      });

      setTotalPages(data.data.pagination.totalPages || 1);
      setProjects(data.data.projects);

    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurPage(0);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filter, searchTerm]);

  useEffect(() => {
    fetchProjects(curPage);
  }, [curPage]);

  const handleLike = async (projectId, liked) => {
    try {
      if (liked) {
        await reactProjectIdea(projectId);
      } else {
        await unreactProjectIdea(projectId);
      }

      // Update local state instantly
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                reactionCount: liked
                  ? p.reactionCount + 1
                  : p.reactionCount - 1,
                reactedProjects: liked
                  ? [...(p.reactedProjects || []), p.id]
                  : (p.reactedProjects || []).filter((id) => id !== p.id),
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      <Title
        title="Approved Idea Lists"
        showSearch={true}
        showFilter={true}
        searchPlaceholder="Search by project title"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {loading ? (
          <p className="text-center col-span-full text-gray-400">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No projects found.
          </p>
        ) : (
          projects
            .filter((proj) => proj.status !== "DELETED")
            .map((proj) => (
              <ProjectIdeaCard
                key={proj.id}
                projectId={proj.id}
                title={proj.projectName}
                description={proj.projectDetails}
                submittedByProfile={proj.profilePictureUrl}
                postBy={proj.devName}
                likeCount={proj.reactionCount}
                tags={proj.projectTypes}
                liked={proj.reactedProjects?.includes(proj.id)}
                status={ proj.status.toLowerCase() === "in_progress" ? 1 : proj.status.toLowerCase() === "completed"? 2 : 3 }
                onLike={(projectId, likeState) =>
                  handleLike(projectId, likeState)
                }
              />
            ))
        )}
      </div>

      <div className="w-full flex justify-center">
        <Pagination
          currentPage={curPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setCurPage(newPage)}
        />
      </div>
    </div>
  );
};

export default ApprovedProjectIdeasPage;
