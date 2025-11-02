import Pagination from "@/components/ui/Pagination";
import ProjectCardAdmin from "@/components/ui/ProjectIedaCardAdmin";
import Title from "@/components/ui/Title";
import { ProjectIdeaList, reactProjectIdea, unreactProjectIdea, updateProjectIdeaStatus } from "@/services/projectIdeaService";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProjectListPageAdmin = () => {
    const [curPage, setCurPage] = useState(0);
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isApproveLoading, setIsApproveLoading] = useState(null);
    const [isRejectLoading, setIsRejectLoading] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [loadingProject, setLoadingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Popular");

   const fetchProjects = async (page = 0) => {
     try {
       setLoadingProject(true);
       const { data, meta } = await ProjectIdeaList(page, 6,  searchTerm, filter);

       filteredProject = data.filter(project => project.status === "PENDING")
       
       setTotalPages(meta?.totalPages || 1);
       setProjects(data)
       
     } catch (error) {
       console.error("Error fetching projects:", error);
     } finally {
       setLoadingProject(false);
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




    const handleReject = async (projectId) => {

        setIsRejectLoading(projectId);
        try {

            const res = await updateProjectIdeaStatus(projectId, 0); // 0 = REJECTED

            if(res?.success || res?.status === 200){
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.removeAll();
                toast.success(`Project ${projectId} rejected successfully`);
                setIsRejectLoading(null);
            }

        } catch (error) {
            console.error("Error approving project:", error);
            toast.removeAll();
            toast.error(error.message)
            setIsRejectLoading(null);
        }
    };

    const handleApprove = async (projectId) => {

        setIsApproveLoading(projectId);
        try {

            const res = await updateProjectIdeaStatus(projectId, 1); // 0 = APPROVED

             if(res?.success || res?.status === 200){
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.removeAll();
                toast.success(`Project ${projectId} approved successfully`);
                setIsRejectLoading(null);
            }

        } catch (error) {
            console.error("Error approving project:", error);
            toast.removeAll();
            toast.error(error.message)
            setIsApproveLoading(null);
        }
    };


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
        <div className="flex flex-col min-h-[80vh] pb-8">
            <Title
                title="Project Idea Lists"
                showSearch={true}
                showFilter={true}
                searchPlaceholder="Search by project title"
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                filterOptions={["Popular", "Newest", "Oldest"]}
                onFilterChange={setFilter}
            />

            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 p-6">
                {loadingProject ? (
                    <p className="text-center col-span-full text-gray-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-center col-span-full text-gray-400">No projects found.</p>
                ) : (
                    projects
                    .filter((proj) => proj.status === "PENDING")
                    .map((proj) => (
                        <ProjectCardAdmin
                            key={proj.id}
                            projectId={proj.id}
                            title={proj.projectName}
                            description={proj.description}
                            submittedByProfile={proj.profilePictureUrl}
                            postBy={proj.devName}
                            likeCount={proj.reaction_count}
                            liked={proj.reactedProjects?.includes(proj.id)}
                            tags={proj.projectTypes}
                            onLike={(projectId, likestate)=>handleLike(projectId,likestate)}
                            onApprove={() => handleApprove(proj.id)}
                            approveLoading={isApproveLoading === proj.id}
                            rejectLoading={isRejectLoading === proj.id}
                            onReject={() => handleReject(proj.id)}
                            onRejectClick={(id) => setIsModalOpen(id)}
                            isRejectModalOpen={isModalOpen === proj.id}
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

export default ProjectListPageAdmin;
