import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import {
  ProjectIdeaList,
  reactProjectIdea,
  unreactProjectIdea,
} from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectListPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Popular");
  const navigate = useNavigate();

  const fetchProjects = async (page = 0) => {    
    try {
      setLoading(true);
      const res = await ProjectIdeaList(page, 6, searchTerm, filter);      

      setTotalPages(res?.meta?.totalPages || 1);
      setProjects(res?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     setCurPage(0);
  //     fetchProjects(0);
  //   }, 500);

  //   return () => clearTimeout(delayDebounce);
  // }, [filter, searchTerm]);

  // useEffect(() => {
  //   fetchProjects(curPage);
  // }, [curPage]);

useEffect(() => {
    const delayDebounce = setTimeout(() => {

      if (curPage !== 0) { 
        setCurPage(0);
      } else {
        fetchProjects(0); 
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [filter, searchTerm]); 

  useEffect(() => {
    fetchProjects(curPage);
  }, [curPage, filter, searchTerm]);

  const handleLike = async (projectId, likeState) => {
    try {
      if (likeState) {
        await reactProjectIdea(projectId);
      } else {
        await unreactProjectIdea(projectId);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                reaction_count: likeState
                  ? (p.reaction_count || 0) + 1
                  : (p.reaction_count || 0) - 1,
                likestate: likeState,
              }
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
        onCreate={()=>navigate("/project-idea")}
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
