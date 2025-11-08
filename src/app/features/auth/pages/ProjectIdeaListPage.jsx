import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import {
  ProjectIdeaList,
  reactProjectIdea,
  unreactProjectIdea,
} from "@/services/projectIdeaService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectListPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("Popular");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurPage(0);
  }, [debouncedSearch, filter]);

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["projects", curPage, debouncedSearch, filter],
    queryFn: () => ProjectIdeaList(curPage, 6, debouncedSearch, filter),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const projects = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;



  const handleLike = async (projectId, likeState) => {
    try {
      if (likeState) {
        await reactProjectIdea(projectId);
      } else {
        await unreactProjectIdea(projectId);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };


  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Project Idea Lists"
        showSearch={true}
        showFilter={true}
        onCreate={() => navigate("/project-idea")}
        searchPlaceholder="Search by project title"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {isLoading || isFetching ? (
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-[298px]" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center col-span-full text-gray-400">
              No projects found.
            </p>
          ) : (
            projects
              .map((proj) => (
                <ProjectIdeaCard
                  key={proj.id}
                  projectId={proj.id}
                  title={proj.projectName}
                  description={proj.description}
                  submittedByProfile={proj.profilePictureUrl}
                  postBy={proj.devName}
                  likeCount={proj.reaction_count}
                  liked={proj.reactedProjects?.includes(proj.id)}
                  tags={proj.projectTypes}
                  onLike={(projectId, likestate) =>
                    handleLike(projectId, likestate)
                  }
                />
              ))
          )}
        </div>
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

export default ProjectListPage;
