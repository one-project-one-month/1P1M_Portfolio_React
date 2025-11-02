import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import { ProjectIdeaList, reactProjectIdea, unreactProjectIdea } from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";

const ProjectListPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Popular");


  const fetchProjects = async (page = 0) => {
    try {
      setLoading(true);
      const { data, meta } = await ProjectIdeaList(page, 6,  searchTerm, filter);
      
      setTotalPages(meta?.totalPages || 1);
      setProjects(data)
      
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurPage(0);
      fetchProjects(0);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filter, searchTerm]);


  useEffect(() => {
    fetchProjects(curPage);
  }, [curPage]);
  
  const handleLike = async (projectId, likeState) => {

    try {
      if (likeState) {
        await reactProjectIdea(projectId)
      } else {
        await unreactProjectIdea(projectId)
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? { ...p, reaction_count: likeState ? (p.reaction_count || 0) + 1 : (p.reaction_count || 0) - 1, likestate: likeState }
            : p
        )
      );
    }
  };


  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Project Idea Lists"
        showSearch={true}
        showFilter={true}
        searchPlaceholder="Search by project title"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* <div className="flex-grow flex flex-wrap  gap-6 p-6"> */}
        {loading ? (
          <p className="text-center col-span-full text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : (
          projects
            // .filter((proj)=>proj.status === "PENDING")
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
                onLike={(projectId, likestate) => handleLike(projectId, likestate)}
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

export default ProjectListPage;