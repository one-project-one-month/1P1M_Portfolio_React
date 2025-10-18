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
    const [totalPages, setTotalPages] = useState(null);
    const [isApproveLoading, setIsApproveLoading] = useState(null);
    const [isRejectLoading, setIsRejectLoading] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [loadingProject, setLoadingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Popular");

    const fetchProjects = async (page = 0) => {
        try {
            setLoadingProject(true);

            const {data} = await ProjectIdeaList(page, 6);
            console.log(data);

            setTotalPages(data.totalPages || 1);
            const sortedProjects = data?.sort((a, b) => b.reactions - a.reactions);
            setProjects(sortedProjects);

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingProject(false);
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
            const reactionsA = a.reactions || a.likecount || 0;
            const reactionsB = b.reactions || b.likecount || 0;

            if (filter === "Popular") return reactionsB - reactionsA;
            if (filter === "Oldest") return (a.id || 0) - (b.id || 0);
            return (b.id || 0) - (a.id || 0);
        });


    const handleReject = async (projectId) => {

        console.log("Rejected project:", projectId);
        console.log("=== BUTTON CLICKED - CALLING API ===");

        setIsRejectLoading(projectId);
        try {

            const res = await updateProjectIdeaStatus(projectId, 0); // 0 = REJECTED

            if(res?.success || res?.status === 200){
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} approved successfully`);
                setIsRejectLoading(null);
            }

        } catch (error) {
            console.error("Error approving project:", error);
            toast.error(error.message)
            setIsRejectLoading(null);
        }
    };

    const handleApprove = async (projectId) => {
        console.log("Approved project:", projectId);
        console.log("=== BUTTON CLICKED - CALLING API ===");

        setIsApproveLoading(projectId);
        try {

            const res = await updateProjectIdeaStatus(projectId, 1); // 0 = APPROVED

             if(res?.success || res?.status === 200){
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} approved successfully`);
                setIsRejectLoading(null);
            }

        } catch (error) {
            console.error("Error approving project:", error);
            toast.error(error.message)
            setIsApproveLoading(null);
        }
    };


    const handleLike = async(projectId, liked) => {
        console.log(`${liked ? "Unliked" : "Liked"} project:`, projectId);

        setProjects(prev =>
            prev.map(p =>
                p.id === projectId
                    ? { ...p, likecount: liked ? p.likecount - 1 : p.likecount + 1, likestate: !liked }
                    : p
            )
        );

        try {
            console.log(`API called for project ${projectId}`);
            if(liked){
                await unreactProjectIdea(projectId)
            }else{
                await reactProjectIdea(projectId)
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
                ) : filteredProjects.length === 0 ? (
                    <p className="text-center col-span-full text-gray-400">No projects found.</p>
                ) : (
                    filteredProjects.map((proj) => (
                        <ProjectCardAdmin
                            key={proj.id}
                            projectId={proj.id}
                            title={proj.projectName}
                            description={proj.description}
                            submittedByProfile={proj.profilePictureUrl}
                            postBy={proj.devName}
                            likeCount={proj.reaction_count}
                            liked={proj.likestate}
                            tags={proj.projectTypes}
                            onLike={() => handleLike(proj.id, proj.likestate)}
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
