import Pagination from "@/components/ui/Pagination";
import ProjectCardAdmin from "@/components/ui/ProjectIedaCardAdmin";
import Title from "@/components/ui/Title";
import { ProjectIdeaList, reactProjectIdea, unreactProjectIdea, updateProjectIdeaStatus } from "@/services/projectIdeaService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProjectListPageAdmin = () => {
    const [curPage, setCurPage] = useState(0);
    const [isApproveLoading, setIsApproveLoading] = useState(null);
    const [isRejectLoading, setIsRejectLoading] = useState(null);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filter, setFilter] = useState("Popular");
    const navigate = useNavigate();


    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["projects", curPage, debouncedSearch, filter],
        queryFn: () => ProjectIdeaList(curPage, 6, debouncedSearch, filter),
        keepPreviousData: true,
        staleTime: 1000 * 60
    });

    useEffect(() => {
        if (data?.data) {
            setProjects(data.data);
        }
    }, [data]);


    const totalPages = data?.meta?.totalPages || 1;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim());
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        setCurPage(0);
    }, [debouncedSearch, filter]);



    const handleApprove = async (projectId) => {
        setIsApproveLoading(projectId);
        try {
            const res = await updateProjectIdeaStatus(projectId, 1); // APPROVED
            if (res?.success || res?.status === 200) {
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} approved successfully`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsApproveLoading(null);
        }
    };

    const handleReject = async (projectId) => {
        setIsRejectLoading(projectId);
        try {
            const res = await updateProjectIdeaStatus(projectId, 0); // REJECTED
            if (res?.success || res?.status === 200) {
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} rejected successfully`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsRejectLoading(null);
        }
    };




    const handleLike = async (projectId, liked) => {

        try {
            if (liked) {
                await reactProjectIdea(projectId)
            } else {
                await unreactProjectIdea(projectId)
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };


    return (
        <div className="flex flex-col min-h-[80vh] pb-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {isLoading || isFetching ? (
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-[298px]" />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <p className="text-center col-span-full text-gray-400">No projects found.</p>
                ) : (
                    projects
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
                                onLike={(projectId, likestate) => handleLike(projectId, likestate)}
                                onApprove={() => handleApprove(proj.id)}
                                approveLoading={isApproveLoading === proj.id}
                                rejectLoading={isRejectLoading === proj.id}
                                onReject={() => handleReject(proj.id)}
                                onRejectClick={(id) => setIsModalOpen(id)}
                                status={proj.status}
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
