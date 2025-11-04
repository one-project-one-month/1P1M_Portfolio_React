import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import { fetchApprovedProjects } from "@/services/approvedProjectsService";
import {
  reactProjectIdea,
  unreactProjectIdea,
  updateProjectIdeaStatus,
} from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApprovedProjectIdeasAdminPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(99);
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
         search: searchTerm
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
                likecount: likeState ? p.likecount + 1 : p.likecount - 1,
                likestate: likeState,
              }
            : p
        )
      );
    }
  };

  const statusChangeHandler = async (projectId, newStatus) => {
  // Map status text to numeric ID
  let statusId;
  switch (newStatus) {
    case "APPROVED": statusId = 1; break;
    case "REJECTED": statusId = 0; break;
    case "IN_PROGRESS": statusId = 2; break;
    case "COMPLETED": statusId = 3; break;
    case "DELETED": statusId = 4; break;
    default: statusId = -1;
  }

  // Update frontend immediately
  setProjects((prev) =>
    prev.map((proj) =>
      proj.id === projectId ? { ...proj, status: newStatus } : proj
    )
  );

  // Update backend
  try {
    const res = await updateProjectIdeaStatus(projectId, statusId);
    if (res?.success || res?.status === 200) {
      toast.success("Status updated successfully!");
    }
  } catch (err) {
    toast.error("Failed to update status.");
  }
};



  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Approved Idea Lists"
        showSearch={true}
        showFilter={true}
        searchPlaceholder="Search by project title"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      <div className="flew-grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {loading ? (
          <p className="text-center col-span-full text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : (
          projects
          // .filter((projects)=> projects.status !== "DELETED" && projects.status !== "PENDING")
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
              // status={ proj.status.toLowerCase() === "in_progress" ? 1 : proj.status.toLowerCase() === "completed"? 2 : 3 }
              statusAdmin={ proj.status }
              onStatusChange = {newStatus => statusChangeHandler(proj.id, newStatus)}
              onLike={(projectId, likestate)=>handleLike(projectId,likestate)}
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

export default ApprovedProjectIdeasAdminPage;
