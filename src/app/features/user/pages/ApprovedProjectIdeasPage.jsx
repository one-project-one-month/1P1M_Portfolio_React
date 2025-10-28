import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import { fetchApprovedProjects } from "@/services/approvedProjectsService";
import { reactProjectIdea, unreactProjectIdea } from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";

const ApprovedProjectIdeasPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(99);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Popular");

  const fetchProjects = async (page = 0) => {
        try {
            setLoading(true);

            const data = await fetchApprovedProjects(page,6);
            const approvedProjects =  data.data.projects
            
            setTotalPages(data.data.pagination.totalPages || 1);  
            const sortedProjects = approvedProjects.sort((a, b) => b.reactions - a.reactions);
            setProjects(sortedProjects);

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(curPage);
    }, [curPage]);


  const filteredProjects = projects
    .filter((proj) => {
      const projectName = proj.name || proj.title || "";
      const projectDesc = proj.description || "";
      return (
        projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projectDesc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      const reactionsA = a.reaction_count || 0;
      const reactionsB = b.reaction_count || 0;

      if (filter === "Popular") return reactionsB - reactionsA;
      if (filter === "Oldest") return (a.id || 0) - (b.id || 0);
      return (b.id || 0) - (a.id || 0); 
    });

    const handleLike = async(projectId, liked) => {
   
           try {
               if(liked){
                   await reactProjectIdea(projectId)
               }else{
                   await unreactProjectIdea(projectId)
               }
           } catch (error) {
               console.error("Error updating like:", error);
               setProjects(prev =>
                   prev.map(p =>
                       p.id === projectId
                           ? { ...p, likecount: liked ? p.likecount + 1 : p.likecount - 1, likestate: liked }
                           : p
                   )
               );
           }
       };


  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Approved Idea Lists"
        showSearch={true}
        showFilter={true}
        searchPlaceholder="Search by project title"
        onSearchChange={(e)=>setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      {/* <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> */}
      <div className="flex-grow flex flex-wrap  gap-6 p-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-400">Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : (
          filteredProjects
          .filter((projects)=> projects.status !== "DELETED")
          .map((proj) => (
            <ProjectIdeaCard
              key={proj.id}
              projectId={proj.id}
              title={proj.projectName}
              description={proj.projectDetails}
              submittedByProfile={proj.profilePictureUrl}
              postBy={proj.devName}
              likeCount={proj.reactionCount}
              liked={proj.reactedProjects?.includes(proj.id)}
              tags={proj.projectTypes}
              status={proj.status.toLowerCase() === "in_progress"? 1 : proj.status.toLowerCase() === "completed"? 2 : 3}
              onLike={(projectId, likestate)=>handleLike(projectId,likestate)}
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